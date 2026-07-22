export type PricingPackage = {
  name: string;
  range: string;
  summary: string;
  features: string[];
  featured?: boolean;
};

export const packages: PricingPackage[] = [
  {
    name: "Growth Engine",
    range: "$199 – $449",
    summary:
      "Where most SaaS, agencies, and growth-stage businesses start — a site built to generate leads and convert.",
    features: [
      "Up to 10 pages",
      "Custom design aligned to brand",
      "CMS-driven content",
      "Speed optimization (Core Web Vitals)",
      "Analytics and conversion tracking",
    ],
    featured: true,
  },
  {
    name: "Custom Product",
    range: "$599 – $1,499",
    summary: "For SaaS marketing sites, startup MVPs, advanced ecommerce, and integrations.",
    features: [
      "Bespoke web product or advanced ecommerce",
      "API, CRM, and third-party integrations",
      "Custom functionality and data models",
      "Performance and security hardening",
      "Documentation for your team",
    ],
  },
  {
    name: "Starter Launch",
    range: "$79 – $149",
    summary:
      "Focused landing / early presence builds. Most product teams scale into Growth Engine.",
    features: [
      "Up to 5 pages / focused landing build",
      "Template-based design, conversion-minded",
      "On-page SEO basics",
      "Mobile-first and responsive",
      "Contact / lead form setup",
    ],
  },
];

export type MaintenancePlan = {
  name: string;
  price: string;
  summary: string;
  features: string[];
};

export const maintenancePlans: MaintenancePlan[] = [
  {
    name: "Care",
    price: "from $9/mo",
    summary: "Keep the lights on — updates, backups, monitoring.",
    features: [
      "Software and plugin updates",
      "Automated backups",
      "Uptime monitoring",
      "Security patching",
    ],
  },
  {
    name: "Growth",
    price: "from $25/mo",
    summary: "Maintenance plus ongoing improvements.",
    features: [
      "Everything in Care",
      "Monthly performance checks",
      "Small content and design edits",
      "Priority support",
    ],
  },
  {
    name: "Partner",
    price: "from $59/mo",
    summary: "A growth retainer — roadmap, support, and included engineering time.",
    features: [
      "Everything in Growth",
      "Dedicated support response times",
      "Quarterly technical roadmap",
      "Included dev hours each month",
    ],
  },
];
