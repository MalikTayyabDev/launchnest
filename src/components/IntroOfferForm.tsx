"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/lib/site";
import { introOfferWhatsappLink } from "@/lib/intro-offer-public";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-md border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-slate/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";
const labelClass = "mb-2 block font-heading text-sm font-semibold text-navy";

export function IntroOfferForm({ accepting }: { accepting: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  if (!accepting) {
    return (
      <div className="rounded-xl border border-navy/10 bg-offwhite p-8 text-center">
        <h3 className="font-heading text-xl font-semibold text-navy">
          Intro slots are full
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate">
          Standard landing pages start from $99. Request a custom quote or book a
          free audit instead.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href="/pricing"
            className="inline-flex items-center justify-center rounded-md bg-gold px-6 py-3 font-heading text-sm font-semibold text-navy"
          >
            See pricing
          </a>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-md border border-navy/20 px-6 py-3 font-heading text-sm font-semibold text-navy"
          >
            Contact us
          </a>
        </div>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const phone = String(raw.phone || "").trim();
    const business = String(raw.business || "").trim();
    const details = String(raw.message || "").trim();

    const parts = [
      business && `Business: ${business}`,
      details && `Page goal: ${details}`,
      phone && `Phone/WhatsApp: ${phone}`,
    ].filter(Boolean);

    const body = {
      name: String(raw.name || "").trim(),
      email: String(raw.email || "").trim(),
      budget: "$20 intro landing page",
      message: parts.join("\n") || "Intro landing page request",
      source: "intro-offer",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(typeof data.error === "string" ? data.error : "Request failed");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error && err.message !== "Request failed"
          ? err.message
          : `Something went wrong. Email us at ${siteConfig.email} or WhatsApp us.`,
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-confirm/30 bg-confirm/5 p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-confirm/10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="m5 13 4 4L19 7"
              stroke="#1E8E5A"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="font-heading text-xl font-semibold text-navy">You&apos;re in the queue.</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate">
          We&apos;ll reply within one business day to confirm your slot, scope, and
          payment details. Check WhatsApp if you left a number — we often respond
          faster there.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-navy/10 bg-white p-6 shadow-xl sm:p-8">
      <h3 className="font-heading text-xl font-bold tracking-tight text-navy">
        Claim an intro slot
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate">
        Fixed scope · $20 · 3 business days. We&apos;ll confirm availability before
        you pay.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="intro-name" className={labelClass}>
              Name
            </label>
            <input
              id="intro-name"
              name="name"
              type="text"
              required
              className={fieldClass}
              placeholder="Jordan Avery"
            />
          </div>
          <div>
            <label htmlFor="intro-email" className={labelClass}>
              Email
            </label>
            <input
              id="intro-email"
              name="email"
              type="email"
              required
              className={fieldClass}
              placeholder="jordan@acme.co"
            />
          </div>
        </div>
        <div>
          <label htmlFor="intro-business" className={labelClass}>
            Business name
          </label>
          <input
            id="intro-business"
            name="business"
            type="text"
            required
            className={fieldClass}
            placeholder="Acme Co."
          />
        </div>
        <div>
          <label htmlFor="intro-phone" className={labelClass}>
            WhatsApp / phone
          </label>
          <input
            id="intro-phone"
            name="phone"
            type="tel"
            required
            className={fieldClass}
            placeholder="+1 555 000 0000"
          />
        </div>
        <div>
          <label htmlFor="intro-message" className={labelClass}>
            What should the landing page do?
          </label>
          <textarea
            id="intro-message"
            name="message"
            required
            rows={3}
            className={fieldClass}
            placeholder="e.g. Collect leads for my cleaning business in Sydney — hero, services, contact form."
          />
        </div>

        {status === "error" && (
          <p className="text-sm text-navy" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-md bg-gold px-6 py-3.5 font-heading text-sm font-semibold text-navy transition-colors hover:bg-[#B89421] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Request my $20 intro slot"}
        </button>
      </form>
      <p className="mt-4 text-center text-xs text-slate">
        Prefer WhatsApp?{" "}
        <a
          href={introOfferWhatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-navy underline decoration-gold underline-offset-2"
        >
          Message us directly
        </a>
      </p>
    </div>
  );
}
