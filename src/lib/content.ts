import { getPayload, type Payload } from "payload";
import configPromise from "@payload-config";
import { posts as seedPosts } from "./blog";
import { caseStudies as seedCaseStudies, type Industry } from "./work";

/** Lexical rich-text document shape (kept loose to avoid deep type coupling). */
export type LexicalContent = { root: unknown } & Record<string, unknown>;

/**
 * Content access layer. Reads from Payload (CMS) when the database is reachable,
 * and transparently falls back to the bundled seed data otherwise (e.g. local
 * builds without a DB). This keeps the public site rendering in every environment.
 */

export type PostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingTime: string;
  author: string;
  coverImage?: { url: string; alt: string } | null;
};

export type PostDetail = PostSummary & {
  /** Lexical rich text (CMS) — rendered with the Lexical React renderer. */
  richText?: LexicalContent | null;
  /** Plain paragraphs (legacy seed fallback). */
  paragraphs?: string[];
  intro?: string[];
  sections?: import("./blog").BlogSection[];
  conclusion?: string[];
  relatedService?: string;
  primaryKeyword?: string;
  seo?: { metaTitle?: string | null; metaDescription?: string | null };
};

export type CaseStudyItem = {
  slug: string;
  client: string;
  industry: Industry;
  headlineResult: string;
  summary: string;
  situation: string;
  problem: string;
  whatWeDid: string[];
  results: { metric: string; label: string }[];
  quote: { text: string; name: string; role: string };
  accent: string;
  seo?: { metaTitle?: string | null; metaDescription?: string | null };
};

let cached: Payload | null = null;
let unavailable = false;

async function tryPayload(): Promise<Payload | null> {
  if (unavailable) return null;
  if (cached) return cached;
  try {
    cached = await getPayload({ config: configPromise });
    return cached;
  } catch {
    unavailable = true;
    return null;
  }
}

// ---------- Blog posts ----------

function mapSeedSummary(p: (typeof seedPosts)[number]): PostSummary {
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    date: p.date,
    readingTime: p.readingTime,
    author: p.author,
    coverImage: null,
  };
}

export async function getAllPosts(): Promise<PostSummary[]> {
  const payload = await tryPayload();
  if (payload) {
    try {
      const res = await payload.find({
        collection: "posts",
        where: { status: { equals: "published" } },
        sort: "-publishedAt",
        limit: 100,
        depth: 1,
      });
      if (res.docs.length > 0) {
        // CMS is source of truth when reachable — keeps admin and public site in sync.
        return res.docs.map(mapPostSummary);
      }
    } catch {
      /* fall through to seed */
    }
  }
  return seedPosts.map(mapSeedSummary);
}

export async function getPostSlugs(): Promise<string[]> {
  return (await getAllPosts()).map((p) => p.slug);
}

export async function getPost(slug: string): Promise<PostDetail | null> {
  const seed = seedPosts.find((p) => p.slug === slug);
  const payload = await tryPayload();
  if (payload) {
    try {
      const res = await payload.find({
        collection: "posts",
        where: { slug: { equals: slug }, status: { equals: "published" } },
        limit: 1,
        depth: 1,
      });
      const doc = res.docs[0];
      if (doc) {
        const summary = mapPostSummary(doc);
        const seo =
          (doc.seo?.metaTitle || doc.seo?.metaDescription
            ? doc.seo
            : null) ??
          seed?.seo ??
          undefined;
        // Prefer structured seed body for catalog posts (detailed + SEO H2s).
        // CMS-only posts (no seed) render Lexical rich text. Cover image always from CMS.
        if (seed?.sections?.length) {
          return {
            ...summary,
            title: summary.title || seed.title,
            excerpt: summary.excerpt || seed.excerpt,
            intro: seed.intro,
            sections: seed.sections,
            conclusion: seed.conclusion,
            relatedService: seed.relatedService,
            primaryKeyword: seed.primaryKeyword,
            seo,
          };
        }
        return {
          ...summary,
          richText: (doc.body as LexicalContent) ?? null,
          relatedService: seed?.relatedService,
          primaryKeyword: seed?.primaryKeyword,
          seo,
        };
      }
    } catch {
      /* fall through */
    }
  }
  if (!seed) return null;
  return {
    ...mapSeedSummary(seed),
    intro: seed.intro,
    sections: seed.sections,
    conclusion: seed.conclusion,
    relatedService: seed.relatedService,
    primaryKeyword: seed.primaryKeyword,
    seo: seed.seo,
  };
}

function resolveMediaUrl(url: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const base = process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, "") || "";
  return base ? `${base}${url.startsWith("/") ? url : `/${url}`}` : url;
}

function mapCoverImage(
  cover: unknown,
): { url: string; alt: string } | null {
  if (!cover || typeof cover !== "object") return null;
  const c = cover as {
    url?: string | null;
    alt?: string | null;
    sizes?: { hero?: { url?: string | null }; card?: { url?: string | null } };
  };
  const raw =
    c.sizes?.hero?.url || c.sizes?.card?.url || c.url || null;
  if (!raw) return null;
  return {
    url: resolveMediaUrl(raw),
    alt: c.alt || "Article cover image",
  };
}

function mapPostSummary(doc: Record<string, any>): PostSummary {
  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    category: doc.category,
    date: doc.publishedAt ?? doc.createdAt,
    readingTime: doc.readingTime ?? "",
    author: doc.author ?? "LaunchNest",
    coverImage: mapCoverImage(doc.coverImage),
  };
}

// ---------- Case studies ----------

export async function getAllCaseStudies(): Promise<CaseStudyItem[]> {
  const payload = await tryPayload();
  if (payload) {
    try {
      const res = await payload.find({
        collection: "case-studies",
        where: { status: { equals: "published" } },
        sort: "-createdAt",
        limit: 100,
        depth: 0,
      });
      if (res.docs.length > 0) {
        return res.docs.map(mapCaseStudy);
      }
    } catch {
      /* fall through */
    }
  }
  return seedCaseStudies.map((c) => ({ ...c }));
}

export async function getCaseStudySlugs(): Promise<string[]> {
  return (await getAllCaseStudies()).map((c) => c.slug);
}

export async function getCaseStudy(slug: string): Promise<CaseStudyItem | null> {
  const payload = await tryPayload();
  if (payload) {
    try {
      const res = await payload.find({
        collection: "case-studies",
        where: { slug: { equals: slug }, status: { equals: "published" } },
        limit: 1,
        depth: 0,
      });
      const doc = res.docs[0];
      if (doc) return mapCaseStudy(doc);
    } catch {
      /* fall through */
    }
  }
  return seedCaseStudies.find((c) => c.slug === slug) ?? null;
}

function mapCaseStudy(doc: Record<string, any>): CaseStudyItem {
  return {
    slug: doc.slug,
    client: doc.client,
    industry: doc.industry,
    headlineResult: doc.headlineResult,
    summary: doc.summary,
    situation: doc.situation ?? "",
    problem: doc.problem ?? "",
    whatWeDid: Array.isArray(doc.whatWeDid)
      ? doc.whatWeDid.map((s: { step: string }) => s.step)
      : [],
    results: Array.isArray(doc.results)
      ? doc.results.map((r: { metric: string; label: string }) => ({
          metric: r.metric,
          label: r.label,
        }))
      : [],
    quote: {
      text: doc.quote?.text ?? "",
      name: doc.quote?.name ?? "",
      role: doc.quote?.role ?? "",
    },
    accent: doc.accent ?? "#0B1F3A",
    seo: doc.seo ?? undefined,
  };
}
