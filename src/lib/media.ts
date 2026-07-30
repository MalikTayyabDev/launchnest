import { siteConfig } from "./site";

export type MediaLike = {
  id?: number | string;
  url?: string | null;
  alt?: string | null;
  filename?: string | null;
};

export type ResolvedCover = { url: string; alt: string };

/**
 * Normalize a Vercel Blob store id.
 * Dashboard labels often look like `store_n8abscuqkk8r6asr`, but public CDN
 * hostnames are `n8abscuqkk8r6asr.public.blob.vercel-storage.com` (no `store_`).
 */
export function normalizeBlobStoreId(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let id = raw.trim().toLowerCase();
  id = id.replace(/^store[_-]/, "");
  id = id.replace(/\.public\.blob\.vercel-storage\.com$/i, "");
  id = id.replace(/^https?:\/\//, "").split("/")[0] || "";
  id = id.replace(/^store[_-]/, "");
  return /^[a-z\d]+$/.test(id) ? id : null;
}

/** Parse Vercel Blob store id from token or BLOB_STORE_ID env. */
export function blobStoreIdFromToken(
  token = process.env.BLOB_READ_WRITE_TOKEN || "",
): string | null {
  const fromEnv = normalizeBlobStoreId(process.env.BLOB_STORE_ID);
  if (fromEnv) return fromEnv;
  const match = token.match(/^vercel_blob_rw_([a-z\d]+)_[a-z\d]+$/i);
  return normalizeBlobStoreId(match?.[1] ?? null);
}

export function blobPublicBaseUrl(
  token = process.env.BLOB_READ_WRITE_TOKEN || "",
): string | null {
  if (process.env.STORAGE_VERCEL_BLOB_BASE_URL) {
    return process.env.STORAGE_VERCEL_BLOB_BASE_URL.replace(/\/$/, "");
  }
  const storeId = blobStoreIdFromToken(token);
  if (!storeId) return null;
  return `https://${storeId}.public.blob.vercel-storage.com`;
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

/** Fix mistaken `store_` hostnames → real public Blob CDN host. */
export function repairBlobUrl(url: string): string {
  try {
    const u = new URL(url);
    const host = u.hostname;
    const m = host.match(/^store[_-]([a-z\d]+)\.public\.blob\.vercel-storage\.com$/i);
    if (m) {
      u.hostname = `${m[1].toLowerCase()}.public.blob.vercel-storage.com`;
      return u.toString();
    }
    return url;
  } catch {
    return url;
  }
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

function isBlobCdnUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname;
    return /\.public\.blob\.vercel-storage\.com$/i.test(host);
  } catch {
    return false;
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
 * If Payload already returned a Blob CDN URL, keep it (only repair bad store_ hosts).
 * Otherwise rewrite /api/media/file/* to the public CDN when store id is known.
 */
export function resolveMediaUrl(
  raw: string | null | undefined,
  filename?: string | null,
): string | null {
  if (!raw && !filename) return null;

  // Trust (and repair) absolute Blob CDN URLs from Payload — do not rebuild them.
  if (raw && /^https?:\/\//i.test(raw) && isBlobCdnUrl(raw)) {
    return repairBlobUrl(raw);
  }

  const blobBase = blobPublicBaseUrl();
  const name =
    (filename && filename.trim()) ||
    (raw ? filenameFromMediaPath(raw) : null);

  if (blobBase && name) {
    return blobObjectUrl(blobBase, name);
  }

  if (!raw) return null;
  if (raw.startsWith("http://") || raw.startsWith("https://")) {
    return repairBlobUrl(raw);
  }

  const origin = publicOrigin();
  const path = raw.startsWith("/") ? raw : `/${raw}`;
  return origin ? `${origin}${path}` : path;
}

/**
 * Map a Payload upload relation to a cover image.
 * ONLY use the original upload — never resized size variants.
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
