/** Platforms and stacks LaunchNest ships — capabilities, not the primary brand pitch. */
export const techStacks = [
  {
    name: "Next.js / React",
    use: "SaaS marketing sites, MVPs, dashboards, and custom web apps",
    href: "/services/website-design-dev",
  },
  {
    name: "WordPress",
    use: "Content sites, WooCommerce, and editor-friendly business builds",
    href: "/services/website-design-dev",
  },
  {
    name: "Shopify",
    use: "E-commerce brands, DTC storefronts, and store UX rebuilds",
    href: "/services/website-design-dev",
  },
  {
    name: "Webflow",
    use: "Design-led marketing sites with clean handoff",
    href: "/services/website-design-dev",
  },
  {
    name: "Wix",
    use: "Fast launches when speed and simplicity matter",
    href: "/services/website-design-dev",
  },
  {
    name: "GoHighLevel",
    use: "Funnels, CRM sites, and agency client delivery",
    href: "/services/website-design-dev",
  },
  {
    name: "AI & automation",
    use: "Integrations, workflows, assistants, and ops systems",
    href: "/services/ai-automation",
  },
  {
    name: "Custom engineering",
    use: "APIs, portals, integrations, and product features beyond a template",
    href: "/services/website-design-dev",
  },
] as const;

/** Problem → service entry points (SaaS-first, but covers common inbound paths). */
export const clientEntryPoints = [
  {
    prospect: "SaaS or AI startup",
    problem: "Site or product surface not converting",
    pitch: "Website & product engineering",
    href: "/services/website-design-dev",
  },
  {
    prospect: "E-commerce brand",
    problem: "Store UX or platform holding back sales",
    pitch: "Shopify / WooCommerce development",
    href: "/services/website-design-dev",
  },
  {
    prospect: "Growing company",
    problem: "Outdated site, slow performance, or weak SEO",
    pitch: "Redesign, speed & technical SEO",
    href: "/services/seo",
  },
  {
    prospect: "Startup launching",
    problem: "Needs credible MVP or launch presence",
    pitch: "MVP & custom software surfaces",
    href: "/services/website-design-dev",
  },
  {
    prospect: "Agency or consultant",
    problem: "No dev bench for client delivery",
    pitch: "White-label development partnership",
    href: "/contact",
  },
  {
    prospect: "Operator",
    problem: "Repetitive manual work",
    pitch: "AI, automation & integrations",
    href: "/services/ai-automation",
  },
] as const;
