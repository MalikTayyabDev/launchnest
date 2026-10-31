import { siteConfig } from "./site";

export const INTRO_OFFER_PRICE = "$20";
export const INTRO_OFFER_PATH = "/intro-offer";

export const introOfferScope = [
  "1 landing page (single scroll page)",
  "Up to 3 sections (e.g. hero, offer, contact/CTA)",
  "Template-based design — pick from our starter layouts",
  "Mobile responsive",
  "1 revision round (copy/image swaps, not a full redesign)",
  "Delivered in 3 business days",
];

export const introOfferNotIncluded = [
  "Custom design from scratch",
  "E-commerce or checkout flows",
  "CMS / blog / multiple pages",
  "Unlimited revisions",
  "Copywriting or brand strategy (you supply text & images)",
];

/** Soft expiry — remove or close in Admin once this threshold is hit. */
export const INTRO_OFFER_EXPIRY =
  "Ends after 5 Google reviews or 3 published case studies with before/after metrics — whichever comes first.";

export const introOfferFaqs = [
  {
    q: "Why is it only $20?",
    a: "It is a temporary proof-builder while LaunchNest collects early reviews and case studies. Fixed scope, template-based — not our identity or standard pricing. It has an expiry: after 5 Google reviews or 3 metric case studies, the offer ends.",
  },
  {
    q: "Is this what LaunchNest is known for?",
    a: "No. Our headline offers are growth audits, speed + technical SEO fixes, custom SaaS/AI builds, automation, and retainers. This landing page rate is a short bridge to first proof only.",
  },
  {
    q: "What do you need from me?",
    a: "Your business name, what the page is for, any logo/images you have, and the text for each section (or bullet points we can shape). Payment is upfront before work starts.",
  },
  {
    q: "What happens after delivery?",
    a: "We ask for an honest Google review and permission to show the site. Many intro clients later move to a Speed + SEO Fix, custom build, or care retainer.",
  },
];

/** WhatsApp deep link with intro-offer pre-fill (client-safe). */
export function introOfferWhatsappLink(): string {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    "Hi LaunchNest — I'm interested in the $20 intro landing page offer.",
  )}`;
}
