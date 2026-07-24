import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/**
 * Crawl rules for the public marketing site.
 * Note: do NOT emit a `Host:` line — Googlebot ignores it (Yandex-only) and GSC warns.
 */
export default function robots(): MetadataRoute.Robots {
  const host = siteConfig.url.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/"],
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
  };
}
