import { siteConfig, brandAssets } from "./site";

/** Countries we actively target (UK, US, Australia). */
export const targetCountries = ["GB", "US", "AU"];

/** Absolute URL for a site path (always self-referencing for canonicals). */
export function absoluteUrl(path = "/"): string {
  const base = siteConfig.url.replace(/\/$/, "");
  if (!path || path === "/") return `${base}/`;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Self-canonical + Open Graph URL for a page path. */
export function selfCanonical(path = "/"): {
  canonical: string;
  openGraph: { url: string };
} {
  const url = absoluteUrl(path);
  return {
    canonical: url,
    openGraph: { url },
  };
}

/** Organization + ProfessionalService schema for the whole site. */
export function organizationSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.email,
    image: `${siteConfig.url}${brandAssets.horizontalWhite.path}`,
    logo: `${siteConfig.url}${brandAssets.monogram.path}`,
    areaServed: targetCountries.map((code) => ({
      "@type": "Country",
      identifier: code,
    })),
    serviceType: [
      "Digital product engineering",
      "SaaS and startup website development",
      "UI/UX design",
      "Brand identity",
      "Technical SEO and content",
      "AI integrations and automation",
      "CRM integration",
      "Website performance optimization",
      "Website maintenance and QA",
    ],
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
    audience: [
      ...siteConfig.positioning.primaryClients,
      ...siteConfig.positioning.secondaryClients,
    ].map((name) => ({
      "@type": "Audience",
      audienceType: name,
    })),
  };
}

/** WebSite schema (enables sitelinks search box eligibility). */
export function websiteSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function serviceSchema(service: {
  label: string;
  shortDescription: string;
  slug: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.label,
    description: service.shortDescription,
    url: `${siteConfig.url}/services/${service.slug}`,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: targetCountries.map((code) => ({
      "@type": "Country",
      identifier: code,
    })),
  };
}

export function articleSchema(post: {
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  author: string;
  coverImage?: { url: string; alt: string } | null;
  primaryKeyword?: string;
}): Record<string, unknown> {
  const url = `${siteConfig.url}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${brandAssets.monogram.path}`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    ...(post.coverImage?.url
      ? {
          image: [post.coverImage.url],
        }
      : {}),
    ...(post.primaryKeyword
      ? { keywords: post.primaryKeyword }
      : {}),
  };
}

export function caseStudySchema(study: {
  client: string;
  headlineResult: string;
  summary: string;
  slug: string;
  industry: string;
  primaryKeyword?: string;
  coverImage?: { url: string; alt: string } | null;
  quote?: { text: string; name: string; role: string } | null;
}): Record<string, unknown> {
  const url = `${siteConfig.url}/work/${study.slug}`;
  const name = `${study.client}: ${study.headlineResult}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: name,
    description: study.summary,
    about: study.industry,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${brandAssets.monogram.path}`,
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    inLanguage: "en",
    areaServed: targetCountries.map((code) => ({
      "@type": "Country",
      identifier: code,
    })),
    ...(study.coverImage?.url ? { image: [study.coverImage.url] } : {}),
    ...(study.primaryKeyword ? { keywords: study.primaryKeyword } : {}),
    ...(study.quote?.text
      ? {
          review: {
            "@type": "Review",
            reviewBody: study.quote.text,
            author: {
              "@type": "Person",
              name: study.quote.name,
              jobTitle: study.quote.role,
            },
          },
        }
      : {}),
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}
