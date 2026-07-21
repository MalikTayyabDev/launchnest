import { packages, maintenancePlans } from "./pricing";
import { services } from "./services";
import { siteConfig, whatsappLink } from "./site";
import {
  INTRO_OFFER_PATH,
  INTRO_OFFER_PRICE,
  introOfferScope,
} from "./intro-offer-public";
import type { ChatTopicId } from "./chat-knowledge";

export type ChatReply = {
  text: string;
  quickReplies?: { id: string; label: string }[];
  links?: { label: string; href: string }[];
};

function includesAny(text: string, words: string[]) {
  return words.some((w) => text.includes(w));
}

/** Answer free-text or topic shortcuts using site knowledge. */
export function generateChatReply(input: string, topic?: ChatTopicId): ChatReply {
  const q = input.trim().toLowerCase();
  const topicReply = topic ? replyForTopic(topic) : null;
  if (topicReply) return topicReply;

  if (includesAny(q, ["hello", "hi", "hey", "good morning", "good afternoon"])) {
    return {
      text: `Hi — I'm the LaunchNest assistant for our engineering-first digital solutions agency. I can explain services and pricing, the ${INTRO_OFFER_PRICE} intro landing page, book a free 30-minute call, or log a support ticket. What would you like to do?`,
      quickReplies: defaultQuickReplies(),
    };
  }

  if (includesAny(q, ["price", "pricing", "cost", "how much", "budget", "package"])) {
    return replyForTopic("pricing");
  }

  if (includesAny(q, ["service", "what do you do", "wordpress", "shopify", "webflow", "build"])) {
    return replyForTopic("services");
  }

  if (includesAny(q, ["intro", "$20", "20 dollar", "landing page", "cheap"])) {
    return replyForTopic("intro");
  }

  if (includesAny(q, ["call", "meeting", "schedule", "book", "30 min", "30-minute", "discovery"])) {
    return replyForTopic("call");
  }

  if (includesAny(q, ["ticket", "support", "issue", "problem", "bug", "help", "broken"])) {
    return replyForTopic("ticket");
  }

  if (includesAny(q, ["audit", "review", "speed", "slow", "security"])) {
    return replyForTopic("audit");
  }

  if (includesAny(q, ["portfolio", "work", "example", "sites", "projects"])) {
    return {
      text: "We've shipped 100+ sites across WordPress, Shopify, Webflow, and custom builds — ecommerce, corporate, landing pages, and more. Every card on our portfolio links to a live site.",
      links: [{ label: "View portfolio", href: "/portfolio" }],
      quickReplies: defaultQuickReplies(),
    };
  }

  if (includesAny(q, ["maintain", "maintenance", "monthly", "retainer", "updates"])) {
    const lines = maintenancePlans.map((p) => `• **${p.name}** — ${p.price}: ${p.summary}`).join("\n");
    return {
      text: `Our maintenance plans keep your site patched, backed up, and monitored:\n\n${lines}\n\nWant a call to see which tier fits?`,
      quickReplies: [
        { id: "call", label: "Book 30-min call" },
        { id: "pricing", label: "See all pricing" },
      ],
    };
  }

  if (includesAny(q, ["contact", "email", "whatsapp", "human", "talk to someone"])) {
    return {
      text: `You can reach us at **${siteConfig.email}**, use WhatsApp on the site, or book a free 30-minute call. We typically reply within one business day.`,
      links: [
        { label: "Contact page", href: "/contact" },
        { label: "WhatsApp", href: whatsappLink },
      ],
      quickReplies: defaultQuickReplies(),
    };
  }

  if (includesAny(q, ["google review", "leave a review", "rate us", "testimonial", "feedback"])) {
    return {
      text: "Thank you — Google reviews help us a lot while we build our portfolio. It only takes a minute.",
      links: [{ label: "Leave a Google review", href: siteConfig.googleReview }],
      quickReplies: defaultQuickReplies(),
    };
  }

  if (includesAny(q, ["thank", "thanks", "cheers"])) {
    return {
      text: "You're welcome. If anything else comes up — pricing, a call, or a ticket — just ask.",
      quickReplies: defaultQuickReplies(),
    };
  }

  return {
    text: `I'm here to help with LaunchNest services, pricing, the ${INTRO_OFFER_PRICE} intro offer, booking a **free 30-minute call**, or raising a **support ticket**. Pick an option below or ask something specific — e.g. "Shopify pricing" or "I need a landing page".`,
    quickReplies: defaultQuickReplies(),
  };
}

