import { revalidatePath } from "next/cache";

/**
 * Bust Next.js ISR/cache for public pages after CMS edits.
 * Safe to call from Payload hooks in the Next runtime (Vercel / local).
 */
export function revalidateBlogPost(slug: string): void {
  try {
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath(`/blog/${slug}`, "page");
    revalidatePath("/sitemap.xml");
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
    revalidatePath("/sitemap.xml");
  } catch {
    // ignore
  }
}

export function revalidateAllContent(): void {
  try {
    revalidatePath("/blog");
    revalidatePath("/portfolio");
    revalidatePath("/");
    revalidatePath("/sitemap.xml");
  } catch {
    // ignore
  }
}
