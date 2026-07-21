import { CANONICAL_URL } from "./site-origins";

export const siteConfig = {
  name: "LaunchNest",
  tagline: "BUILD · OPTIMIZE · LAUNCH",
  description:
    "LaunchNest is the technical partner growing businesses call when their website has to actually perform. We build, fix, and maintain premium web platforms.",
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
  "Hi LaunchNest, I'd like to talk about a website project."
)}`;

export const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
];

export const primaryCta = {
  label: "Free Technical Audit",
  href: "/#audit-form",
};
