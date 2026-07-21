import { getPayload, type Payload } from "payload";
import configPromise from "@payload-config";
import { unstable_noStore as noStore } from "next/cache";

export type IntroOfferSettings = {
  open: boolean;
  maxSlots: number;
  slotsUsed: number;
  slotsRemaining: number;
  /** True when the offer should be shown and bookable on the site. */
  accepting: boolean;
};

/** Static defaults only when the CMS is completely unreachable. */
export const INTRO_OFFER_DEFAULTS: IntroOfferSettings = {
  open: true,
  maxSlots: 10,
  slotsUsed: 0,
  slotsRemaining: 10,
  accepting: true,
};

let cached: Payload | null = null;

async function tryPayload(): Promise<Payload | null> {
  if (cached) return cached;
  try {
    cached = await getPayload({ config: configPromise });
    return cached;
  } catch (err) {
    console.error("[intro-offer] Failed to init Payload:", err);
    return null;
  }
}

function normalize(
  open: boolean,
  maxSlots: number,
  slotsUsed: number,
): IntroOfferSettings {
  const cap = Math.max(1, Math.min(15, Number.isFinite(maxSlots) ? maxSlots : 10));
  const used = Math.max(0, Math.min(cap, Number.isFinite(slotsUsed) ? slotsUsed : 0));
  const remaining = Math.max(0, cap - used);
  return {
    open,
    maxSlots: cap,
    slotsUsed: used,
    slotsRemaining: remaining,
    accepting: open && remaining > 0,
  };
}

/**
 * Load intro-offer settings from Payload.
 * Always bypasses Next.js full-route cache so admin slot changes show up quickly.
 */
export async function getIntroOfferSettings(): Promise<IntroOfferSettings> {
  noStore();

  const payload = await tryPayload();
  if (!payload) return INTRO_OFFER_DEFAULTS;

  try {
    const doc = await payload.findGlobal({
      slug: "intro-offer",
      // Local API: always read regardless of request user.
      overrideAccess: true,
    });

    return normalize(
      doc.open !== false && doc.open !== null,
      Number(doc.maxSlots ?? INTRO_OFFER_DEFAULTS.maxSlots),
      Number(doc.slotsUsed ?? 0),
    );
  } catch (err) {
    console.error("[intro-offer] findGlobal failed:", err);
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
