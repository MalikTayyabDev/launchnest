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

/** Parse Vercel Blob store id from BLOB_READ_WRITE_TOKEN (vercel_blob_rw_<store>_<secret>). */
export function blobStoreIdFromToken(
  token = process.env.BLOB_READ_WRITE_TOKEN || "",
): string | null {
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

/** Public site origin for absolute media URLs (never localhost in production builds). */
function publicOrigin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, "") || "";
  if (fromEnv && !/localhost|127\.0\.0\.1/i.test(fromEnv)) return fromEnv;
  if (process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production") {
    return siteConfig.url.replace(/\/$/, "");
  }
  return fromEnv || siteConfig.url.replace(/\/$/, "");
}

/**
 * Resolve a stored Payload media URL to something the frontend can load.
 * Prefer the original file URL; skip empty image-size variants.
 * When Blob is configured, rewrite /api/media/file/* to the public Blob CDN URL
 * (same key Payload's static handler uses) so next/image does not depend on the proxy.
 */
export function resolveMediaUrl(
  raw: string | null | undefined,
  filename?: string | null,
): string | null {
  if (!raw && !filename) return null;

  const blobBase = blobPublicBaseUrl();
  const name =
    filename ||
    (raw && raw.includes("/api/media/file/")
      ? decodeURIComponent(raw.split("/api/media/file/").pop() || "")
      : null);

  if (blobBase && name) {
    return blobObjectUrl(blobBase, name);
  }

  if (!raw) return null;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;

  const origin = publicOrigin();
  const path = raw.startsWith("/") ? raw : `/${raw}`;
  return origin ? `${origin}${path}` : path;
}

/**
 * Map a Payload upload relation (populated object, id, or null) to a cover image.
 * Always prefer the original `url` over resized variants (sizes can be null/missing on Blob).
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
  const candidates: { url?: string | null; filename?: string | null }[] = [
    { url: c.url, filename: c.filename },
    { url: c.sizes?.card?.url, filename: c.sizes?.card?.filename || c.filename },
    { url: c.sizes?.hero?.url, filename: c.sizes?.hero?.filename || c.filename },
    {
      url: c.sizes?.thumbnail?.url,
      filename: c.sizes?.thumbnail?.filename || c.filename,
    },
  ];

  for (const candidate of candidates) {
    const resolved = resolveMediaUrl(candidate.url, candidate.filename);
    if (resolved) {
      return {
        url: resolved,
        alt: (c.alt && String(c.alt).trim()) || fallbackAlt,
      };
    }
  }

  // Last resort: filename alone → Blob CDN
  if (c.filename) {
    const resolved = resolveMediaUrl(null, c.filename);
    if (resolved) {
      return {
        url: resolved,
        alt: (c.alt && String(c.alt).trim()) || fallbackAlt,
      };
    }
  }

  return null;
}
