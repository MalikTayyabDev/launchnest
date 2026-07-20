import { NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { siteConfig } from "@/lib/site";
import { getIntroOfferSettings } from "@/lib/intro-offer";

/**
 * Contact + newsletter intake.
 *
 * Stores qualified leads in the Payload `leads` collection (first-party, owned
 * data). Optionally also forwards to an external CRM via CRM_WEBHOOK_URL.
 * Newsletter/"speed report" signups arrive with source "speed-report" and only
 * require an email.
 */
export async function POST(request: Request) {
  let payload: Record<string, unknown>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const source = typeof payload.source === "string" ? payload.source : "contact-form";
  const isNewsletter = source === "speed-report";
  const isCustomOffer = source === "custom-offer";
  const isIntroOffer = source === "intro-offer";

  if (isIntroOffer) {
    const settings = await getIntroOfferSettings();
    if (!settings.accepting) {
      return NextResponse.json(
        {
          error:
            "Intro offer slots are full. See standard pricing or contact us for a custom quote.",
        },
        { status: 403 },
      );
    }
  }

  const required = isNewsletter
    ? ["email"]
    : isIntroOffer
      ? ["name", "email", "message"]
      : isCustomOffer
        ? ["name", "email", "message"]
        : source === "home-hero"
          ? ["name", "email"]
          : ["name", "company", "email", "budget", "timeline", "siteStatus"];
  const missing = required.filter(
    (k) => !payload[k] || String(payload[k]).trim() === ""
  );

  if (missing.length > 0) {
    return NextResponse.json(
      { error: `Missing required fields: ${missing.join(", ")}` },
      { status: 422 }
    );
  }

  const lead = {
    name: String(payload.name || (isNewsletter ? "Newsletter subscriber" : "")),
    company: String(payload.company || "—"),
    email: String(payload.email),
    budget: payload.budget ? String(payload.budget) : undefined,
    timeline: payload.timeline ? String(payload.timeline) : undefined,
    siteStatus: payload.siteStatus ? String(payload.siteStatus) : undefined,
    message: payload.message ? String(payload.message) : undefined,
    source,
  };

  let stored = false;

  // 1. Store in the CMS.
  try {
    const cms = await getPayload({ config: configPromise });
    await cms.create({ collection: "leads", data: lead });
    stored = true;
  } catch (err) {
    console.error("[contact] Failed to store lead in CMS:", err);
  }

  // 2. Optionally forward to an external CRM.
  const webhookUrl = process.env.CRM_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...lead,
          submittedAt: new Date().toISOString(),
          origin: "launchnest.co",
        }),
      });
      if (!res.ok) throw new Error(`CRM responded ${res.status}`);
      stored = true;
    } catch (err) {
      console.error("[contact] CRM webhook failed:", err);
    }
  }

  if (!stored) {
    // In production a failure means the lead was lost - surface an error.
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: `Could not record your request. Please email ${siteConfig.email}.` },
        { status: 502 }
      );
    }
    // In development (often no DB) let the form succeed so the UX is testable.
    console.info("[contact] Lead not persisted (dev, no sink available):", lead);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
