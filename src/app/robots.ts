import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/**
 * Crawl rules for the public marketing site.
 * Disallow CMS admin + API surfaces; allow money pages and content.
 */
export default function robots(): MetadataRoute.Robots {
  const host = siteConfig.url.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/api/",
          "/api/*",
        ],
      },
      {
        userAgent: "GPTBot",
        disallow: ["/"],
      },
      {
        userAgent: "CCBot",
        disallow: ["/"],
      },
    ],
    sitemap: `${host}/sitemap.xml`,
    host,
  };
}
