export type AudienceFaq = { q: string; a: string };

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
  /** Optional page FAQs — otherwise the /for template uses generic ones. */
  faqs?: AudienceFaq[];
  /** Overrides the “Why this page exists” H2. */
  whyHeading?: string;
};

export const audiences: AudiencePage[] = [
  {
    slug: "saas",
    label: "For SaaS",
    title: "SaaS Website Development Agency",
    description:
      "SaaS website development agency for trial conversion, Core Web Vitals, technical SEO, and product launch sites — LaunchNest at launch-nest.com.",
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
    caseStudySlugs: [
      "wiz-ai-product-site",
      "clearmatrix-custom-platform",
      "algorithmicsoftware-uk-commerce",
    ],
  },
  {
    slug: "ai-startups",
    label: "For AI startups",
    title: "AI Startup Website Design & Launch",
    description:
      "AI startup website design and MVP launch partner — a credible marketing site, clear conversion paths, and Next.js builds founders can ship in weeks. LaunchNest at launch-nest.com.",
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
    caseStudySlugs: [
      "wiz-ai-product-site",
      "clearmatrix-custom-platform",
      "algorithmicsoftware-uk-commerce",
    ],
  },
  {
    slug: "website-audit",
    label: "Website audit",
    title: "Free Website Audit for Startups",
    description:
      "Free website audit for startups and SaaS — speed, messaging, technical SEO, and stack fit, with prioritized next steps. Book a growth audit at launch-nest.com.",
    headline: "A website audit that tells you what to fix first.",
    subhead:
      "Free website growth audit for SaaS and startup founders: Core Web Vitals, offer clarity, indexing gaps, and whether to keep or rebuild — then a scoped path, not a pitch deck.",
    whyHeading: "What the free website audit actually covers",
    body: [
      "A website audit for startups is not a 40-page PDF of Lighthouse scores. Founders need to know what is blocking trials, demos, or sales calls this month — speed, unclear messaging, weak CTAs, or a stack nobody on the team can own.",
      "The LaunchNest free growth audit reviews your live URL for Core Web Vitals and mobile conversion blockers, checks whether the offer and ICP are obvious, snapshots technical SEO (indexability, titles, money-page gaps), and gives an honest stack recommendation: keep, rebuild, or hybrid.",
      "You leave with a prioritized list: what to fix first versus what can wait. Use it to brief any partner — or book us for SaaS website design and development if the fit is real. See live proof on the portfolio, then check pricing so scope is clear before a call.",
    ],
    pains: [
      "The site looks fine but leads and trials are flat",
      "You do not know if the problem is speed, copy, SEO, or the stack",
      "Agencies pitch a redesign before diagnosing the live site",
      "You want a concrete agenda before spending on a rebuild",
    ],
    outcomes: [
      "A written snapshot of speed, messaging, SEO, and stack fit",
      "Prioritized next steps — what to fix first vs. what can wait",
      "Clear CTA into a scoped build or retainer if you want a partner",
      "Same-week reply — not a 30-day discovery theater cycle",
    ],
    services: [
      { label: "Book the free audit", href: "/contact" },
      { label: "SaaS website pricing", href: "/pricing" },
      { label: "Live case studies", href: "/portfolio" },
      { label: "SaaS website design & development", href: "/services/website-design-dev" },
    ],
    caseStudySlugs: [
      "wiz-ai-product-site",
      "clearmatrix-custom-platform",
      "algorithmicsoftware-uk-commerce",
    ],
    faqs: [
      {
        q: "What does a free website audit for startups include?",
        a: "A live URL review of speed (Core Web Vitals), messaging and CTA fit, a technical SEO snapshot (indexability, titles, money-page gaps), stack fit (keep vs rebuild), and prioritized next steps — not a sales script.",
      },
      {
        q: "Who is the website growth audit for?",
        a: "SaaS companies, AI startups, and growth-stage teams who suspect the site is leaking pipeline and want a concrete diagnosis before hiring for a rebuild or retainer.",
      },
      {
        q: "Is the audit actually free?",
        a: "Yes. You leave with specifics whether or not you hire LaunchNest. If there is a fit, we can scope a build from the same findings.",
      },
    ],
  },
];

export function getAudience(slug: string): AudiencePage | undefined {
  return audiences.find((a) => a.slug === slug);
}
