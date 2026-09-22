import { siteConfig } from "./site";

export type Service = {
  slug: string;
  label: string;
  /** SEO-focused H1 / title keyword phrase */
  primaryKeyword: string;
  /** Optional override for <title> (before layout adds " — LaunchNest"). */
  metaTitle?: string;
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
    primaryKeyword: "Software development & product engineering for SaaS & startups",
    metaTitle: "Software Development & Product Engineering for SaaS",
    shortDescription:
      "Software development & product engineering for SaaS and startups — landing pages, MVP sites, and conversion redesigns engineered for trials, pipeline, and long-term ownership (LaunchNest · launch-nest.com).",
    tagline: "Built to launch. Engineered to scale.",
    overview: [
      "LaunchNest at launch-nest.com is an engineering-first digital solutions partner for SaaS companies, AI startups, agencies, and growth-stage businesses. We do not sell templates — we ship digital products that generate leads, convert trials, and support revenue.",
      "Whether you need a high-converting landing page, a SaaS marketing site, a startup MVP, an ecommerce storefront, or a full conversion redesign, we choose the stack that fits your roadmap: Next.js, WordPress, Shopify, Webflow, Wix, or GoHighLevel — then we build it properly and hand it over clean.",
      "Buyers searching for a website developer or SaaS website agency usually need three things at once: clear messaging, measurable conversion paths, and a stack their team can own after launch. That is the brief we run every engagement against — from first discovery call through handoff and optional maintenance.",
    ],
    seoSections: [
      {
        heading: "Software & product engineering that converts",
        body: "Your software presence has one job: turn visitors into trials, demos, or sales conversations. We structure messaging, page speed, and conversion paths around that outcome — not decoration. Typical scopes include homepage, product pages, pricing, docs entry points, and instrumentation so you can see where pipeline drops. If you are comparing software engineering partners, ask who owns Core Web Vitals and tracking after go-live — we do.",
      },
      {
        heading: "Startup MVP software development",
        body: "Early-stage teams need a credible product surface fast without locking into the wrong stack. As an MVP software development partner, we build MVP shells and launch sites that look investment-ready, load under our Core Web Vitals standard, and stay editable as your product story changes. Scopes stay tight: enough surface for waitlist, demo, or early access — without a six-month agency theater cycle.",
      },
      {
        heading: "Conversion redesign for SaaS & software",
        body: "If your current site looks fine but does not generate qualified demand, we audit friction, rebuild the critical journeys, and ship a conversion redesign focused on lead generation and activation — with technical SEO and performance baked in before go-live. Redesign work starts from your live analytics and sales feedback, not a blank mood board.",
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
      note: "Most SaaS and growth builds start at Growth Engine ($199+; most land near $350). Custom SaaS / MVP / ecommerce from $599.",
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
    primaryKeyword: "Software UI/UX design for SaaS & product teams",
    metaTitle: "Software UI/UX Design for SaaS & Product Teams",
    shortDescription:
      "Software UI/UX design for SaaS and product teams — marketing sites, onboarding, and product flows built for activation, conversion, and developer-ready handoff (LaunchNest · launch-nest.com).",
    tagline: "Design that drives decisions.",
    overview: [
      "We design for startups, SaaS teams, and growing businesses that need users to understand value fast and take the next step — signup, book a call, buy, or activate.",
      "You get flows, components, and specs engineers can build from — not a pile of pretty screens with no system behind them.",
    ],
    seoSections: [
      {
        heading: "Conversion-focused software UX",
        body: "Software UI/UX design should reduce time-to-value. We map the activation moment, simplify first-run flows, and align marketing promises with what users actually experience in product — so trial-to-paid does not leak at onboarding.",
      },
      {
        heading: "Product and marketing design systems",
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
    primaryKeyword: "Software branding agency for startups & SaaS",
    metaTitle: "Software Branding Agency for Startups & SaaS",
    shortDescription:
      "Software branding agency for startups and SaaS — brand identity, logos, and visual systems that look investment-ready and stay consistent across product and sales (LaunchNest · launch-nest.com).",
    tagline: "Identity that travels with you.",
    overview: [
      "Software company branding is how buyers decide you are credible in seconds — before they read a feature list. LaunchNest builds brand identity and graphic design systems for SaaS, AI startups, and software teams that need logos, visual language, and marketing assets that hold up from pitch deck to product UI.",
      "If you are comparing a software branding agency versus a one-off logo freelancer, the difference is systems: guidelines, source files, and assets your marketing and engineering teams can reuse without going off-brand.",
      "We deliver editable files and clear usage rules so brand work compounds into website, ads, and sales materials — not a folder of one-off JPEGs.",
    ],
    seoSections: [
      {
        heading: "Software company branding that supports pipeline",
        body: "Investors and customers judge credibility fast. Our software company branding work covers logo, color, type, and marketing kits that stay consistent across landing pages, decks, and product chrome. Looking for branding services for software teams that ship systems — not mood boards — that is the brief.",
      },
      {
        heading: "Brand identity for startups (fundraising-ready)",
        body: "Early-stage teams need a brand identity for startups that looks investment-ready without a six-month agency cycle. We scope logo + core system first, then extend into website and UI/UX when you are ready — one partner so the story stays coherent.",
      },
      {
        heading: "From brand system to live site",
        body: "Most clients roll brand identity into a SaaS marketing site or conversion redesign. That path is usually cheaper and cleaner than hiring separate branding and web vendors. See website & product engineering if you want both under one roof.",
      },
    ],
    whoFor: [
      "SaaS and software companies refreshing brand before a launch",
      "Startups preparing to fundraise or go to market",
      "Teams that need brand + website from one partner",
    ],
    deliverables: [
      "Logo and brand identity systems for software companies",
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
      "A coherent software brand presence that supports premium positioning and trust with buyers.",
    faqs: [
      {
        q: "Are you a software branding agency or a web agency?",
        a: "Both — brand identity, UI/UX, and engineering under one partner at launch-nest.com. Most branding clients also need a site that converts; we scope that together when it helps.",
      },
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
    primaryKeyword: "AI & automation integrations for software products",
    metaTitle: "AI Automation & Integrations for Software Products",
    shortDescription:
      "AI automation and CRM/integration engineering for software products — assistants, workflows, and ops systems that remove manual work (LaunchNest · launch-nest.com).",
    tagline: "Systems that compound.",
    overview: [
      "Built for software companies, AI teams, agencies, and operators who need more than a brochure site — chat agents, automations, CRM sync, and AI-assisted workflows wired into the product or ops stack.",
      "We integrate what you already use and build what is missing, with engineering standards you can maintain.",
    ],
    seoSections: [
      {
        heading: "AI integrations that support real workflows",
        body: "AI integrations should reduce support load, qualify leads, or speed product features — not add a gimmick widget. We scope assistants, content helpers, and AI features against a clear business outcome and wire them into your existing stack.",
      },
      {
        heading: "CRM automation and software ops",
        body: "Lead routing, booking flows, notifications, and CRM sync stop pipeline from dying in inboxes. We design automation your team can operate after handoff — with logging and failure paths, not fragile zap-only glue.",
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
    primaryKeyword: "Technical SEO & content for software companies",
    metaTitle: "Technical SEO & Content for Software Companies",
    shortDescription:
      "Technical SEO & content for software companies — Core Web Vitals, indexing fixes, and commercial content that drives qualified demand (LaunchNest · launch-nest.com).",
    tagline: "Visibility with a commercial point.",
    overview: [
      "We fix what blocks indexing and speed first — then we write and structure content around the keywords that attract software buyers, founders, agencies, and growth-stage teams.",
      "You get a prioritized technical backlog plus content that supports lead generation, not vanity traffic.",
      "Technical SEO for software is different from generic local SEO: money pages (pricing, product, integrations) need crawlable structure, fast LCP, and supporting articles that answer buyer questions before a sales call.",
    ],
    seoSections: [
      {
        heading: "Technical SEO and Core Web Vitals",
        body: "As a technical SEO partner, we prioritize crawlability, canonicals, sitemap hygiene, schema, and Core Web Vitals — especially LCP on acquisition pages. Speed and structure are prerequisites before content scale. We also align robots, redirects, and indexation so Google sees the same site your buyers do.",
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
    primaryKeyword: "Software maintenance, QA & growth care",
    metaTitle: "Software Maintenance, QA & Growth Care",
    shortDescription:
      "Software maintenance, QA, and growth care — hosting support, updates, monitoring, and ongoing engineering standards after launch (LaunchNest · launch-nest.com).",
    tagline: "Launch is day one. Partnership is the product.",
    overview: [
      "We stay after launch — QA before release, hosting and deployment support when needed, then ongoing updates, backups, monitoring, and performance checks.",
      "Built for founders and operators who want one accountable partner instead of rotating freelancers every time something breaks.",
    ],
    seoSections: [
      {
        heading: "Software maintenance that prevents emergencies",
        body: "A real maintenance retainer covers dependency updates, backups you can restore, uptime monitoring, and security patching — plus someone who already knows your stack when something breaks at 2am.",
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
      anchor: "from $49/mo",
      note: "Care, Growth, and Partner retainers — designed for recurring partnership, not one-off firefighting. Care starts at $49/mo.",
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

const TITLE_BRAND_SUFFIX = ` — ${siteConfig.name}`;

/**
 * Service page <title> segment (layout adds " — LaunchNest").
 * Keeps total length ≤ 70 chars for SEO tools and SERP display.
 */
export function serviceMetaTitle(service: Service): string {
  if (service.metaTitle) return service.metaTitle;
  const withLabel = `${service.primaryKeyword} | ${service.label}`;
  if (withLabel.length + TITLE_BRAND_SUFFIX.length <= 70) return withLabel;
  if (service.primaryKeyword.length + TITLE_BRAND_SUFFIX.length <= 70) {
    return service.primaryKeyword;
  }
  return service.label;
}
