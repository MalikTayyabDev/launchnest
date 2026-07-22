import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { services } from "@/lib/services";
import { getAllPosts, getCaseStudySlugs } from "@/lib/content";
import { audiences } from "@/lib/audiences";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes = [
    "",
    "/services",
    "/portfolio",
    "/pricing",
    "/intro-offer",
    "/about",
    "/blog",
    "/contact",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
  }));

  const serviceRoutes = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
  }));

  const audienceRoutes = audiences.map((a) => ({
    url: `${base}/for/${a.slug}`,
    lastModified: now,
  }));

  const caseSlugs = await getCaseStudySlugs();
  const caseStudyRoutes = caseSlugs.map((slug) => ({
    url: `${base}/work/${slug}`,
    lastModified: now,
  }));

  const posts = await getAllPosts();

  const blogRoutes = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...audienceRoutes,
    ...caseStudyRoutes,
    ...blogRoutes,
  ];
}
