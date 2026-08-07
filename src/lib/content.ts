import { getPayload, type Payload } from "payload";
import configPromise from "@payload-config";
import { posts as seedPosts } from "./blog";
import { caseStudies as seedCaseStudies, type Industry } from "./work";
import { mapUploadCover } from "./media";
import { isPublicProofCaseSlug } from "./public-proof";

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
  /** Latest CMS update — used for sitemap lastModified. */
  modifiedAt?: string;
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
  liveUrl?: string | null;
  liveDomain?: string | null;
  /** True when a live URL exists internally — never expose the URL publicly. */
  hasLiveSite?: boolean;
  coverImage?: { url: string; alt: string } | null;
  primaryKeyword?: string;
  relatedService?: string;
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

async function resolveCoverFromDoc(
  payload: Payload,
  cover: unknown,
  fallbackAlt: string,
): Promise<{ url: string; alt: string } | null> {
  const direct = mapUploadCover(cover, fallbackAlt);
  if (direct) return direct;
  const id =
    typeof cover === "number" || typeof cover === "string" ? cover : null;
  if (id == null) return null;
  try {
    const media = await payload.findByID({
      collection: "media",
      id,
      depth: 0,
    });
    return mapUploadCover(media, fallbackAlt);
  } catch {
    return null;
  }
}

