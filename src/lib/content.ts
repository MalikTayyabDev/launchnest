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
};

export type PostDetail = PostSummary & {
  /** Lexical rich text (CMS) — rendered with the Lexical React renderer. */
  richText?: LexicalContent | null;
  /** Plain paragraphs (seed fallback). */
  paragraphs?: string[];
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

export async function getAllPosts(): Promise<PostSummary[]> {
  const payload = await tryPayload();
  if (payload) {
    try {
      const res = await payload.find({
        collection: "posts",
        where: { status: { equals: "published" } },
        sort: "-publishedAt",
        limit: 100,
        depth: 0,
      });
      if (res.docs.length > 0) {
        return res.docs.map(mapPostSummary);
      }
    } catch {
      /* fall through to seed */
    }
  }
  return seedPosts.map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    category: p.category,
    date: p.date,
    readingTime: p.readingTime,
    author: p.author,
  }));
}

export async function getPostSlugs(): Promise<string[]> {
  return (await getAllPosts()).map((p) => p.slug);
}

export async function getPost(slug: string): Promise<PostDetail | null> {
  const payload = await tryPayload();
  if (payload) {
    try {
      const res = await payload.find({
        collection: "posts",
        where: { slug: { equals: slug }, status: { equals: "published" } },
        limit: 1,
        depth: 0,
      });
      const doc = res.docs[0];
      if (doc) {
        return {
          ...mapPostSummary(doc),
          richText: (doc.body as LexicalContent) ?? null,
          seo: doc.seo ?? undefined,
        };
      }
    } catch {
      /* fall through */
    }
  }
  const seed = seedPosts.find((p) => p.slug === slug);
  if (!seed) return null;
  return {
    slug: seed.slug,
    title: seed.title,
    excerpt: seed.excerpt,
    category: seed.category,
    date: seed.date,
    readingTime: seed.readingTime,
    author: seed.author,
    paragraphs: seed.body,
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
