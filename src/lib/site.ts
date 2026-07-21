export const siteConfig = {
  name: "LaunchNest",
  tagline: "BUILD · OPTIMIZE · LAUNCH",
  description:
    "LaunchNest is the technical partner growing businesses call when their website has to actually perform. We build, fix, and maintain premium web platforms.",
  // Prefer the live deployment URL until a custom domain is attached.
  url:
    process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, "") ||
    "https://launchnest-nine.vercel.app",
  email: "hello@launchnest.tech",
  founded: "est. 2022",
  // Digits only (international format, no "+"), used to build wa.me links.
  whatsapp: "923149555617",
  social: {
    instagram: "https://www.instagram.com/launchnest.tech",
    facebook: "https://www.facebook.com/profile.php?id=61592234365519",
  },
};

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
