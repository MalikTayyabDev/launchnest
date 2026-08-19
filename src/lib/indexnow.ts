import { CANONICAL_URL } from "./site-origins";
import { audiences } from "./audiences";
import { services } from "./services";

/**
 * IndexNow key (8–128 hex chars). Hosted at `/{key}.txt` so Bing/Yandex/etc.
 * can verify submissions. Override with INDEXNOW_KEY only if you also replace
 * the matching file in /public.
 */
export const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY || "8f3c1a9e2b47d056c8e14f7a93b0d26e";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

function publicOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, "") || "";
  if (fromEnv && !/localhost|127\.0\.0\.1/i.test(fromEnv)) return fromEnv;
  return CANONICAL_URL.replace(/\/$/, "");
}

function shouldSubmit(): boolean {
  if (process.env.NEXT_PHASE === "phase-production-build") return false;
  if (process.env.VERCEL_ENV === "preview") return false;
  if (process.env.NODE_ENV !== "production") return false;
  return true;
}

function normalizeUrl(raw: string, origin: string): string | null {
  try {
    const parsed = new URL(raw, origin);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
    parsed.hash = "";
    return parsed.toString();
  } catch {
    return null;
  }
}

export function coreIndexNowUrls(): string[] {
  const origin = publicOrigin();
  const paths = [
    "/",
    "/services",
    "/portfolio",
    "/pricing",
    "/intro-offer",
    "/about",
    "/blog",
    "/contact",
    "/privacy",
    "/terms",
    ...services.map((s) => `/services/${s.slug}`),
    ...audiences.map((a) => `/for/${a.slug}`),
  ];
  return paths.map((path) => (path === "/" ? `${origin}/` : `${origin}${path}`));
}

/**
 * POST changed URLs to IndexNow (Bing, Yandex, Seznam, Naver).
 * Best-effort: never throws, times out quickly, skipped off production.
 */
export async function submitIndexNow(urls: string[]): Promise<void> {
  if (!shouldSubmit()) return;

  const origin = publicOrigin();
  const unique = [
    ...new Set(
      urls
        .map((url) => normalizeUrl(url, origin))
        .filter((url): url is string => Boolean(url)),
    ),
  ].slice(0, 10_000);

  if (unique.length === 0) return;

  const host = new URL(origin).host;
  const body = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: `${origin}/${INDEXNOW_KEY}.txt`,
    urlList: unique,
  };

  try {
    await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(4000),
    });
  } catch {
    // Discovery ping must not block CMS saves or page renders.
  }
}

/** Fire-and-forget wrapper for Payload hooks / ISR. */
export function notifyIndexNow(urls: string[]): void {
  void submitIndexNow(urls);
}
