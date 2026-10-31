export type PricingPackage = {
  name: string;
  range: string;
  /** Typical / most-common price point shown under the range. */
  typical?: string;
  summary: string;
  features: string[];
  featured?: boolean;
};

/** Fixed-scope productized offers — lead with measurable outcomes, not brochure builds. */
export const packages: PricingPackage[] = [
  {
    name: "Speed + SEO Fix",
    range: "$299 – $699",
    typical: "Most audits-to-fix land near $449",
    summary:
      "Diagnose and ship Core Web Vitals, indexing, and conversion blockers on your live SaaS or AI site.",
    features: [
      "Live URL performance + technical SEO audit",
      "Prioritized fix list with before/after metrics",
      "Implementation on the pages that drive demos",
      "Indexability, titles, and money-page hygiene",
      "Written handoff your team can keep iterating",
    ],
    featured: true,
  },
  {
    name: "SaaS Marketing Build",
    range: "$599 – $1,499",
    typical: "Most custom builds land near $899",
    summary:
      "Custom marketing site or product surface with real integrations — not a theme tweak.",
    features: [
      "Bespoke SaaS / AI marketing site or MVP shell",
      "Payments, analytics, CRM, or onboarding hooks",
      "Performance budget before launch",
      "Editor-friendly handoff documentation",
      "Optional month-one care included",
    ],
  },
];

export type MaintenancePlan = {
  name: string;
  price: string;
  typical?: string;
  summary: string;
  features: string[];
};

export const maintenancePlans: MaintenancePlan[] = [
  {
    name: "Care",
    price: "from $79/mo",
    typical: "Most Care retainers land near $99/mo",
    summary: "Updates, backups, monitoring — accountability after launch.",
    features: [
      "Software and dependency updates",
      "Automated backups",
      "Uptime monitoring",
      "Security patching",
    ],
  },
  {
    name: "Growth",
    price: "from $149/mo",
    typical: "Most Growth retainers land near $179/mo",
    summary: "Care plus monthly performance, SEO, and conversion iteration.",
    features: [
      "Everything in Care",
      "Monthly Core Web Vitals check",
      "Technical SEO improvements",
      "Small copy and UX edits",
      "Priority support",
    ],
  },
  {
    name: "Partner",
    price: "from $299/mo",
    typical: "Most Partner retainers land near $349/mo",
    summary: "Roadmap, automation, and included engineering hours each month.",
    features: [
      "Everything in Growth",
      "Lead/CRM automation support",
      "Quarterly technical roadmap",
      "Included development hours",
      "Dedicated response times",
    ],
  },
];
