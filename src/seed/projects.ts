import { getPayload } from "payload";
import config from "@payload-config";
import type { Project } from "../payload-types";
import { portfolioLive, portfolioOffline } from "../lib/portfolio";

/**
 * Seeds the Projects collection from the bundled static portfolio data.
 * Idempotent — skips any project whose URL already exists. Run with:
 * `npm run seed:projects` (requires DATABASE_URL + a migrated/pushed DB).
 */

const FEATURED_SLUGS = new Set([
  "zbiroh-com",
  "store-madmowers-uk",
  "ecofab-ca",
  "heartbreakhotel-no",
  "mastercutnaturalstone-com",
  "specialized-med-com",
]);

const slugFromImage = (image: string) =>
  image.replace(/^\/portfolio\//, "").replace(/\.jpg$/, "");

const seed = async () => {
  const payload = await getPayload({ config });

  let created = 0;
  let skipped = 0;

  const upsert = async (
    item: (typeof portfolioLive)[number],
    opts: { showInGrid: boolean; order: number },
  ) => {
    const exists = await payload.count({
      collection: "projects",
      where: { url: { equals: item.url } },
    });
    if (exists.totalDocs > 0) {
      skipped += 1;
      return;
    }
    await payload.create({
      collection: "projects",
      data: {
        name: item.name,
        url: item.url,
        domain: item.domain,
        platform: item.category as Project["platform"],
        stackLabel: item.stack,
        imagePath: item.image || undefined,
        featured: FEATURED_SLUGS.has(slugFromImage(item.image)),
        showInGrid: opts.showInGrid,
        order: opts.order,
        status: "published",
      },
    });
    created += 1;
  };

  for (let i = 0; i < portfolioLive.length; i += 1) {
    await upsert(portfolioLive[i], { showInGrid: true, order: i });
  }
  for (let i = 0; i < portfolioOffline.length; i += 1) {
    await upsert(portfolioOffline[i], { showInGrid: false, order: 1000 + i });
  }

  payload.logger.info(
    `Projects seed complete. Created ${created}, skipped ${skipped}.`,
  );
};

try {
  await seed();
  process.exit(0);
} catch (err) {
  console.error(err);
  process.exit(1);
}
