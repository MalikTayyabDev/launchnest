import { NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { siteConfig } from "@/lib/site";
import {
  confirmationForRequest,
  generateChatReply,
  leadSourceForRequest,
  type ChatLeadPayload,
} from "@/lib/chat-agent";
import type { ChatTopicId } from "@/lib/chat-knowledge";
import { isNonEmpty, isValidEmail } from "@/lib/form-validation";

type ChatBody = {
  action?: "message" | "submit";
  message?: string;
  topic?: ChatTopicId;
  lead?: ChatLeadPayload;
};

export async function POST(request: Request) {
  let body: ChatBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const action = body.action ?? "message";

  if (action === "message") {
    const text = String(body.message ?? "").trim();
    const topic = body.topic;
    if (!text && !topic) {
      return NextResponse.json({ error: "Message or topic required." }, { status: 422 });
    }
    const reply = generateChatReply(text || "hello", topic);
    return NextResponse.json({ reply });
  }

  if (action === "submit") {
    const lead = body.lead;
    if (!lead) {
      return NextResponse.json({ error: "Lead data required." }, { status: 422 });
    }

    const name = String(lead.name ?? "").trim();
    const email = String(lead.email ?? "").trim();
    const phone = lead.phone ? String(lead.phone).trim() : "";
    const message = String(lead.message ?? "").trim();
    const requestType = lead.requestType;

    if (!isNonEmpty(name) || !isValidEmail(email) || !isNonEmpty(message)) {
      return NextResponse.json(
        { error: "Please provide your name, a valid email, and a message." },
        { status: 422 },
      );
    }

    if (
      (requestType === "call-30min" || requestType === "ticket") &&
      !isNonEmpty(phone)
    ) {
      return NextResponse.json(
        { error: "Please provide a phone or WhatsApp number so we can reach you." },
        { status: 422 },
      );
    }

    const source = leadSourceForRequest(requestType, lead.channel);
    const fullMessage =
      requestType === "call-30min"
        ? `30-min call request\n\n${message}${phone ? `\n\nPhone/WhatsApp: ${phone}` : ""}`
        : requestType === "ticket"
          ? `Support ticket\n\n${message}${phone ? `\n\nPhone/WhatsApp: ${phone}` : ""}`
          : message;

    const record = {
      name,
      company: lead.company?.trim() || "—",
      email,
      message: fullMessage,
      source,
      budget:
        requestType === "call-30min"
          ? "30-min discovery call"
          : requestType === "ticket"
            ? "Support ticket"
            : undefined,
    };

    let stored = false;
    try {
      const cms = await getPayload({ config: configPromise });
      await cms.create({ collection: "leads", data: record });
      stored = true;
    } catch (err) {
      console.error("[chat] Failed to store lead:", err);
    }

    if (!stored && process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: `Could not save your request. Email us at ${siteConfig.email}.` },
        { status: 502 },
      );
    }

    return NextResponse.json({
      reply: {
        text: confirmationForRequest(requestType),
        quickReplies: [
          { id: "services", label: "Browse services" },
          { id: "pricing", label: "See pricing" },
        ],
      },
    });
  }

  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}
