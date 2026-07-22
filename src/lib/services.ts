export type Service = {
  slug: string;
  label: string;
  shortDescription: string;
  tagline: string;
  overview: string[];
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
    shortDescription:
      "Landing pages, SaaS marketing sites, startup MVPs, business sites, and redesigns — engineered for speed, conversion, and growth.",
    tagline: "Built to launch. Engineered to scale.",
    overview: [
      "We are an engineering-first digital solutions partner — not a WordPress shop or a template mill. We design and ship digital products that generate leads, convert trials, and support real revenue.",
      "Whether you need a high-converting landing page, a SaaS marketing site, a startup MVP, an ecommerce storefront, or a full redesign, we pick the stack that fits your roadmap: Next.js, WordPress, Shopify, Webflow, Wix, or GoHighLevel — then we build it properly and hand it over clean.",
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
    shortDescription:
      "Product and marketing interfaces designed for activation, conversion, and clarity — not decoration.",
    tagline: "Design that drives decisions.",
    overview: [
      "We design for startups, SaaS teams, and growing businesses that need users to understand value fast and take the next step — signup, book a call, buy, or activate.",
      "You get flows, components, and specs engineers can build from — not a pile of pretty screens with no system behind them.",
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
    shortDescription:
      "Premium brand systems and marketing assets that make startups and agencies look investment-ready.",
    tagline: "Identity that travels with you.",
    overview: [
      "Brand identity for modern businesses — logos, systems, and collateral that stay consistent from your landing page to your pitch deck to your product UI.",
      "We deliver source files and usage guidelines so your team can move fast without going off-brand.",
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
    shortDescription:
      "AI features, workflow automation, and CRM connections that remove manual work and speed growth.",
    tagline: "Systems that compound.",
    overview: [
      "Built for SaaS companies, AI startups, agencies, and operators who need more than a brochure site — chat agents, automations, CRM sync, and AI-assisted workflows wired into the product or marketing stack.",
      "We integrate what you already use and build what is missing, with engineering standards you can maintain.",
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
    shortDescription:
      "Technical SEO, content writing, and blog systems aimed at visibility that drives qualified demand.",
    tagline: "Visibility with a commercial point.",
    overview: [
      "We fix what blocks indexing and speed first — then we write and structure content around the keywords that attract SaaS buyers, startup founders, agencies, and local service clients.",
      "You get a prioritized technical backlog plus content that supports lead generation, not vanity traffic.",
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
    shortDescription:
      "QA testing, hosting & deployment support, updates, monitoring, and a long-term growth retainer.",
    tagline: "Launch is day one. Partnership is the product.",
    overview: [
      "We stay after launch — QA before release, hosting and deployment support when needed, then ongoing updates, backups, monitoring, and performance checks.",
      "Built for founders and operators who want one accountable partner instead of rotating freelancers every time something breaks.",
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
