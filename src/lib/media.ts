import { siteConfig } from "./site";

export type MediaLike = {
  id?: number | string;
  url?: string | null;
  alt?: string | null;
  filename?: string | null;
  sizes?: {
    thumbnail?: { url?: string | null; filename?: string | null } | null;
    card?: { url?: string | null; filename?: string | null } | null;
    hero?: { url?: string | null; filename?: string | null } | null;
  } | null;
};

export type ResolvedCover = { url: string; alt: string };

/** Parse Vercel Blob store id from token or BLOB_STORE_ID env. */
export function blobStoreIdFromToken(
  token = process.env.BLOB_READ_WRITE_TOKEN || "",
): string | null {
  const fromEnv = (process.env.BLOB_STORE_ID || "").trim().toLowerCase();
  if (fromEnv) return fromEnv;
  const match = token.match(/^vercel_blob_rw_([a-z\d]+)_[a-z\d]+$/i);
  return match?.[1]?.toLowerCase() ?? null;
}

export function blobPublicBaseUrl(
  token = process.env.BLOB_READ_WRITE_TOKEN || "",
): string | null {
  const storeId = blobStoreIdFromToken(token);
  if (!storeId) return null;
  return (
    process.env.STORAGE_VERCEL_BLOB_BASE_URL?.replace(/\/$/, "") ||
    `https://${storeId}.public.blob.vercel-storage.com`
  );
}

/**
 * Match @payloadcms/storage-vercel-blob generateURL encoding:
 * encode only the basename, keep directory segments intact.
 */
export function blobObjectUrl(baseUrl: string, filename: string): string {
  const normalized = filename.replace(/^\/+/, "");
  const slash = normalized.lastIndexOf("/");
  const dir = slash >= 0 ? normalized.slice(0, slash) : "";
  const base = slash >= 0 ? normalized.slice(slash + 1) : normalized;
  const encoded = encodeURIComponent(base);
  return dir ? `${baseUrl}/${dir}/${encoded}` : `${baseUrl}/${encoded}`;
}

function filenameFromMediaPath(raw: string): string | null {
  const marker = "/api/media/file/";
  const idx = raw.indexOf(marker);
  if (idx === -1) return null;
  try {
    return decodeURIComponent(raw.slice(idx + marker.length).split("?")[0] || "");
  } catch {
    return raw.slice(idx + marker.length).split("?")[0] || null;
  }
}

/** Public site origin for absolute media URLs (never localhost in production builds). */
function publicOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, "") || "";
  if (fromEnv && !/localhost|127\.0\.0\.1/i.test(fromEnv)) return fromEnv;
  if (
    process.env.VERCEL_ENV === "production" ||
    process.env.NODE_ENV === "production"
  ) {
    return siteConfig.url.replace(/\/$/, "");
  }
  return fromEnv || siteConfig.url.replace(/\/$/, "");
}

/**
 * Resolve a stored Payload media URL for the public site.
 * Prefer Vercel Blob CDN when store id is known — never depend on /_next/image
 * fetching /api/media/file (that path 400s when the optimizer cannot pull the file).
 */
export function resolveMediaUrl(
  raw: string | null | undefined,
  filename?: string | null,
): string | null {
  if (!raw && !filename) return null;

  const blobBase = blobPublicBaseUrl();
  const name =
    (filename && filename.trim()) ||
    (raw ? filenameFromMediaPath(raw) : null);

  if (blobBase && name) {
    return blobObjectUrl(blobBase, name);
  }

  if (!raw) return null;
  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    // Still on our own /api/media proxy — keep absolute but callers use <img>, not optimizer.
    return raw;
  }

  const origin = publicOrigin();
  const path = raw.startsWith("/") ? raw : `/${raw}`;
  return origin ? `${origin}${path}` : path;
}

/**
 * Map a Payload upload relation to a cover image.
 * ONLY use the original upload — resized sizes (card/hero) are often missing on Blob
 * and were causing /_next/image?url=...960x640.png → 400.
 */
export function mapUploadCover(
  cover: unknown,
  fallbackAlt = "Cover image",
): ResolvedCover | null {
  if (cover == null || typeof cover === "number" || typeof cover === "string") {
    return null;
  }
  if (typeof cover !== "object") return null;

  const c = cover as MediaLike;
  const resolved = resolveMediaUrl(c.url, c.filename);
  if (!resolved) return null;

  return {
    url: resolved,
    alt: (c.alt && String(c.alt).trim()) || fallbackAlt,
  };
}
