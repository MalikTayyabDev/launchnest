import { getPayload, type Payload } from "payload";
import configPromise from "@payload-config";
import {
  portfolioLive,
  portfolioOffline,
  type PortfolioItem,
} from "./portfolio";
import { isPublicProofDomain } from "./public-proof";

/**
 * Projects data access layer. Reads portfolio projects from Payload (CMS) when
 * the database is reachable, and transparently falls back to the bundled static
 * portfolio data otherwise.
 *
 * Most public cards omit live URLs (contact-gated). Allowlisted public-proof
 * domains keep a clickable liveUrl (re-audit Update 2 — P1).
 */

export type { PortfolioItem };

/** Public card shape — liveUrl only when on the public-proof allowlist. */
export type PublicPortfolioItem = {
  id: string;
  name: string;
  stack: string;
  category: string;
  image: string;
  liveUrl?: string | null;
  liveDomain?: string | null;
};

export function toPublicPortfolioItem(item: PortfolioItem): PublicPortfolioItem {
  const id =
    item.image?.replace(/^\/portfolio\//, "").replace(/\.jpg$/, "") ||
    item.name.toLowerCase().replace(/\s+/g, "-");
  const publicProof = isPublicProofDomain(item.domain || item.url);
  return {
    id,
    name: item.name,
    stack: item.stack,
    category: item.category,
    image: item.image || "",
    liveUrl: publicProof ? item.url : null,
    liveDomain: publicProof ? item.domain : null,
  };
}

/** Prefer public-proof projects first so buyers can verify without contacting. */
function sortPublicProofFirst(items: PublicPortfolioItem[]): PublicPortfolioItem[] {
  return [...items].sort((a, b) => {
    const aPublic = a.liveUrl ? 0 : 1;
    const bPublic = b.liveUrl ? 0 : 1;
    return aPublic - bPublic;
  });
}

/** Home + portfolio featured: public-proof first, then other strong builds. */
const FEATURED_FALLBACK_SLUGS = [
  "wiz-ai",
  "clearmatrix-io",
  "algorithmicsoftware-co-uk",
  "zbiroh-com",
  "store-madmowers-uk",
  "ecofab-ca",
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
export async function getGridProjects(): Promise<PublicPortfolioItem[]> {
  const docs = await fetchProjects({ showInGrid: { equals: true } });
  const items =
    docs && docs.length > 0 ? docs.map(mapProject) : portfolioLive;
  return sortPublicProofFirst(items.map(toPublicPortfolioItem));
}

/** Projects listed under "Also delivered" (no live preview; URLs gated). */
export async function getOfflineProjects(): Promise<PublicPortfolioItem[]> {
  const docs = await fetchProjects({ showInGrid: { equals: false } });
  const items = docs ? docs.map(mapProject) : portfolioOffline;
  return items.map(toPublicPortfolioItem);
}

/** Featured projects promoted on the home page. */
export async function getFeaturedProjects(
  limit = 6,
): Promise<PublicPortfolioItem[]> {
  const docs = await fetchProjects({
    featured: { equals: true },
    showInGrid: { equals: true },
  });
  if (docs && docs.length > 0) {
    return sortPublicProofFirst(
      docs.map(mapProject).map(toPublicPortfolioItem),
    ).slice(0, limit);
  }

  const featured = FEATURED_FALLBACK_SLUGS.map((slug) =>
    portfolioLive.find((p) => slugFromImage(p.image) === slug),
  ).filter((p): p is PortfolioItem => Boolean(p));
  return featured.slice(0, limit).map(toPublicPortfolioItem);
}
