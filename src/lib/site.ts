import { CANONICAL_URL } from "./site-origins";

export const siteConfig = {
  name: "LaunchNest",
  tagline: "BUILD · OPTIMIZE · LAUNCH",
  description:
    "Engineering-first digital solutions agency for SaaS companies, AI startups, and agencies. We build conversion-focused websites, startup MVPs, technical SEO, and AI automation — UK, US, and Australia.",
  url:
    process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, "") || CANONICAL_URL,
  email: "hello@launchnest.tech",
  founded: "est. 2022",
  // Digits only (international format, no "+"), used to build wa.me links.
  whatsapp: "923149555617",
  social: {
    instagram: "https://www.instagram.com/launchnest.tech",
    facebook: "https://www.facebook.com/profile.php?id=61592234365519",
  },
  /** Google Business Profile — direct review link. */
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
