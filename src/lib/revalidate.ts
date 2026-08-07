import { revalidatePath } from "next/cache";

/** Bust the rendered sitemap route (cached separately from CMS data). */
export function revalidateSitemap(): void {
  try {
    revalidatePath("/sitemap.xml");
  } catch {
    // Outside Next request context (e.g. CLI seed) — ignore.
  }
}

/**
 * Bust Next.js ISR/cache for public pages after CMS edits.
 * Safe to call from Payload hooks in the Next runtime (Vercel / local).
 */
export function revalidateBlogPost(slug: string): void {
  try {
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath(`/blog/${slug}`, "page");
    revalidateSitemap();
  } catch {
    // Outside Next request context (e.g. CLI seed) — ignore.
  }
}

export function revalidateCaseStudy(slug: string): void {
  try {
    revalidatePath("/portfolio");
    revalidatePath(`/work/${slug}`);
    revalidatePath(`/work/${slug}`, "page");
    revalidatePath("/");
    revalidateSitemap();
  } catch {
    // ignore
  }
}

export function revalidateAllContent(): void {
  try {
    revalidatePath("/blog");
    revalidatePath("/portfolio");
    revalidatePath("/");
    revalidateSitemap();
  } catch {
    // ignore
  }
}

/** Bust intro-offer banner + page after slot / open changes. */
export function revalidateIntroOffer(): void {
  try {
    revalidatePath("/");
    revalidatePath("/intro-offer");
    revalidatePath("/intro-offer", "page");
    revalidatePath("/pricing");
  } catch {
    // ignore
  }
}
