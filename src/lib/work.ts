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
    headlineResult: "AI product site that matches the product’s seriousness",
    summary:
      "WIZ.AI needed a marketing site investors and early users would trust. We shipped a custom production site — open wiz.ai and judge it yourself.",
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
      "WIZ.AI needed a public marketing site that matched an AI product — not a template that undercut trust with investors and early users.",
    problem:
      "Generic agency themes and unclear CTAs make serious AI products look unfinished. Buyers decide in seconds whether to book a demo.",
    whatWeDid: [
      "Shipped a custom production marketing site aligned to the product story.",
      "Clarified the offer and primary CTA paths for early users and investors.",
      "Tuned performance and mobile so the site feels as engineered as the product.",
    ],
    results: [
      { metric: "Live", label: "Production at wiz.ai" },
      { metric: "Custom", label: "Not a template theme" },
      { metric: "AI", label: "Product-category fit" },
    ],
    quote: { text: "", name: "", role: "" },
    accent: "#0B1F3A",
  },
  {
    slug: "clearmatrix-custom-platform",
    client: "Clearmatrix",
    industry: "SaaS",
    headlineResult: "Custom SaaS platform site buyers can open today",
    summary:
      "Clearmatrix needed a bespoke site for a technical product. We delivered a live, maintainable build at clearmatrix.io.",
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
      "Off-the-shelf builders fight bespoke information architecture. The site had to explain a technical offer without looking generic.",
    whatWeDid: [
      "Delivered a custom production site for a tech/SaaS audience.",
      "Structured pages around what it is, who it is for, and how to engage.",
      "Left a maintainable path for ongoing product and marketing updates.",
    ],
    results: [
      { metric: "Live", label: "Production at clearmatrix.io" },
      { metric: "Custom", label: "Bespoke IA & build" },
      { metric: "SaaS", label: "Buyer-facing clarity" },
    ],
    quote: { text: "", name: "", role: "" },
    accent: "#1E8E5A",
  },
  {
    slug: "algorithmicsoftware-uk-commerce",
    client: "Algorithmicsoftware",
    industry: "E-commerce",
    headlineResult: "UK WooCommerce storefront live in production",
    summary:
      "A UK tech commerce brand needed a store their team could run. We shipped WordPress + WooCommerce — live at algorithmicsoftware.co.uk.",
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
      "Algorithmicsoftware needed a UK-facing commerce and marketing site on a stack their team could operate — WordPress with WooCommerce.",
    problem:
      "Commerce sites fail when catalog, conversion paths, and mobile checkout feel bolted on. UK buyers expect a fast, trustworthy storefront.",
    whatWeDid: [
      "Built and shipped a live WordPress + WooCommerce production site.",
      "Focused on usable commerce flows and a storefront that matches the brand.",
      "Chose the stack for editor ownership — not a one-platform sales pitch.",
    ],
    results: [
      { metric: "Live", label: "algorithmicsoftware.co.uk" },
      { metric: "UK", label: "English-market storefront" },
      { metric: "Woo", label: "Team-operable CMS" },
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
