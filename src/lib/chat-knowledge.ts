import { packages, maintenancePlans } from "./pricing";
import { services } from "./services";
import { siteConfig } from "./site";
import {
  INTRO_OFFER_PATH,
  INTRO_OFFER_PRICE,
  introOfferScope,
} from "./intro-offer-public";

/** Structured site knowledge for the chat agent (no CMS round-trip). */
export function buildChatKnowledge(): string {
  const serviceBlock = services
    .map(
      (s) =>
        `- ${s.label} (${s.slug}): ${s.shortDescription} Pricing: ${s.pricing.anchor}. ${s.pricing.note}`,
    )
    .join("\n");

  const packageBlock = packages
    .map((p) => `- ${p.name}: ${p.range} — ${p.summary}. Includes: ${p.features.join("; ")}`)
    .join("\n");

  const maintenanceBlock = maintenancePlans
    .map((p) => `- ${p.name}: ${p.price} — ${p.summary}`)
    .join("\n");

  return `
LaunchNest is an engineering-first digital solutions agency — a launch and growth partner for startups, SaaS companies, agencies, and growing businesses.
Tagline: ${siteConfig.tagline}. Positioning: ${siteConfig.positioning.label}.
We do NOT position as a WordPress agency, Shopify agency, or generic web design agency. Platforms are capabilities.
Email: ${siteConfig.email}. WhatsApp available on site. Markets: UK, US, Australia. 100+ projects delivered.

We sell: growth, lead generation, better UX, faster sites, higher conversion, premium branding, SEO visibility, long-term partnerships.

Primary clients: ${siteConfig.positioning.primaryClients.join(", ")}.
Secondary clients: ${siteConfig.positioning.secondaryClients.join(", ")}.

Capabilities / stacks: Next.js, WordPress, Shopify, Webflow, Wix, GoHighLevel, AI integrations, automation, CRM.

SERVICES:
${serviceBlock}

BUILD PACKAGES (one-time):
${packageBlock}

MAINTENANCE (monthly, recurring):
${maintenanceBlock}

INTRO OFFER: ${INTRO_OFFER_PRICE} landing page at ${INTRO_OFFER_PATH}. Limited first-client rate. Scope: ${introOfferScope.join("; ")}. Delivered in 3 business days.

FREE OFFERS:
- Free growth / technical audit (contact form or home hero form)
- Free 30-minute discovery call (book via chat or contact page)

PORTFOLIO: live sites at /portfolio
CONTACT: /contact | /pricing | /intro-offer | Google review: ${siteConfig.googleReview}
`.trim();
}

export const CHAT_QUICK_TOPICS = [
  { id: "services", label: "What services do you offer?", chipLabel: "Services" },
  { id: "pricing", label: "Show me pricing", chipLabel: "Pricing" },
  { id: "intro", label: "$20 intro landing page", chipLabel: "$20 intro" },
  { id: "call", label: "Book a 30-min call", chipLabel: "Book call" },
  { id: "ticket", label: "Raise a support ticket", chipLabel: "Support ticket" },
  { id: "audit", label: "Free technical audit", chipLabel: "Free audit" },
] as const;

export type ChatTopicId = (typeof CHAT_QUICK_TOPICS)[number]["id"];
