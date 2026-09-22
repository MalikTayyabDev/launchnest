import { revalidatePath } from "next/cache";
import { CANONICAL_URL } from "./site-origins";
import { coreIndexNowUrls, notifyIndexNow } from "./indexnow";

function origin(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, "") || "";
  if (fromEnv && !/localhost|127\.0\.0\.1/i.test(fromEnv)) return fromEnv;
  return CANONICAL_URL.replace(/\/$/, "");
}

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
    const base = origin();
    notifyIndexNow([`${base}/blog`, `${base}/blog/${slug}`]);
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
    const base = origin();
    notifyIndexNow([`${base}/`, `${base}/portfolio`, `${base}/work/${slug}`]);
  } catch {
    // ignore
  }
}

/** Bust portfolio + home after Projects CMS edits (grid / featured work). */
export function revalidateProjects(): void {
  try {
    revalidatePath("/portfolio");
    revalidatePath("/");
    const base = origin();
    notifyIndexNow([`${base}/`, `${base}/portfolio`]);
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
    notifyIndexNow(coreIndexNowUrls());
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
    const base = origin();
    notifyIndexNow([`${base}/`, `${base}/intro-offer`, `${base}/pricing`]);
  } catch {
    // ignore
  }
}
