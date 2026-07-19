"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const budgetRanges = [
  "Under $200",
  "$200 – $600",
  "$600 – $2,000",
  "$2,000+",
  "Not sure yet",
];

const fieldClass =
  "w-full rounded-md border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-slate/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";
const labelClass = "mb-2 block font-heading text-sm font-semibold text-navy";

export function CustomOfferForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const phone = String(raw.phone || "").trim();
    const details = String(raw.message || "").trim();

    const body = {
      name: String(raw.name || "").trim(),
      email: String(raw.email || "").trim(),
      budget: raw.budget ? String(raw.budget) : undefined,
      message: phone ? `${details}\n\nPhone/WhatsApp: ${phone}` : details,
      source: "custom-offer",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError(`Something went wrong. Email us directly at ${siteConfig.email}.`);
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-confirm/30 bg-confirm/5 p-8 text-center">
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
        <h3 className="font-heading text-xl font-semibold text-navy">
          Got it — we&apos;re on it.
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate">
          We&apos;ll review what you need and send a custom offer within one business
          day. Want it faster? Message us on WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="offer-name" className={labelClass}>
            Name
          </label>
          <input
            id="offer-name"
            name="name"
            type="text"
            required
            className={fieldClass}
            placeholder="Jordan Avery"
          />
        </div>
        <div>
          <label htmlFor="offer-email" className={labelClass}>
            Email
          </label>
          <input
            id="offer-email"
            name="email"
            type="email"
            required
            className={fieldClass}
            placeholder="jordan@acme.co"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="offer-phone" className={labelClass}>
            WhatsApp / phone <span className="font-normal text-slate/60">(optional)</span>
          </label>
          <input
            id="offer-phone"
            name="phone"
            type="tel"
            className={fieldClass}
            placeholder="+1 555 000 0000"
          />
        </div>
        <div>
          <label htmlFor="offer-budget" className={labelClass}>
            Budget <span className="font-normal text-slate/60">(optional)</span>
          </label>
          <select id="offer-budget" name="budget" defaultValue="" className={fieldClass}>
            <option value="">Select a range</option>
            {budgetRanges.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="offer-message" className={labelClass}>
          What do you need?
        </label>
        <textarea
          id="offer-message"
          name="message"
          required
          rows={4}
          className={fieldClass}
          placeholder="Tell us about your project — what you're building, must-have features, and any deadlines."
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
        className="inline-flex items-center justify-center rounded-md bg-gold px-6 py-3 font-heading text-sm font-semibold text-navy transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Request my custom offer"}
      </button>
      <p className="text-xs text-slate/70">
        No obligation. We&apos;ll reply with a tailored scope and price — not a sales
        script.
      </p>
    </form>
  );
}
