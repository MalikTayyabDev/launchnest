import { NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { siteConfig } from "@/lib/site";
import { getIntroOfferSettings } from "@/lib/intro-offer";
import { isNonEmpty, isValidEmail, validateRequired } from "@/lib/form-validation";

/**
 * Contact + newsletter + offer intake.
 * All sources reject empty required fields; email must be a valid format.
 */
export async function POST(request: Request) {
  let payload: Record<string, unknown>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // Normalize string fields (trim) so whitespace-only counts as empty.
  const data: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(payload)) {
    data[key] = typeof value === "string" ? value.trim() : value;
  }

  const source = typeof data.source === "string" ? data.source : "contact-form";
  const isNewsletter = source === "speed-report";
  const isCustomOffer = source === "custom-offer";
  const isIntroOffer = source === "intro-offer";
  const isHomeHero = source === "home-hero";

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
      ? ["name", "email", "company", "message"]
      : isCustomOffer
        ? ["name", "email", "message"]
        : isHomeHero
          ? ["name", "email"]
          : ["name", "company", "email", "budget", "timeline", "siteStatus"];

  const validationError = validateRequired(data, required);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 422 });
  }

  // Extra email check for newsletter (validateRequired covers others that include email).
  if (!isValidEmail(data.email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 422 },
    );
  }

  // Intro offer: WhatsApp/phone is required (sent as `phone`).
  if (isIntroOffer && !isNonEmpty(data.phone)) {
    return NextResponse.json(
      { error: "Please fill in: phone." },
      { status: 422 },
    );
  }

  const messageParts: string[] = [];
  if (isNonEmpty(data.message)) messageParts.push(String(data.message));
  if (isIntroOffer && isNonEmpty(data.phone)) {
    messageParts.push(`Phone/WhatsApp: ${String(data.phone)}`);
  }

  const lead = {
    name: String(data.name || (isNewsletter ? "Newsletter subscriber" : "")),
    company: String(
      data.company || (isNewsletter || isHomeHero || isCustomOffer ? "—" : ""),
    ),
    email: String(data.email),
    budget: isNonEmpty(data.budget) ? String(data.budget) : undefined,
    timeline: isNonEmpty(data.timeline) ? String(data.timeline) : undefined,
    siteStatus: isNonEmpty(data.siteStatus) ? String(data.siteStatus) : undefined,
    message: messageParts.length > 0 ? messageParts.join("\n\n") : undefined,
    source,
  };

  // Contact form requires company — reject empty dash placeholders.
  if (!isNewsletter && !isHomeHero && !isCustomOffer && lead.company === "—") {
    return NextResponse.json(
      { error: "Please fill in: company." },
      { status: 422 },
    );
  }

  let stored = false;

  try {
    const cms = await getPayload({ config: configPromise });
    await cms.create({ collection: "leads", data: lead });
    stored = true;
  } catch (err) {
    console.error("[contact] Failed to store lead in CMS:", err);
  }

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
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: `Could not record your request. Please email ${siteConfig.email}.` },
        { status: 502 },
      );
    }
    console.info("[contact] Lead not persisted (dev, no sink available):", lead);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
