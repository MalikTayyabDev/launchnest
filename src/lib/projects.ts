import { getPayload, type Payload } from "payload";
import configPromise from "@payload-config";
import {
  portfolioLive,
  portfolioOffline,
  type PortfolioItem,
} from "./portfolio";

/**
 * Projects data access layer. Reads portfolio projects from Payload (CMS) when
 * the database is reachable, and transparently falls back to the bundled static
 * portfolio data otherwise. Every consumer works with the shared PortfolioItem
 * shape so the UI is identical regardless of source.
 */

export type { PortfolioItem };

/** The six projects promoted to the home page when no CMS data is available. */
const FEATURED_FALLBACK_SLUGS = [
  "zbiroh-com",
  "store-madmowers-uk",
  "ecofab-ca",
  "heartbreakhotel-no",
  "mastercutnaturalstone-com",
  "specialized-med-com",
];

const slugFromImage = (image: string) =>
  image.replace(/^\/portfolio\//, "").replace(/\.jpg$/, "");

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

function mapProject(doc: Record<string, any>): PortfolioItem {
  const screenshot =
    doc.screenshot && typeof doc.screenshot === "object"
      ? (doc.screenshot.url as string | undefined)
      : undefined;
  return {
    name: doc.name,
    domain: doc.domain ?? doc.url,
    url: doc.url,
    stack: doc.stackLabel || doc.platform,
    category: doc.platform,
    image: screenshot || doc.imagePath || "",
    reachable: Boolean(doc.showInGrid),
  };
}

async function fetchProjects(where: Record<string, unknown>) {
  const payload = await tryPayload();
  if (!payload) return null;
  try {
    const res = await payload.find({
      collection: "projects",
      where: { status: { equals: "published" }, ...where },
      sort: ["order", "createdAt"],
      limit: 500,
      depth: 1,
    });
    return res.docs;
  } catch {
    return null;
  }
}

/** Live projects shown in the visual, filterable grid. */
export async function getGridProjects(): Promise<PortfolioItem[]> {
  const docs = await fetchProjects({ showInGrid: { equals: true } });
  if (docs && docs.length > 0) return docs.map(mapProject);
  return portfolioLive;
}

/** Projects listed under "Also delivered" (no live preview). */
export async function getOfflineProjects(): Promise<PortfolioItem[]> {
  const docs = await fetchProjects({ showInGrid: { equals: false } });
  if (docs) return docs.map(mapProject);
  return portfolioOffline;
}

/** Featured projects promoted on the home page. */
export async function getFeaturedProjects(limit = 6): Promise<PortfolioItem[]> {
  const docs = await fetchProjects({
    featured: { equals: true },
    showInGrid: { equals: true },
  });
  if (docs && docs.length > 0) return docs.slice(0, limit).map(mapProject);

  const featured = FEATURED_FALLBACK_SLUGS.map((slug) =>
    portfolioLive.find((p) => slugFromImage(p.image) === slug),
  ).filter((p): p is PortfolioItem => Boolean(p));
  return featured.slice(0, limit);
}
