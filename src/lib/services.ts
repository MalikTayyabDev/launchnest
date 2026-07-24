export type Service = {
  slug: string;
  label: string;
  /** SEO-focused H1 / title keyword phrase */
  primaryKeyword: string;
  shortDescription: string;
  tagline: string;
  overview: string[];
  /** Extra keyword-rich sections rendered on the service page */
  seoSections: { heading: string; body: string }[];
  whoFor: string[];
  deliverables: string[];
  pricing: {
    anchor: string;
    note: string;
  };
  outcome: string;
  faqs?: { q: string; a: string }[];
};

/**
 * Solution pillars — Engineering-First Digital Solutions.
 * Platforms (WordPress, Shopify, Webflow, Wix, GoHighLevel, Next.js) are capabilities,
 * not how we position the agency.
 */
export const services: Service[] = [
  {
    slug: "website-design-dev",
    label: "Website & Product Engineering",
    primaryKeyword: "SaaS website development",
    shortDescription:
      "SaaS website development, startup MVP builds, landing pages, and conversion redesigns — engineered for speed, trials, and pipeline.",
    tagline: "Built to launch. Engineered to scale.",
    overview: [
      "LaunchNest is an engineering-first digital solutions partner for SaaS companies, AI startups, agencies, and growth-stage businesses. We do not sell templates — we ship digital products that generate leads, convert trials, and support revenue.",
      "Whether you need a high-converting landing page, a SaaS marketing site, a startup MVP, an ecommerce storefront, or a full conversion redesign, we choose the stack that fits your roadmap: Next.js, WordPress, Shopify, Webflow, Wix, or GoHighLevel — then we build it properly and hand it over clean.",
    ],
    seoSections: [
      {
        heading: "SaaS website development that converts",
        body: "A SaaS marketing site has one job: turn visitors into trials, demos, or sales conversations. We structure messaging, page speed, and conversion paths around that outcome — not decoration. Typical scopes include homepage, product pages, pricing, docs entry points, and instrumentation so you can see where pipeline drops.",
      },
      {
        heading: "Startup MVP and launch sites",
        body: "Early-stage teams need a credible web presence fast without locking into the wrong stack. We build startup MVP shells and launch sites that look investment-ready, load under our Core Web Vitals standard, and stay editable as your product story changes.",
      },
      {
        heading: "Conversion website redesign",
        body: "If your current site looks fine but does not generate qualified demand, we audit friction, rebuild the critical journeys, and ship a redesign focused on lead generation and activation — with technical SEO and performance baked in before go-live.",
      },
    ],
    whoFor: [
      "SaaS companies needing a faster, clearer marketing site",
      "AI and tech startups launching an MVP or waitlist presence",
      "Agencies that need a reliable build partner",
      "Growing businesses ready for a conversion-focused redesign",
    ],
    deliverables: [
      "Landing pages, SaaS websites, startup MVPs, and business sites",
      "Website redesign and conversion-focused rebuilds",
      "Builds on Next.js, WordPress, Shopify, Webflow, Wix, or GoHighLevel",
      "Mobile-first, accessible layouts with Core Web Vitals tuned before launch",
      "Analytics, tracking, and conversion events wired in",
      "Hosting & deployment setup when you need a production-ready handoff",
    ],
    pricing: {
      anchor: "from $199",
      note: "Most SaaS and growth builds start at Growth Engine ($199+). Starter landings from $79. Custom SaaS / MVP / ecommerce from $599.",
    },
    outcome:
      "A digital presence that loads fast, converts better, and is documented so your team — or the next engineer — can own it.",
    faqs: [
      {
        q: "Are you a WordPress or Shopify agency?",
        a: "No. Those are tools we use when they fit. We position as an engineering-first digital solutions agency — we recommend Next.js, WordPress, Shopify, Webflow, Wix, or GoHighLevel based on your product, editors, and growth plan — not a platform we are trying to sell.",
      },
      {
        q: "Do you build SaaS sites and startup MVPs?",
        a: "Yes. That is primary work for us — marketing sites for SaaS and AI startups, MVP product shells, and conversion-focused launches for agencies and growing businesses.",
      },
      {
        q: "How long does a build take?",
        a: "A focused landing page or marketing site is typically 1–3 weeks; a Growth build 3–5 weeks; SaaS / MVP / custom scopes are planned with milestones before we start.",
      },
    ],
  },
  {
    slug: "ui-ux-design",
    label: "UI/UX Design",
    primaryKeyword: "SaaS UI UX design",
    shortDescription:
      "SaaS UI/UX design for marketing sites, onboarding, and product flows — built for activation and conversion, not decoration.",
    tagline: "Design that drives decisions.",
    overview: [
      "We design for startups, SaaS teams, and growing businesses that need users to understand value fast and take the next step — signup, book a call, buy, or activate.",
      "You get flows, components, and specs engineers can build from — not a pile of pretty screens with no system behind them.",
    ],
    seoSections: [
      {
        heading: "Conversion-focused UX for SaaS",
        body: "SaaS UI/UX design should reduce time-to-value. We map the activation moment, simplify first-run flows, and align marketing promises with what users actually experience in product — so trial-to-paid does not leak at onboarding.",
      },
      {
        heading: "Startup product and marketing design systems",
        body: "Founders need speed without chaos. We deliver reusable components, tokens, and prototypes so your engineering team can ship consistently across landing pages and product surfaces.",
      },
    ],
    whoFor: [
      "SaaS teams with soft trial or demo conversion",
      "Startups redesigning onboarding or core product UI",
      "Companies that need developer-ready Figma systems",
    ],
    deliverables: [
      "User flows and wireframes for marketing and product surfaces",
      "High-fidelity UI with a reusable component system",
      "Interactive prototypes for stakeholder and user testing",
      "Developer-ready specs and design tokens",
      "Accessibility review (contrast, focus states, keyboard nav)",
    ],
    pricing: {
      anchor: "from $199",
      note: "Scoped by screens and flows. Most SaaS / startup projects land in the Growth range.",
    },
    outcome:
      "Clearer journeys, higher conversion on key screens, and a design system your product team can extend.",
    faqs: [
      {
        q: "Do you design for SaaS products or only marketing sites?",
        a: "Both. We design marketing sites, onboarding flows, and product UI for SaaS and startup teams — always tied to a conversion or activation goal.",
      },
      {
        q: "Do you hand off developer-ready files?",
        a: "Yes. Components, states, and tokens in Figma — files an engineer can implement without guessing.",
      },
    ],
  },
  {
    slug: "graphic-design",
    label: "Brand Identity",
    primaryKeyword: "brand identity for startups",
    shortDescription:
      "Brand identity for startups and agencies — logos, visual systems, and marketing assets that look investment-ready.",
    tagline: "Identity that travels with you.",
    overview: [
      "Brand identity for modern businesses — logos, systems, and collateral that stay consistent from your landing page to your pitch deck to your product UI.",
      "We deliver source files and usage guidelines so your team can move fast without going off-brand.",
    ],
    seoSections: [
      {
        heading: "Premium brand systems for early-stage companies",
        body: "Investors and customers judge credibility in seconds. We build brand identity for startups that holds up on a SaaS marketing site, pitch deck, and product UI — with guidelines your team can actually use.",
      },
    ],
    whoFor: [
      "Startups preparing to launch or fundraise",
      "Agencies refreshing their own brand",
      "Teams that need brand + website from one partner",
    ],
    deliverables: [
      "Logo and brand identity systems",
      "Visual language for web, product, and sales materials",
      "Pitch decks and one-pagers",
      "Marketing and ad creative kits",
      "Editable source files + brand guidelines",
    ],
    pricing: {
      anchor: "from $149",
      note: "Per-asset or brand system. Full identity packages are scoped individually.",
    },
    outcome:
      "A coherent brand presence that supports premium positioning and trust with buyers.",
    faqs: [
      {
        q: "Can brand identity roll into a full website build?",
        a: "Yes — and that is usually the better path. One partner for branding, UI/UX, and engineering keeps the launch consistent end-to-end.",
      },
      {
        q: "Do I get editable source files?",
        a: "Every time. Source files plus a short usage guide so you are never locked in for a simple change.",
      },
    ],
  },
  {
    slug: "ai-automation",
    label: "AI, Automation & Integrations",
    primaryKeyword: "AI integrations for SaaS",
    shortDescription:
      "AI integrations for SaaS, marketing automation, and CRM workflows that remove manual work and speed growth.",
    tagline: "Systems that compound.",
    overview: [
      "Built for SaaS companies, AI startups, agencies, and operators who need more than a brochure site — chat agents, automations, CRM sync, and AI-assisted workflows wired into the product or marketing stack.",
      "We integrate what you already use and build what is missing, with engineering standards you can maintain.",
    ],
    seoSections: [
      {
        heading: "AI integrations that support real workflows",
        body: "AI integrations for SaaS should reduce support load, qualify leads, or speed product features — not add a gimmick widget. We scope assistants, content helpers, and product AI against a clear business outcome and wire them into your existing stack.",
      },
      {
        heading: "CRM automation and marketing ops",
        body: "Lead routing, booking flows, notifications, and CRM sync stop pipeline from dying in inboxes. We design marketing automation that your team can operate after handoff — with logging and failure paths, not fragile zap-only glue.",
      },
    ],
    whoFor: [
      "SaaS teams adding AI features or support assistants",
      "Startups drowning in manual lead follow-up",
      "Agencies needing CRM and booking automation for clients",
    ],
    deliverables: [
      "AI integrations (assistants, content helpers, product features)",
      "Marketing and ops automation",
      "CRM integration and lead routing",
      "Form, booking, and notification workflows",
      "API connections and third-party tooling",
    ],
    pricing: {
      anchor: "from $199",
      note: "Scoped by integrations and complexity. Often paired with a Growth or Custom build.",
    },
    outcome:
      "Less manual follow-up, faster response times, and a stack that supports scale without hiring headcount for every task.",
    faqs: [
      {
        q: "Do you only build chatbots?",
        a: "No. Chat is one option. We also wire CRM sync, lead qualification, booking flows, and AI features inside SaaS products.",
      },
      {
        q: "Can you connect our existing CRM?",
        a: "Yes. We integrate common CRMs and marketing tools, or design a clean handoff into your ops stack.",
      },
    ],
  },
  {
    slug: "seo",
    label: "Technical SEO & Content",
    primaryKeyword: "technical SEO agency",
    shortDescription:
      "Technical SEO agency services for SaaS and startups — Core Web Vitals, indexing fixes, and content that drives qualified demand.",
    tagline: "Visibility with a commercial point.",
    overview: [
      "We fix what blocks indexing and speed first — then we write and structure content around the keywords that attract SaaS buyers, startup founders, agencies, and growth-stage businesses.",
      "You get a prioritized technical backlog plus content that supports lead generation, not vanity traffic.",
    ],
    seoSections: [
      {
        heading: "Technical SEO and Core Web Vitals",
        body: "As a technical SEO partner, we prioritize crawlability, canonicals, sitemap hygiene, schema, and Core Web Vitals — especially LCP on acquisition pages. Speed and structure are prerequisites before content scale.",
      },
      {
        heading: "SEO content writing for SaaS and startups",
        body: "We map commercial-intent keywords to money pages and supporting articles, then write content that answers buyer questions and links into your growth audit or product CTAs. Ranking without pipeline is not the goal.",
      },
    ],
    whoFor: [
      "SaaS companies with thin or poorly structured content",
      "Sites with indexing, canonical, or Core Web Vitals issues",
      "Teams that want SEO retainers tied to leads, not vanity metrics",
    ],
    deliverables: [
      "Technical SEO audits and implementation",
      "On-page optimization and schema markup",
      "Speed / Core Web Vitals work",
      "Keyword strategy for commercial intent",
      "Content writing and blog writing systems",
      "Monthly ranking and traffic reporting on retainers",
    ],
    pricing: {
      anchor: "from $25/mo",
      note: "One-time audits available; ongoing SEO and content run as monthly engagements.",
    },
    outcome:
      "A faster, better-indexed site and content that supports pipeline — not just impressions.",
    faqs: [
      {
        q: "Do you write content or only do technical SEO?",
        a: "Both. Technical SEO and Core Web Vitals first; then content and blog writing mapped to the terms that drive inquiries.",
      },
      {
        q: "Can you help us rank in the UK, US, and Australia?",
        a: "Yes. We structure sites and content for English-speaking markets and track performance by region when it matters.",
      },
    ],
  },
  {
    slug: "maintenance-support",
    label: "Maintenance, QA & Growth Care",
    primaryKeyword: "website maintenance retainer",
    shortDescription:
      "Website maintenance retainer with QA testing, hosting support, updates, monitoring, and ongoing growth care.",
    tagline: "Launch is day one. Partnership is the product.",
    overview: [
      "We stay after launch — QA before release, hosting and deployment support when needed, then ongoing updates, backups, monitoring, and performance checks.",
      "Built for founders and operators who want one accountable partner instead of rotating freelancers every time something breaks.",
    ],
    seoSections: [
      {
        heading: "Website maintenance that prevents emergencies",
        body: "A real website maintenance retainer covers dependency updates, backups you can restore, uptime monitoring, and security patching — plus someone who already knows your stack when something breaks at 2am.",
      },
      {
        heading: "QA, hosting, and deployment support",
        body: "We run QA before releases and help with hosting and deployment when you need a production-ready handoff. Growth retainers add roadmap time so maintenance compounds into continuous improvement.",
      },
    ],
    whoFor: [
      "Teams that launched without an ongoing owner",
      "Founders tired of emergency freelancer cycles",
      "Companies that want QA + care on Next.js, Shopify, WordPress, and more",
    ],
    deliverables: [
      "QA testing before and after releases",
      "Hosting & deployment support",
      "Software, plugin, and dependency updates",
      "Automated backups and uptime monitoring",
      "Security patching and performance checks",
      "Priority support with real response times",
    ],
    pricing: {
      anchor: "from $9/mo",
      note: "Care, Growth, and Partner retainers — designed for recurring partnership, not one-off firefighting.",
    },
    outcome:
      "Stable uptime, fewer emergencies, and a partner who already knows your stack when growth work is needed.",
    faqs: [
      {
        q: "Do you maintain sites you didn’t build?",
        a: "Often yes. We start with an audit and QA pass, bring the stack to a maintainable standard, then take over care.",
      },
      {
        q: "Is this only for WordPress?",
        a: "No. We maintain and monitor across the stacks we ship — including Next.js, Shopify, Webflow, Wix, and GoHighLevel — scoped to what you run.",
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
