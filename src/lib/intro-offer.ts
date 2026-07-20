import { getPayload, type Payload } from "payload";
import configPromise from "@payload-config";

export type IntroOfferSettings = {
  open: boolean;
  maxSlots: number;
  slotsUsed: number;
  slotsRemaining: number;
  /** True when the offer should be shown and bookable on the site. */
  accepting: boolean;
};

/** Static defaults when CMS is unavailable (dev/build). */
export const INTRO_OFFER_DEFAULTS: IntroOfferSettings = {
  open: true,
  maxSlots: 10,
  slotsUsed: 0,
  slotsRemaining: 10,
  accepting: true,
};

let cached: Payload | null = null;
let unavailable = false;

async function tryPayload(): Promise<Payload | null> {
  if (unavailable) return null;
  if (cached) return cached;
  try {
    cached = await getPayload({ config: configPromise });
    return cached;
  } catch {
    unavailable = true;
    return null;
  }
}

function normalize(
  open: boolean,
  maxSlots: number,
  slotsUsed: number,
): IntroOfferSettings {
  const cap = Math.max(1, Math.min(15, maxSlots));
  const used = Math.max(0, Math.min(cap, slotsUsed));
  const remaining = Math.max(0, cap - used);
  const accepting = open && remaining > 0;
  return {
    open,
    maxSlots: cap,
    slotsUsed: used,
    slotsRemaining: remaining,
    accepting,
  };
}

/** Load intro-offer settings from Payload (fallback to defaults). */
export async function getIntroOfferSettings(): Promise<IntroOfferSettings> {
  const payload = await tryPayload();
  if (!payload) return INTRO_OFFER_DEFAULTS;

  try {
    const doc = await payload.findGlobal({ slug: "intro-offer" });
    return normalize(
      Boolean(doc.open),
      Number(doc.maxSlots ?? INTRO_OFFER_DEFAULTS.maxSlots),
      Number(doc.slotsUsed ?? 0),
    );
  } catch {
    return INTRO_OFFER_DEFAULTS;
  }
}

export {
  INTRO_OFFER_PATH,
  INTRO_OFFER_PRICE,
  introOfferFaqs,
  introOfferNotIncluded,
  introOfferScope,
  introOfferWhatsappLink,
} from "./intro-offer-public";
