/**
 * Seed + fallback case study catalog.
 * Real, live, linkable portfolio projects only — no unverifiable invented metrics.
 * CMS case studies take precedence when published; seed is create-only.
 */

export type Industry = "E-commerce" | "Professional Services" | "SaaS";

export type CaseStudy = {
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
  /** Live production URL — must match portfolio grid. */
  liveUrl: string;
  liveDomain: string;
  primaryKeyword: string;
  relatedService: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "wiz-ai-product-site",
    client: "WIZ.AI",
    industry: "SaaS",
    headlineResult: "Live AI product marketing site in production",
    summary:
      "Custom-built marketing presence for an AI product — fast, credible, and checkable at wiz.ai.",
    liveUrl: "https://www.wiz.ai/",
    liveDomain: "wiz.ai",
    primaryKeyword: "AI startup website",
    relatedService: "website-design-dev",
    seo: {
      metaTitle: "WIZ.AI Case Study — Live AI Product Website | LaunchNest",
      metaDescription:
        "Live case study: WIZ.AI product marketing site (wiz.ai). Custom engineering-first build for an AI company — visit the live site.",
    },
    situation:
      "WIZ.AI needed a public marketing site that matched the seriousness of an AI product — not a template that undercut trust with investors and early users.",
    problem:
      "AI startups often launch with generic agency themes. Buyers and investors judge the product by the site first; unclear messaging and slow pages kill credibility before a demo.",
    whatWeDid: [
      "Shipped a custom production marketing site aligned to the product story.",
      "Prioritized clarity of offer, CTA paths, and a stack the team can iterate on.",
      "Tuned for performance and mobile so the site feels as engineered as the product.",
    ],
    results: [
      { metric: "Live", label: "Production at wiz.ai" },
      { metric: "Custom", label: "Engineered stack" },
      { metric: "AI", label: "Product-category fit" },
    ],
    quote: { text: "", name: "", role: "" },
    accent: "#0B1F3A",
  },
  {
    slug: "clearmatrix-custom-platform",
    client: "Clearmatrix",
    industry: "SaaS",
    headlineResult: "Custom tech platform site — live and linkable",
    summary:
      "Custom web presence for Clearmatrix — a live, checkable build at clearmatrix.io.",
    liveUrl: "https://clearmatrix.io/",
    liveDomain: "clearmatrix.io",
    primaryKeyword: "custom SaaS website development",
    relatedService: "website-design-dev",
    seo: {
      metaTitle: "Clearmatrix Case Study — Custom Live Site | LaunchNest",
      metaDescription:
        "Live case study: Clearmatrix custom web platform (clearmatrix.io). Engineering-first delivery you can verify in the browser.",
    },
    situation:
      "Clearmatrix needed a custom web presence that reflected a technical product — something buyers could open and trust immediately.",
    problem:
      "Off-the-shelf builders struggle when the brand and product need a bespoke information architecture and a stack that won’t fight future features.",
    whatWeDid: [
      "Delivered a custom production site suited to a tech/SaaS audience.",
      "Structured pages for clarity: what it is, who it’s for, and how to engage.",
      "Left the team with a maintainable build path for ongoing iteration.",
    ],
    results: [
      { metric: "Live", label: "Production at clearmatrix.io" },
      { metric: "Custom", label: "Bespoke delivery" },
      { metric: "SaaS", label: "Primary audience fit" },
    ],
    quote: { text: "", name: "", role: "" },
    accent: "#1E8E5A",
  },
  {
    slug: "algorithmicsoftware-uk-commerce",
    client: "Algorithmicsoftware",
    industry: "E-commerce",
    headlineResult: "UK WooCommerce site live in production",
    summary:
      "WordPress + WooCommerce build for a UK tech commerce brand — live at algorithmicsoftware.co.uk.",
    liveUrl: "https://algorithmicsoftware.co.uk/",
    liveDomain: "algorithmicsoftware.co.uk",
    primaryKeyword: "WooCommerce website UK",
    relatedService: "website-design-dev",
    seo: {
      metaTitle: "Algorithmicsoftware Case Study — Live UK WooCommerce Site",
      metaDescription:
        "Live case study: Algorithmicsoftware WooCommerce site (algorithmicsoftware.co.uk). Verifiable LaunchNest portfolio work for UK buyers.",
    },
    situation:
      "Algorithmicsoftware needed a UK-facing commerce/marketing site on a stack their team could operate — WordPress with WooCommerce.",
    problem:
      "Commerce sites fail when catalog, conversion paths, and mobile checkout feel bolted on. UK buyers also expect fast, trustworthy storefronts.",
    whatWeDid: [
      "Built and shipped a live WordPress + WooCommerce production site.",
      "Focused on usable commerce flows and a storefront that matches the brand.",
      "Aligned with our multi-stack capability — the right tool for the job, not a one-platform pitch.",
    ],
    results: [
      { metric: "Live", label: "algorithmicsoftware.co.uk" },
      { metric: "UK", label: "English-market storefront" },
      { metric: "Woo", label: "WordPress commerce stack" },
    ],
    quote: { text: "", name: "", role: "" },
    accent: "#C9A227",
  },
];

export const industries: Industry[] = [
  "E-commerce",
  "Professional Services",
  "SaaS",
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