function defaultQuickReplies() {
  return [
    { id: "services", label: "Services" },
    { id: "pricing", label: "Pricing" },
    { id: "call", label: "Book 30-min call" },
    { id: "ticket", label: "Raise ticket" },
  ];
}

function replyForTopic(topic: ChatTopicId): ChatReply {
  switch (topic) {
    case "services": {
      const list = services
        .slice(0, 6)
        .map((s) => `• **${s.label}** — ${s.shortDescription.slice(0, 100)}…`)
        .join("\n");
      return {
        text: `We are an engineering-first digital solutions agency — launch and growth partner for startups, SaaS, agencies, and growing businesses:\n\n${list}\n\nPlatforms (Next.js, WordPress, Shopify, Webflow, Wix, GoHighLevel) are capabilities, not our identity.`,
        links: [{ label: "All services", href: "/services" }],
        quickReplies: [
          { id: "pricing", label: "See pricing" },
          { id: "call", label: "Book a call" },
        ],
      };
    }
    case "pricing": {
      const builds = packages
        .map((p) => `• **${p.name}** — ${p.range}\n  ${p.summary}`)
        .join("\n\n");
      return {
        text: `Here are our current **build packages** (starting ranges):\n\n${builds}\n\nMaintenance plans start from ${maintenancePlans[0].price}. Final quotes depend on scope — happy to pin that down on a free call.`,
        links: [{ label: "Full pricing page", href: "/pricing" }],
        quickReplies: [
          { id: "intro", label: "$20 intro page" },
          { id: "call", label: "Book 30-min call" },
        ],
      };
    }
    case "intro":
      return {
        text: `**${INTRO_OFFER_PRICE} intro landing page** — limited first-client rate.\n\n• ${introOfferScope.join("\n• ")}\n\nThis is template-based with fixed scope — not our standard custom pricing. Standard builds start from ${packages[0].range}.`,
        links: [{ label: "Claim intro offer", href: INTRO_OFFER_PATH }],
        quickReplies: [
          { id: "call", label: "Ask a question first" },
          { id: "pricing", label: "Standard pricing" },
        ],
      };
    case "call":
      return {
        text: "Great — a **free 30-minute discovery call** is the fastest way to talk through your project. I'll need your **phone or WhatsApp** to confirm a slot.",
        quickReplies: [{ id: "start_call_form", label: "Start booking →" }],
      };
    case "ticket":
      return {
        text: "I can log a **support ticket** for you — describe what's going wrong and we'll follow up by email. I'll need your **phone or WhatsApp** in case we need to reach you quickly.",
        quickReplies: [{ id: "start_ticket_form", label: "Raise ticket →" }],
      };
    case "audit":
      return {
        text: "Our **free growth audit** covers speed, security, conversion blockers, and growth opportunities — specific findings, no sales script. Use the contact form or the home page form.",
        links: [
          { label: "Book free audit", href: "/contact" },
          { label: "Home audit form", href: "/#audit-form" },
        ],
        quickReplies: [{ id: "call", label: "Book 30-min call instead" }],
      };
    default:
      return generateChatReply("");
  }
}

export type ChatLeadPayload = {
  requestType: "call-30min" | "ticket" | "chat-inquiry";
  channel?: "chat" | "contact";
  name: string;
  email: string;
  phone?: string;
  message: string;
  company?: string;
};

export function leadSourceForRequest(
  type: ChatLeadPayload["requestType"],
  channel?: ChatLeadPayload["channel"],
): string {
  switch (type) {
    case "call-30min":
      return channel === "contact" ? "call-booking" : "chat-call-booking";
    case "ticket":
      return "chat-ticket";
    default:
      return "chat-agent";
  }
}

export function confirmationForRequest(type: ChatLeadPayload["requestType"]): string {
  switch (type) {
    case "call-30min":
      return "Your **30-minute call request** is logged. We'll email you within one business day with available times. Check WhatsApp too if you left a number — we often reply faster there.";
    case "ticket":
      return "Your **support ticket** is logged. We'll review it and reply to your email within one business day (urgent issues are prioritised).";
    default:
      return "Thanks — we've got your details and will follow up shortly.";
  }
}
