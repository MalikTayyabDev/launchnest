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

export const introOfferFaqs = [
  {
    q: "Why is it only $20?",
    a: "This is a limited first-clients rate while LaunchNest builds its public review portfolio. It's fixed scope and template-based — not our standard custom pricing. Standard landing pages start from $99 once intro slots are full.",
  },
  {
    q: "Who is this for?",
    a: "Small businesses, founders, and first-time clients who need a credible landing page live fast — especially if you're hiring on Upwork/Fiverr or want a low-risk first project before a bigger build.",
  },
  {
    q: "What do you need from me?",
    a: "Your business name, what the page is for, any logo/images you have, and the text for each section (or bullet points we can shape). Payment is upfront before work starts.",
  },
  {
    q: "What happens after delivery?",
    a: "We ask for an honest review (Upwork/Fiverr/Google — wherever you hired us) and permission to show the site in our portfolio. Many intro clients later move to a full site or a maintenance plan.",
  },
];

/** WhatsApp deep link with intro-offer pre-fill (client-safe). */
export function introOfferWhatsappLink(): string {
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    "Hi LaunchNest — I'm interested in the $20 intro landing page offer.",
  )}`;
}
