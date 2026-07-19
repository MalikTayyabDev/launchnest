import { getPayload } from "payload";
import config from "@payload-config";
import type { Post } from "../payload-types";
import { posts as seedPosts } from "../lib/blog";
import { caseStudies as seedCaseStudies } from "../lib/work";

/**
 * One-time seed: creates an initial admin user and migrates the bundled
 * blog posts + case studies into the CMS. Idempotent - skips anything that
 * already exists. Run with: `npm run seed` (requires DATABASE_URL + a migrated DB).
 */

/** Build a minimal Lexical editor state from plain paragraphs. */
function paragraphsToLexical(paragraphs: string[]): Post["body"] {
  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr" as const,
      children: paragraphs.map((text) => ({
        type: "paragraph",
        version: 1,
        format: "",
        indent: 0,
        direction: "ltr" as const,
        textFormat: 0,
        children: [
          {
            type: "text",
            text,
            version: 1,
            format: 0,
            mode: "normal",
            style: "",
            detail: 0,
          },
        ],
      })),
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

  // 2. Blog posts
  for (const post of seedPosts) {
    const exists = await payload.count({
      collection: "posts",
      where: { slug: { equals: post.slug } },
    });
    if (exists.totalDocs > 0) continue;
    await payload.create({
      collection: "posts",
      data: {
        title: post.title,
        slug: post.slug,
        category: post.category,
        readingTime: post.readingTime,
        excerpt: post.excerpt,
        author: post.author,
        publishedAt: new Date(post.date).toISOString(),
        status: "published",
        body: paragraphsToLexical(post.body),
      },
    });
    payload.logger.info(`Seeded post: ${post.slug}`);
  }

  // 3. Case studies
  for (const cs of seedCaseStudies) {
    const exists = await payload.count({
      collection: "case-studies",
      where: { slug: { equals: cs.slug } },
    });
    if (exists.totalDocs > 0) continue;
    await payload.create({
      collection: "case-studies",
      data: {
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
        status: "published",
      },
    });
    payload.logger.info(`Seeded case study: ${cs.slug}`);
  }

  payload.logger.info("Seed complete.");
};

// Top-level await so `payload run` waits for seeding to finish before exiting.
try {
  await seed();
  process.exit(0);
} catch (err) {
  console.error(err);
  process.exit(1);
}
