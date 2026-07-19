export type Service = {
  slug: string;
  label: string;
  shortDescription: string;
  tagline: string;
  overview: string[];
  deliverables: string[];
  pricing: {
    anchor: string; // e.g. "from $400"
    note: string;
  };
  outcome: string; // specific result-oriented line
  faqs?: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "website-design-dev",
    label: "Website Design & Development",
    shortDescription:
      "Premium web platforms on WordPress, Shopify, or Webflow — built to perform, not just to look good in a pitch deck.",
    tagline: "Built right the first time.",
    overview: [
      "We build the platform your business actually runs on. That means fast page loads, clean code you can hand to the next developer, and a CMS your team can update without calling us every week.",
      "Whether it is a Shopify storefront doing real revenue or a Webflow marketing site that has to convert, we architect for the next ten years — not the next demo.",
    ],
    deliverables: [
      "Custom design and front-end build (WordPress / Shopify / Webflow)",
      "Mobile-first, accessible, responsive layouts",
      "CMS setup your team can actually use",
      "Core Web Vitals tuned before launch (LCP under 2.5s)",
      "Analytics, tracking, and conversion events wired in",
    ],
    pricing: {
      anchor: "from $400",
      note: "Growth Site tier. Simple template builds start at $150; bespoke platforms scale to $3,000+.",
    },
    outcome:
      "A site that loads in under 2.5 seconds and is documented well enough that any engineer can pick it up.",
    faqs: [
      {
        q: "Which platform will you build on?",
        a: "Whichever fits your business, not ours. We build on WordPress, Shopify, and Webflow, and we'll recommend one based on who edits the site, your budget, and where you're headed — not a platform we're trying to upsell.",
      },
      {
        q: "Will I be locked in to you after launch?",
        a: "No. We hand over clean, documented code and a CMS your team can run. Maintenance is available if you want a partner, but you're never dependent on us for a simple content change.",
      },
      {
        q: "How long does a build take?",
        a: "A focused marketing site is typically 3-5 weeks; a bespoke platform or store is scoped individually. You'll get a timeline with milestones before we start.",
      },
    ],
  },
  {
    slug: "ui-ux-design",
    label: "UI/UX Design",
    shortDescription:
      "Interface design grounded in how people actually use your product — not decoration.",
    tagline: "Design that measures up.",
    overview: [
      "We design interfaces around the tasks your users are trying to complete. Every screen has a job, every button has a reason, and every flow is measured against a conversion or retention goal.",
      "You get design files that developers can build from directly — components, states, and specs, not just a pretty PNG.",
    ],
    deliverables: [
      "User flows and wireframes",
      "High-fidelity UI design with a reusable component system",
      "Interactive prototypes for testing before build",
      "Developer-ready specs and design tokens",
      "Accessibility review (contrast, focus states, keyboard nav)",
    ],
    pricing: {
      anchor: "from $400",
      note: "Scoped by number of screens and flows. Most projects land in the Growth range.",
    },
    outcome:
      "Fewer support tickets, higher task-completion rates, and a design system your team can extend.",
    faqs: [
      {
        q: "Do you hand off developer-ready files?",
        a: "Yes. You get components, states, and specs in Figma with design tokens — the kind of file a developer can build from directly, not a flat mockup.",
      },
      {
        q: "Can you work with our existing brand?",
        a: "Absolutely. We can design within your current brand system or tighten it up as we go, whichever you prefer.",
      },
    ],
  },
  {
    slug: "graphic-design",
    label: "Graphic Design",
    shortDescription:
      "Brand and marketing assets that stay consistent across every touchpoint.",
    tagline: "Consistent, on-brand, on-time.",
    overview: [
      "Logos, brand systems, ad creative, and marketing collateral built to a spec — so your brand looks the same whether it is on a landing page, an invoice, or an ad.",
      "We deliver source files and a usage guide, so you are never locked into us to make a simple change.",
    ],
    deliverables: [
      "Logo and brand identity systems",
      "Marketing and ad creative (static + templated)",
      "Pitch decks and one-pagers",
      "Social and display asset kits",
      "Editable source files + brand guidelines",
    ],
    pricing: {
      anchor: "from $150",
      note: "Per-asset or retainer. Full brand systems are scoped individually.",
    },
    outcome:
      "One consistent visual system your whole team can use without going off-brand.",
    faqs: [
      {
        q: "Do I get editable source files?",
        a: "Every time. You receive source files and a short usage guide so your team can make simple changes without coming back to us.",
      },
      {
        q: "Can you work per-asset or on retainer?",
        a: "Both. One-off pieces are priced per asset; ongoing creative runs on a monthly retainer scoped to your volume.",
      },
    ],
  },
  {
    slug: "social-media-management",
    label: "Social Media Management",
    shortDescription:
      "A content system with a calendar, reporting, and clear ownership — not random posting.",
    tagline: "Managed, measured, accountable.",
    overview: [
      "We run your social channels as a system: a content calendar, on-brand assets, scheduling, and monthly reporting tied to reach and engagement.",
      "You always know what is going out, when, and how it performed. No vanity metrics without context.",
    ],
    deliverables: [
      "Monthly content calendar and copy",
      "On-brand post and story assets",
      "Scheduling and community management",
      "Monthly performance report with next-step recommendations",
    ],
    pricing: {
      anchor: "from $35/mo",
      note: "Recurring engagement, scoped by channel count and posting cadence.",
    },
    outcome:
      "A predictable publishing rhythm and a monthly report you can actually act on.",
    faqs: [
      {
        q: "Do you create the content or just schedule it?",
        a: "We do both — calendar, copy, and on-brand assets, then scheduling and community management. You approve the plan; we run it.",
      },
      {
        q: "Which channels do you manage?",
        a: "The ones your audience actually uses. We scope by channel count and cadence rather than trying to be everywhere at once.",
      },
    ],
  },
  {
    slug: "seo",
    label: "SEO",
    shortDescription:
      "Technical and on-page SEO with a clear list of what is broken and why.",
    tagline: "Here's exactly what breaks and why.",
    overview: [
      "We start with a technical audit: crawlability, site speed, indexing, schema, and on-page structure. You get a prioritized list of exactly what to fix and the expected impact.",
      "Then we implement — Core Web Vitals, content structure, internal linking — and track rankings against the keywords that drive revenue.",
    ],
    deliverables: [
      "Technical SEO audit with prioritized fixes",
      "On-page optimization and schema markup",
      "Core Web Vitals and page-speed work",
      "Keyword and content strategy",
      "Monthly ranking and traffic reporting",
    ],
    pricing: {
      anchor: "from $35/mo",
      note: "One-time audits available; ongoing SEO runs as a monthly engagement.",
    },
    outcome:
      "A faster, better-indexed site and a documented reason behind every ranking change.",
    faqs: [
      {
        q: "How quickly will I see results?",
        a: "Technical fixes (speed, indexing, schema) can show up in weeks; competitive rankings take months. We report on both so you can see progress before the rankings move.",
      },
      {
        q: "Do you do technical SEO or content?",
        a: "We lead with technical and on-page SEO — crawlability, Core Web Vitals, structure, and schema — and build a keyword and content strategy around the terms that actually drive revenue.",
      },
      {
        q: "Can you help us rank in the UK, US, and Australia?",
        a: "Yes. We structure the site and content for multiple English-speaking markets and track rankings per region so you know where you stand in each.",
      },
    ],
  },
  {
    slug: "maintenance-support",
    label: "Maintenance & Support",
    shortDescription:
      "Ongoing technical partnership — updates, backups, monitoring, and someone who picks up the phone.",
    tagline: "Kept right, not handed off.",
    overview: [
      "The build is the start, not the end. We keep your platform patched, backed up, monitored, and fast — so a plugin update never takes your checkout down at 2am.",
      "One partner who already knows your stack, instead of a new freelancer relearning it every time something breaks.",
    ],
    deliverables: [
      "Software, plugin, and dependency updates",
      "Automated backups and uptime monitoring",
      "Security hardening and patching",
      "Performance checks and fixes",
      "Priority support with real response times",
    ],
    pricing: {
      anchor: "from $15/mo",
      note: "Care, Growth, and Partner plans — scaled to how critical uptime is for you.",
    },
    outcome:
      "Zero disappearing acts. A maintained platform and a partner who answers.",
    faqs: [
      {
        q: "What's actually included in a maintenance plan?",
        a: "Updates, automated backups, uptime monitoring, security patching, and performance checks — plus priority support with real response times. The exact scope depends on your plan tier.",
      },
      {
        q: "What if my site goes down?",
        a: "Monitoring alerts us, and priority-support plans get a defined response time. Because we already know your stack, we fix it faster than a freelancer relearning it from scratch.",
      },
      {
        q: "Do you maintain sites you didn't build?",
        a: "Often, yes. We start with a short audit to understand the platform, then bring it up to a maintainable standard before taking over ongoing care.",
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
