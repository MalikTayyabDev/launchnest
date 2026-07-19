/**
 * Server-only helper that captures a screenshot of a URL and returns the raw
 * image bytes. Runs anywhere (including Vercel serverless) because it just calls
 * an HTTP screenshot service — no headless browser required.
 *
 * Provider selection:
 *   1. ScreenshotOne  — used when SCREENSHOTONE_ACCESS_KEY is set (best quality,
 *      ad/cookie-banner blocking, caching). Recommended for production.
 *   2. thum.io        — free, keyless fallback. Good enough for most sites.
 *
 * Set SCREENSHOT_PROVIDER=thumio to force the free provider even if a key exists.
 */

export type CapturedShot = {
  buffer: Buffer;
  mimetype: string;
  ext: "jpg" | "png" | "webp";
};

const TIMEOUT_MS = 45_000;

function extFromContentType(ct: string): CapturedShot["ext"] {
  if (ct.includes("png")) return "png";
  if (ct.includes("webp")) return "webp";
  return "jpg";
}

async function fetchImage(endpoint: string): Promise<CapturedShot> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(endpoint, {
      signal: controller.signal,
      headers: { "User-Agent": "LaunchNest-Screenshotter/1.0" },
    });
    if (!res.ok) {
      throw new Error(`Screenshot provider responded ${res.status}`);
    }
    const contentType = (res.headers.get("content-type") || "image/jpeg")
      .split(";")[0]
      .trim();
    if (!contentType.startsWith("image/")) {
      throw new Error(`Provider returned non-image content (${contentType})`);
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    // Guard against tiny placeholder / error images.
    if (buffer.length < 2_048) {
      throw new Error("Screenshot looked empty (under 2KB)");
    }
    return { buffer, mimetype: contentType, ext: extFromContentType(contentType) };
  } finally {
    clearTimeout(timer);
  }
}

function normalizeUrl(target: string): string {
  const trimmed = target.trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function screenshotOneUrl(url: string, key: string): string {
  const api = new URL("https://api.screenshotone.com/take");
  api.searchParams.set("access_key", key);
  api.searchParams.set("url", url);
  api.searchParams.set("viewport_width", "1280");
  api.searchParams.set("viewport_height", "800");
  api.searchParams.set("format", "jpg");
  api.searchParams.set("image_quality", "82");
  api.searchParams.set("block_ads", "true");
  api.searchParams.set("block_cookie_banners", "true");
  api.searchParams.set("block_chats", "true");
  api.searchParams.set("cache", "true");
  api.searchParams.set("cache_ttl", "2592000");
  return api.toString();
}

function thumioUrl(url: string): string {
  // 1280-wide viewport shot cropped to 800px tall to match the portfolio cards.
  return `https://image.thum.io/get/width/1280/crop/800/noanimate/${url}`;
}

/** Capture a screenshot for a URL and return the image bytes. */
export async function captureScreenshot(target: string): Promise<CapturedShot> {
  const url = normalizeUrl(target);
  const key = process.env.SCREENSHOTONE_ACCESS_KEY;
  const forceFree = process.env.SCREENSHOT_PROVIDER === "thumio";

  if (key && !forceFree) {
    return fetchImage(screenshotOneUrl(url, key));
  }
  return fetchImage(thumioUrl(url));
}
