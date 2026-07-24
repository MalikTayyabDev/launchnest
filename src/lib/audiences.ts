export type AudiencePage = {
  slug: string;
  label: string;
  title: string;
  description: string;
  headline: string;
  subhead: string;
  /** Keyword-rich body paragraphs for SEO depth */
  body: string[];
  pains: string[];
  outcomes: string[];
  services: { label: string; href: string }[];
  /** Case study slugs to feature (must exist in work.ts / CMS). */
  caseStudySlugs: string[];
};

export const audiences: AudiencePage[] = [
  {
    slug: "saas",
    label: "For SaaS",
    title: "SaaS Marketing Site Agency & Product Launch Partner",
    description:
      "SaaS marketing site agency and engineering-first growth partner — trial conversion, Core Web Vitals, technical SEO, and AI automation for SaaS companies.",
    headline: "SaaS marketing sites that convert trials — not just look sharp.",
    subhead:
      "We partner with SaaS teams who need a marketing site and launch surfaces that load fast, explain value clearly, and turn traffic into pipeline. Engineering-first. Outcome-obsessed.",
    body: [
      "SaaS website development is not the same job as a brochure site. Your homepage, pricing page, and product narrative have to create enough clarity for a trial, demo, or sales conversation — while Core Web Vitals stay fast enough that buyers trust the product you sell.",
      "LaunchNest works as a SaaS marketing site agency and product launch partner: branding and UI/UX when needed, engineering on the right stack, technical SEO for commercial keywords, and optional AI or CRM automation so leads do not die in inboxes.",
      "If you are comparing agencies, look for ownership after launch. We stay for website maintenance retainers, SEO content, and conversion iteration — so growth compounds instead of resetting every vendor change.",
    ],
    pains: [
      "Marketing site is slower than the product you sell",
      "Homepage looks fine but trial signup is soft",
      "Agency handoffs leave you with a stack nobody owns",
      "You need SEO and conversion work, not another redesign theater",
    ],
    outcomes: [
      "Faster LCP and cleaner Core Web Vitals on acquisition pages",
      "Clearer value prop → demo / trial paths",
      "Tracking that shows where pipeline actually drops",
      "A partner who can ship product marketing and keep iterating",
    ],
    services: [
      { label: "SaaS website development", href: "/services/website-design-dev" },
      { label: "SaaS UI/UX design", href: "/services/ui-ux-design" },
      { label: "Technical SEO agency", href: "/services/seo" },
      { label: "AI integrations for SaaS", href: "/services/ai-automation" },
    ],
    caseStudySlugs: ["cadence-saas-performance", "brightpath-saas-onboarding"],
  },
  {
    slug: "ai-startups",
    label: "For AI startups",
    title: "AI Startup Website & MVP Launch Partner",
    description:
      "AI startup website and MVP launch partner — credible marketing sites, Next.js builds, conversion paths, and AI integrations for founders shipping fast.",
    headline: "Ship a credible AI startup website — fast.",
    subhead:
      "Investors and early users judge your product by the site first. We help AI startups launch marketing sites and MVP surfaces that feel engineered, convert interest, and stay easy to iterate.",
    body: [
      "An AI startup website has to communicate a complex product simply: problem, capability, proof, and a clear next step (waitlist, demo, or early access). Generic agency templates usually fail that test.",
      "We help AI startups launch with engineering-first builds — often Next.js — plus brand and UI when needed, technical SEO foundations, and AI integrations that match real workflows instead of novelty chat widgets.",
      "Speed matters twice: page performance (Core Web Vitals) and delivery timeline. Focused marketing sites ship in weeks with a clear scope, then scale into SEO content and automation as you grow.",
    ],
    pains: [
      "Site looks template-y next to a serious AI product",
      "Messaging is technical but conversion paths are vague",
      "Need to launch in weeks, not a six-month agency cycle",
      "Want one partner for brand, site, and ongoing growth — not five vendors",
    ],
    outcomes: [
      "A launch-ready site that matches product ambition",
      "Clear CTA paths for waitlist, demo, or early access",
      "Stack you can own (often Next.js) with clean handoff",
      "Room to add SEO, content, and automation as you scale",
    ],
    services: [
      { label: "Startup MVP websites", href: "/services/website-design-dev" },
      { label: "Brand identity for startups", href: "/services/graphic-design" },
      { label: "AI integrations", href: "/services/ai-automation" },
      { label: "Technical SEO & content", href: "/services/seo" },
    ],
    caseStudySlugs: ["brightpath-saas-onboarding", "cadence-saas-performance"],
  },
];

export function getAudience(slug: string): AudiencePage | undefined {
  return audiences.find((a) => a.slug === slug);
}