export async function getAllPosts(): Promise<PostSummary[]> {
  const payload = await tryPayload();
  if (payload) {
    try {
      const res = await payload.find({
        collection: "posts",
        where: { status: { equals: "published" } },
        sort: "-publishedAt",
        limit: 500,
        depth: 1,
      });
      if (res.docs.length > 0) {
        return Promise.all(
          res.docs.map(async (doc) => {
            const summary = mapPostSummary(doc);
            if (!summary.coverImage && doc.coverImage != null) {
              summary.coverImage = await resolveCoverFromDoc(
                payload,
                doc.coverImage,
                doc.title || "Article cover image",
              );
            }
            return summary;
          }),
        );
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
        if (!summary.coverImage && doc.coverImage != null) {
          summary.coverImage = await resolveCoverFromDoc(
            payload,
            doc.coverImage,
            doc.title || "Article cover image",
          );
        }
        const cmsSeo =
          doc.seo?.metaTitle || doc.seo?.metaDescription ? doc.seo : undefined;
        const seo = cmsSeo ?? seed?.seo ?? undefined;
        const richText = hasLexicalBody(doc.body)
          ? (doc.body as LexicalContent)
          : null;

        // CMS is source of truth when a published post exists.
        // Seed sections only fill in if the CMS body is empty (never override dashboard edits).
        if (richText) {
          return {
            ...summary,
            richText,
            relatedService: seed?.relatedService,
            primaryKeyword: seed?.primaryKeyword,
            seo,
          };
        }
        if (seed?.sections?.length) {
          return {
            ...summary,
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
          richText: null,
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

/** True when Lexical body has at least one non-empty child. */
function hasLexicalBody(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const children = (body as { root?: { children?: unknown[] } }).root?.children;
  return Array.isArray(children) && children.length > 0;
}

function mapPostSummary(doc: Record<string, any>): PostSummary {
  const published = doc.publishedAt ?? doc.createdAt;
  const modified = doc.updatedAt ?? published;
  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    category: doc.category,
    date: published,
    modifiedAt: modified,
    readingTime: doc.readingTime ?? "",
    author: doc.author ?? "LaunchNest",
    coverImage: mapUploadCover(doc.coverImage, doc.title || "Article cover image"),
  };
}

// ---------- Case studies ----------

/** Strip live URLs from public responses — except allowlisted public proof. */
function redactPublicCaseStudy(study: CaseStudyItem): CaseStudyItem {
  const hasLive = Boolean(study.liveUrl);
  if (hasLive && isPublicProofCaseSlug(study.slug)) {
    return { ...study, hasLiveSite: true };
  }
  return {
    ...study,
    hasLiveSite: hasLive,
    liveUrl: null,
    liveDomain: null,
  };
}

export async function getAllCaseStudies(): Promise<CaseStudyItem[]> {
  const payload = await tryPayload();
  const cmsBySlug = new Map<string, CaseStudyItem>();
  if (payload) {
    try {
      const res = await payload.find({
        collection: "case-studies",
        where: { status: { equals: "published" } },
        sort: "-createdAt",
        limit: 100,
        depth: 1,
      });
      for (const doc of res.docs) {
        cmsBySlug.set(doc.slug, mapCaseStudy(doc));
      }
    } catch {
      /* fall through */
    }
  }

  // Catalog (all live-linked) wins for featured proof; CMS overlays same-slug edits.
  const fromCatalog = seedCaseStudies.map((seed) => {
    const cms = cmsBySlug.get(seed.slug);
    if (!cms) return mapSeedCaseStudy(seed);
    return {
      ...mapSeedCaseStudy(seed),
      ...cms,
      liveUrl: cms.liveUrl || seed.liveUrl,
      liveDomain: cms.liveDomain || seed.liveDomain,
      primaryKeyword: seed.primaryKeyword,
      relatedService: seed.relatedService,
      seo: cms.seo ?? seed.seo,
    };
  });

  // Extra CMS-only studies only if they have a verifiable live URL.
  const catalogSlugs = new Set(seedCaseStudies.map((s) => s.slug));
  const cmsOnlyLive = [...cmsBySlug.values()].filter(
    (c) => !catalogSlugs.has(c.slug) && Boolean(c.liveUrl),
  );

  return [...fromCatalog, ...cmsOnlyLive].map(redactPublicCaseStudy);
}

export async function getCaseStudySlugs(): Promise<string[]> {
  return (await getAllCaseStudies()).map((c) => c.slug);
}

export async function getCaseStudy(slug: string): Promise<CaseStudyItem | null> {
  const seed = seedCaseStudies.find((c) => c.slug === slug);
  const payload = await tryPayload();
  if (payload) {
    try {
      const res = await payload.find({
        collection: "case-studies",
        where: { slug: { equals: slug }, status: { equals: "published" } },
        limit: 1,
        depth: 1,
      });
      const doc = res.docs[0];
      if (doc) {
        const mapped = mapCaseStudy(doc);
        if (!mapped.coverImage && doc.coverImage != null) {
          mapped.coverImage = await resolveCoverFromDoc(
            payload,
            doc.coverImage,
            `${doc.client || "Case study"} cover image`,
          );
        }
        const cmsSeo =
          mapped.seo?.metaTitle || mapped.seo?.metaDescription
            ? mapped.seo
            : undefined;
        const base = seed ? mapSeedCaseStudy(seed) : null;
        const merged: CaseStudyItem = {
          ...(base ?? mapped),
          ...mapped,
          primaryKeyword: seed?.primaryKeyword,
          relatedService: seed?.relatedService,
          summary: mapped.summary || seed?.summary || "",
          situation: mapped.situation || seed?.situation || "",
          problem: mapped.problem || seed?.problem || "",
          liveUrl: mapped.liveUrl || seed?.liveUrl || null,
          liveDomain: mapped.liveDomain || seed?.liveDomain || null,
          seo: cmsSeo ?? seed?.seo,
        };
        // Fictional / unverifiable CMS-only studies without a live URL stay hidden.
        if (!merged.liveUrl) return null;
        return redactPublicCaseStudy(merged);
      }
    } catch {
      /* fall through */
    }
  }
  return seed ? redactPublicCaseStudy(mapSeedCaseStudy(seed)) : null;
}

function mapSeedCaseStudy(c: (typeof seedCaseStudies)[number]): CaseStudyItem {
  return {
    slug: c.slug,
    client: c.client,
    industry: c.industry,
    headlineResult: c.headlineResult,
    summary: c.summary,
    situation: c.situation,
    problem: c.problem,
    whatWeDid: c.whatWeDid,
    results: c.results,
    quote: c.quote,
    accent: c.accent,
    liveUrl: c.liveUrl,
    liveDomain: c.liveDomain,
    coverImage: null,
    primaryKeyword: c.primaryKeyword,
    relatedService: c.relatedService,
    seo: c.seo,
  };
}

function mapCaseStudy(doc: Record<string, any>): CaseStudyItem {
  const seed = seedCaseStudies.find((c) => c.slug === doc.slug);
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
    liveUrl: doc.liveUrl || seed?.liveUrl || null,
    liveDomain: doc.liveDomain || seed?.liveDomain || null,
    coverImage: mapUploadCover(
      doc.coverImage,
      `${doc.client || "Case study"} cover image`,
    ),
    primaryKeyword: seed?.primaryKeyword,
    relatedService: seed?.relatedService,
    seo: doc.seo ?? seed?.seo ?? undefined,
  };
}
