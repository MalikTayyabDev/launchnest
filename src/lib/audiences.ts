export type AudiencePage = {
  slug: string;
  label: string;
  title: string;
  description: string;
  headline: string;
  subhead: string;
  pains: string[];
  outcomes: string[];
  /** Case study slugs to feature (must exist in work.ts / CMS). */
  caseStudySlugs: string[];
};

export const audiences: AudiencePage[] = [
  {
    slug: "saas",
    label: "For SaaS",
    title: "SaaS marketing sites & product launches",
    description:
      "Engineering-first partner for SaaS companies — marketing sites, trial conversion, performance, and growth systems that match a serious product.",
    headline: "SaaS sites that convert trials — not just look sharp.",
    subhead:
      "We partner with SaaS teams who need a marketing site and launch surfaces that load fast, explain value clearly, and turn traffic into pipeline. Engineering-first. Outcome-obsessed.",
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
    caseStudySlugs: ["cadence-saas-performance", "brightpath-saas-onboarding"],
  },
  {
    slug: "ai-startups",
    label: "For AI startups",
    title: "AI startup websites & MVP launches",
    description:
      "Launch and growth partner for AI startups — credible marketing sites, MVP shells, and conversion systems built for founders shipping fast.",
    headline: "Ship a credible AI product presence — fast.",
    subhead:
      "Investors and early users judge your product by the site first. We help AI startups launch marketing sites and MVP surfaces that feel engineered, convert interest, and stay easy to iterate.",
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
    caseStudySlugs: ["brightpath-saas-onboarding", "cadence-saas-performance"],
  },
];

export function getAudience(slug: string): AudiencePage | undefined {
  return audiences.find((a) => a.slug === slug);
}
