import { getPayload } from "payload";
import config from "@payload-config";
import type { Post } from "../payload-types";
import { posts as seedPosts, type BlogSection } from "../lib/blog";
import { caseStudies as seedCaseStudies } from "../lib/work";

/**
 * Seeds admin + migrates bundled blog posts and case studies into the CMS.
 * Upserts blog posts (create or update body/SEO) so content stays in sync with
 * `src/lib/blog.ts`. Case studies remain create-only (skip if slug exists).
 * Run with: `npm run seed` (requires DATABASE_URL + a migrated DB).
 */

type LexicalNode = Record<string, unknown>;

function textNode(text: string): LexicalNode {
  return {
    type: "text",
    text,
    version: 1,
    format: 0,
    mode: "normal",
    style: "",
    detail: 0,
  };
}

function paragraphNode(text: string): LexicalNode {
  return {
    type: "paragraph",
    version: 1,
    format: "",
    indent: 0,
    direction: "ltr" as const,
    textFormat: 0,
    children: [textNode(text)],
  };
}

function headingNode(text: string, tag: "h2" | "h3" = "h2"): LexicalNode {
  return {
    type: "heading",
    tag,
    version: 1,
    format: "",
    indent: 0,
    direction: "ltr" as const,
    children: [textNode(text)],
  };
}

function listNode(items: string[]): LexicalNode {
  return {
    type: "list",
    listType: "bullet",
    version: 1,
    format: "",
    indent: 0,
    direction: "ltr" as const,
    start: 1,
    children: items.map((text, i) => ({
      type: "listitem",
      version: 1,
      format: "",
      indent: 0,
      direction: "ltr" as const,
      value: i + 1,
      children: [paragraphNode(text)],
    })),
  };
}

/** Build Lexical editor state from structured blog seed content. */
function postToLexical(post: {
  intro: string[];
  sections: BlogSection[];
  conclusion: string[];
}): Post["body"] {
  const children: LexicalNode[] = [];
  for (const p of post.intro) children.push(paragraphNode(p));
  for (const section of post.sections) {
    children.push(headingNode(section.heading, "h2"));
    for (const p of section.paragraphs) children.push(paragraphNode(p));
    if (section.bullets?.length) children.push(listNode(section.bullets));
  }
  for (const p of post.conclusion) children.push(paragraphNode(p));

  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr" as const,
      children,
    },
  } as unknown as Post["body"];
}

const seed = async () => {
  const payload = await getPayload({ config });

  // 1. Admin user
  const email = process.env.SEED_ADMIN_EMAIL || "admin@launchnest.co";
  const password = process.env.SEED_ADMIN_PASSWORD || "ChangeMe!2026";
  const existingUsers = await payload.count({ collection: "users" });
  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: "users",
      data: { email, password, name: "LaunchNest Admin", role: "admin" },
    });
    payload.logger.info(`Created admin user: ${email}`);
  } else {
    payload.logger.info("Users already exist - skipping admin creation.");
  }

  // 2. Blog posts (upsert — refresh body + SEO from catalog)
  for (const post of seedPosts) {
    const existing = await payload.find({
      collection: "posts",
      where: { slug: { equals: post.slug } },
      limit: 1,
      depth: 0,
    });
    const data: Record<string, unknown> = {
      title: post.title,
      slug: post.slug,
      category: post.category,
      readingTime: post.readingTime,
      excerpt: post.excerpt,
      author: post.author,
      publishedAt: new Date(post.date).toISOString(),
      status: "published" as const,
      body: postToLexical(post),
      seo: {
        metaTitle: post.seo.metaTitle,
        metaDescription: post.seo.metaDescription,
      },
    };
    const doc = existing.docs[0];
    if (doc) {
      // Never wipe CMS cover images / media relations on content sync.
      if (doc.coverImage != null) {
        data.coverImage =
          typeof doc.coverImage === "object" && doc.coverImage !== null
            ? (doc.coverImage as { id: number | string }).id
            : doc.coverImage;
      }
      await payload.update({
        collection: "posts",
        id: doc.id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: data as any,
      });
      payload.logger.info(`Updated post: ${post.slug}`);
    } else {
      await payload.create({
        collection: "posts",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: data as any,
      });
      payload.logger.info(`Seeded post: ${post.slug}`);
    }
  }

  // 3. Case studies (upsert content + SEO)
  for (const cs of seedCaseStudies) {
    const existing = await payload.find({
      collection: "case-studies",
      where: { slug: { equals: cs.slug } },
      limit: 1,
      depth: 0,
    });
    const data: Record<string, unknown> = {
      client: cs.client,
      slug: cs.slug,
      industry: cs.industry,
      headlineResult: cs.headlineResult,
      summary: cs.summary,
      accent: cs.accent,
      situation: cs.situation,
      problem: cs.problem,
      whatWeDid: cs.whatWeDid.map((step) => ({ step })),
      results: cs.results.map((r) => ({ metric: r.metric, label: r.label })),
      quote: cs.quote,
      status: "published" as const,
      seo: {
        metaTitle: cs.seo.metaTitle,
        metaDescription: cs.seo.metaDescription,
      },
    };
    const doc = existing.docs[0];
    if (doc) {
      if (doc.coverImage != null) {
        data.coverImage =
          typeof doc.coverImage === "object" && doc.coverImage !== null
            ? (doc.coverImage as { id: number | string }).id
            : doc.coverImage;
      }
      await payload.update({
        collection: "case-studies",
        id: doc.id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: data as any,
      });
      payload.logger.info(`Updated case study: ${cs.slug}`);
    } else {
      await payload.create({
        collection: "case-studies",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: data as any,
      });
      payload.logger.info(`Seeded case study: ${cs.slug}`);
    }
  }

  payload.logger.info("Seed complete.");
};

try {
  await seed();
  process.exit(0);
} catch (err) {
  console.error(err);
  process.exit(1);
}
