export type PricingPackage = {
  name: string;
  range: string;
  summary: string;
  features: string[];
  featured?: boolean;
};

export const packages: PricingPackage[] = [
  {
    name: "Starter Site",
    range: "$150 – $300",
    summary: "For getting a credible, fast presence live quickly.",
    features: [
      "Up to 5 pages",
      "Template-based design",
      "On-page SEO basics",
      "Mobile-first and responsive",
      "Contact form setup",
    ],
  },
  {
    name: "Growth Site",
    range: "$400 – $800",
    summary: "For businesses that need the site to convert and scale.",
    features: [
      "Up to 10 pages",
      "Custom design",
      "CMS-driven content",
      "Speed optimization (Core Web Vitals)",
      "Analytics and conversion tracking",
    ],
    featured: true,
  },
  {
    name: "Custom Platform",
    range: "$1,000 – $3,000",
    summary: "For bespoke web apps and advanced e-commerce.",
    features: [
      "Bespoke web app or advanced e-commerce",
      "API and third-party integrations",
      "Custom functionality and data models",
      "Performance and security hardening",
      "Documentation for your team",
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
    price: "from $15/mo",
    summary: "Keep the lights on and the platform patched.",
    features: [
      "Software and plugin updates",
      "Automated backups",
      "Uptime monitoring",
      "Security patching",
    ],
  },
  {
    name: "Growth",
    price: "from $35/mo",
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
    price: "from $79/mo",
    summary: "A true technical partner on retainer.",
    features: [
      "Everything in Growth",
      "Dedicated support response times",
      "Quarterly technical roadmap",
      "Included dev hours each month",
    ],
  },
];
