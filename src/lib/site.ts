import { CANONICAL_URL } from "./site-origins";

export const siteConfig = {
  name: "LaunchNest",
  /** Domain-tied names for SERP/entity disambiguation (not other “Launch Nest” brands). */
  alternateName: [
    "LaunchNest launch-nest.com",
    "Launch Nest at launch-nest.com",
    "LaunchNest Solutions",
  ],
  tagline: "BUILD · OPTIMIZE · LAUNCH",
  description:
    "LaunchNest (launch-nest.com) is an engineering-first digital agency for SaaS and AI startups — website development, UI/UX, brand identity, technical SEO, and AI automation across the UK, US, and Australia.",
  url:
    process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, "") || CANONICAL_URL,
  email: "solutions@launch-nest.com",
  founded: "est. 2022",
  // Digits only (international format, no "+"), used to build wa.me links.
  whatsapp: "923149555617",
  social: {
    instagram: "https://www.instagram.com/launchnest.tech",
    facebook: "https://www.facebook.com/profile.php?id=61592234365519",
    clutch: "https://clutch.co/profile/launchnest",
  },
  /** Stable Google Business Profile shortlink (Maps / listing). */
  googleBusiness: "https://g.page/r/CaBoV6foQh89EBI",
  /** Shareable GBP link (same listing). */
  googleBusinessShare: "https://share.google/EWYjKD1MeRhaSHdZy",
  /** Direct “Write a review” deep link for the same GBP. */
  googleReview: "https://g.page/r/CaBoV6foQh89EBI/review",
  positioning: {
    label: "Engineering-First Digital Solutions Agency",
    sell: "Growth, lead generation, conversion, speed, SEO visibility, and long-term partnership — not just websites.",
    primaryClients: [
      "SaaS Companies",
      "AI Startups",
      "Tech Startups",
      "Agencies",
    ],
    secondaryClients: [
      "SMBs",
      "Healthcare",
      "Law Firms",
      "Home Services",
      "Real Estate",
      "Coaches",
      "Consultants",
      "Ecommerce Brands",
    ],
  },
};

/** Brand asset paths (under /public) and accessible alt text. */
export const brandAssets = {
  horizontalNavy: {
    path: "/logos/launchnest-horizontal-navy.png",
    width: 910,
    height: 274,
    alt: "LaunchNest wordmark for light backgrounds — navy LaunchNest text with gold arrow through the N and Build · Optimize · Launch tagline",
  },
  horizontalWhite: {
    path: "/logos/launchnest-horizontal-white.png",
    width: 910,
    height: 274,
    alt: "LaunchNest wordmark for dark backgrounds — white and gold LaunchNest text with Build · Optimize · Launch tagline",
  },
  monogram: {
    path: "/logos/launchnest-monogram.png",
    width: 512,
    height: 512,
    alt: "LaunchNest monogram — stylized letter N with gold upward arrow on a navy rounded square",
  },
} as const;

/** Pre-filled WhatsApp chat link. */
export const whatsappLink = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
  "Hi LaunchNest — I'd like to talk about launching or scaling our digital presence."
)}`;

export const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

/** Single primary CTA used across marketing pages and the header. */
export const primaryCta = {
  label: "Book a Free Growth Audit",
  href: "/contact",
};
