/**
 * Seed + fallback case study catalog.
 * Structured for SEO: primary keyword, meta, related service, US/UK/AU markets.
 * CMS case studies take precedence when published; run `npm run seed` to sync SEO.
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
  primaryKeyword: string;
  relatedService: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "northform-checkout-rebuild",
    client: "Northform Supply",
    industry: "E-commerce",
    headlineResult: "Checkout load time cut by 1.8s",
    summary:
      "Rebuilt a Shopify checkout flow that was quietly bleeding revenue on mobile — the same conversion leak many US, UK, and Australian ecommerce brands hit at scale.",
    primaryKeyword: "Shopify checkout optimization",
    relatedService: "website-design-dev",
    seo: {
      metaTitle: "Shopify Checkout Optimization Case Study — +14% Mobile CVR",
      metaDescription:
        "How LaunchNest cut Shopify checkout load by 1.8s and lifted mobile conversion 14%. Ecommerce performance work for brands selling in the US, UK, and Australia.",
    },
    situation:
      "Northform Supply runs a Shopify store doing steady six-figure monthly revenue, with roughly 70% of traffic on mobile — typical for cross-border ecommerce serving US, UK, and ANZ shoppers.",
    problem:
      "Their checkout took over 4 seconds to become interactive on mid-range phones. Analytics showed a sharp drop-off between cart and payment — a pattern that reads as friction, not intent. Two heavy third-party apps were loading blocking scripts on the checkout path.",
    whatWeDid: [
      "Audited the checkout render path and isolated two blocking third-party scripts.",
      "Replaced one app with a lightweight native alternative and deferred the other.",
      "Rebuilt the cart-to-checkout transition to remove a full page reload.",
      "Preloaded critical fonts and inlined above-the-fold styles.",
    ],
    results: [
      { metric: "1.8s", label: "Faster checkout load" },
      { metric: "+14%", label: "Mobile conversion rate" },
      { metric: "-31%", label: "Cart abandonment" },
    ],
    quote: {
      text: "They didn't just tell us the site was slow. They told us which two scripts, why they were blocking, and what each one cost us. Then they fixed it.",
      name: "Dana Okafor",
      role: "Founder, Northform Supply",
    },
    accent: "#0B1F3A",
  },
  {
    slug: "meridian-legal-site",
    client: "Meridian Legal",
    industry: "Professional Services",
    headlineResult: "3.1x more qualified consultations",
    summary:
      "Replaced a slow, hard-to-update law-firm site with a fast platform their team controls — built for qualified lead generation in competitive professional-services markets.",
    primaryKeyword: "professional services website redesign",
    relatedService: "website-design-dev",
    seo: {
      metaTitle: "Professional Services Website Redesign — 3.1x Consultations",
      metaDescription:
        "Case study: law-firm site rebuild with technical SEO and qualification-first intake. How LaunchNest drove 3.1x more qualified consultations for professional services.",
    },
    situation:
      "Meridian Legal is a mid-size professional-services firm relying on referrals, with a dated website they couldn't update without a developer. Like many UK, US, and Australian practices, organic search and referrals both needed a site that converts.",
    problem:
      "The old site was slow, not mobile-friendly, and every content change required a paid ticket. Their contact form submitted into a black hole with no routing or qualification, so the team chased unqualified leads.",
    whatWeDid: [
      "Rebuilt the site on a CMS the team can edit directly.",
      "Designed a qualification-first intake form that routes by practice area.",
      "Implemented technical SEO and structured data for search visibility.",
      "Set up a maintenance plan for ongoing updates and monitoring.",
    ],
    results: [
      { metric: "3.1x", label: "Qualified consultations" },
      { metric: "0.9s", label: "Largest Contentful Paint" },
      { metric: "100%", label: "Content edits self-served" },
    ],
    quote: {
      text: "For the first time, the leads coming through the site are people we can actually help. And we update the site ourselves now.",
      name: "Priya Raman",
      role: "Managing Partner, Meridian Legal",
    },
    accent: "#1E8E5A",
  },
  {
    slug: "cadence-saas-performance",
    client: "Cadence Analytics",
    industry: "SaaS",
    headlineResult: "Marketing site LCP down to 1.1s",
    summary:
      "Fixed a SaaS marketing site whose slow load was undercutting a fast product — Core Web Vitals work that matters for paid and organic acquisition in the US, UK, and Australia.",
    primaryKeyword: "SaaS Core Web Vitals optimization",
    relatedService: "seo",
    seo: {
      metaTitle: "SaaS Core Web Vitals Case Study — LCP Down to 1.1s",
      metaDescription:
        "How LaunchNest cut a SaaS marketing site LCP to 1.1s and JS by 78%. Technical SEO and performance for SaaS companies targeting US, UK, and Australian buyers.",
    },
    situation:
      "Cadence Analytics sells a performance-monitoring product to teams across North America, the UK, and Australia — but their own marketing site scored poorly on the exact metrics their tool measures.",
    problem:
      "The marketing site was built on a bloated page builder, shipping 2MB of unused JavaScript on the homepage. LCP hovered around 4.2s, which undercut every performance claim in their sales deck.",
    whatWeDid: [
      "Migrated the marketing site off the page builder to a lean framework.",
      "Cut homepage JavaScript by removing unused libraries and code-splitting.",
      "Optimized and served images in modern formats with correct sizing.",
      "Set a performance budget enforced in their build pipeline.",
    ],
    results: [
      { metric: "1.1s", label: "Largest Contentful Paint" },
      { metric: "-78%", label: "JavaScript payload" },
      { metric: "98", label: "Lighthouse performance" },
    ],
    quote: {
      text: "We sell performance monitoring. Now our own site passes the audit we put our customers through. That matters more than it sounds.",
      name: "Marcus Lindqvist",
      role: "CEO, Cadence Analytics",
    },
    accent: "#C9A227",
  },
  {
    slug: "harbour-goods-replatform",
    client: "Harbour & Goods",
    industry: "E-commerce",
    headlineResult: "Store migrated with zero downtime",
    summary:
      "Replatformed an aging store to Shopify without losing rankings or a single order — the migration playbook ecommerce brands need when SEO equity is non-negotiable.",
    primaryKeyword: "Shopify migration SEO",
    relatedService: "website-design-dev",
    seo: {
      metaTitle: "Shopify Migration Case Study — Zero Downtime, Rankings Kept",
      metaDescription:
        "Zero-downtime Shopify replatform with full 301 map and zero ranking loss. Ecommerce migration case study for brands protecting US, UK, and Australian organic traffic.",
    },
    situation:
      "Harbour & Goods, a homeware retailer selling into English-speaking markets, had outgrown a self-hosted store that was slow, fragile, and expensive to keep online.",
    problem:
      "The legacy platform went down during traffic spikes, the checkout wasn't mobile-optimized, and every sale season became a firefight. They needed to migrate but were terrified of losing search rankings and order history.",
    whatWeDid: [
      "Mapped every existing URL and built a complete 301 redirect plan to preserve SEO.",
      "Rebuilt the storefront on Shopify with a performance-first theme.",
      "Migrated products, customers, and order history with validation at each step.",
      "Ran the new store in parallel and cut over during a low-traffic window.",
    ],
    results: [
      { metric: "0", label: "Orders lost in migration" },
      { metric: "0", label: "Rankings dropped" },
      { metric: "2.4s", label: "Faster page loads" },
    ],
    quote: {
      text: "We'd been told a migration meant weeks of chaos and a ranking hit. We had neither. It was the calmest launch we've ever had.",
      name: "Eleanor Whitfield",
      role: "Director, Harbour & Goods",
    },
    accent: "#0B1F3A",
  },
  {
    slug: "brightpath-saas-onboarding",
    client: "BrightPath",
    industry: "SaaS",
    headlineResult: "Trial-to-paid conversion up 22%",
    summary:
      "Rebuilt a confusing SaaS onboarding flow that was losing users before they saw value — UX and conversion work for product-led growth teams.",
    primaryKeyword: "SaaS onboarding UX conversion",
    relatedService: "ui-ux-design",
    seo: {
      metaTitle: "SaaS Onboarding UX Case Study — +22% Trial-to-Paid",
      metaDescription:
        "How LaunchNest redesigned SaaS onboarding to lift trial-to-paid conversion 22%. Product UX case study for SaaS teams selling in the US, UK, and Australia.",
    },
    situation:
      "BrightPath is a project-management SaaS with buyers in the US, UK, and Australia — strong product, steep first-run experience that lost users in the first session.",
    problem:
      "Analytics showed most trial users never completed setup. The onboarding was a wall of optional steps with no clear path to the product's core value, and the marketing site over-promised features the trial buried.",
    whatWeDid: [
      "Mapped the activation moment and redesigned onboarding around reaching it fast.",
      "Cut setup steps by half and made the rest progressive, not upfront.",
      "Aligned the marketing site's promises with the actual first-run experience.",
      "Instrumented the funnel so the team can see where users drop off.",
    ],
    results: [
      { metric: "+22%", label: "Trial-to-paid conversion" },
      { metric: "-40%", label: "Time to first value" },
      { metric: "2x", label: "Setup completion rate" },
    ],
    quote: {
      text: "They treated our onboarding like a conversion problem, not a design project. The redesign paid for itself in a quarter.",
      name: "Tomas Reyes",
      role: "Head of Growth, BrightPath",
    },
    accent: "#1E8E5A",
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
