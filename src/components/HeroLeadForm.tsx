"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-md border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-slate/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";
const labelClass = "mb-1.5 block font-heading text-xs font-semibold text-navy";

/** Compact lead-capture form shown in the home hero. */
export function HeroLeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const detail = String(raw.detail || "").trim();

    const body = {
      name: String(raw.name || "").trim(),
      email: String(raw.email || "").trim(),
      message: detail ? `Website / WhatsApp: ${detail}` : undefined,
      source: "home-hero",
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
      setError(`Something went wrong. Email us at ${siteConfig.email}.`);
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-navy/10 bg-white p-8 text-center shadow-xl">
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
          Request received.
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate">
          We&apos;ll review your site and reply within one business day with your free
          audit — no sales script.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-navy/10 bg-white p-6 shadow-xl sm:p-7">
      <h3 className="font-heading text-lg font-bold tracking-tight text-navy">
        Get a free technical audit
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-slate">
        Tell us where to reach you. We&apos;ll reply within one business day.
      </p>
      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4" noValidate>
        <div>
          <label htmlFor="hero-name" className={labelClass}>
            Name
          </label>
          <input
            id="hero-name"
            name="name"
            type="text"
            required
            className={fieldClass}
            placeholder="Jordan Avery"
          />
        </div>
        <div>
          <label htmlFor="hero-email" className={labelClass}>
            Email
          </label>
          <input
            id="hero-email"
            name="email"
            type="email"
            required
            className={fieldClass}
            placeholder="jordan@acme.co"
          />
        </div>
        <div>
          <label htmlFor="hero-detail" className={labelClass}>
            Website or WhatsApp{" "}
            <span className="font-normal text-slate/60">(optional)</span>
          </label>
          <input
            id="hero-detail"
            name="detail"
            type="text"
            className={fieldClass}
            placeholder="yoursite.com or +1 555 000 0000"
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
          className="inline-flex items-center justify-center rounded-md bg-gold px-6 py-3 font-heading text-sm font-semibold text-navy transition-colors hover:bg-[#B89421] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Book my free audit"}
        </button>
        <p className="text-center font-mono text-[11px] text-slate">
          No spam. No sales script. A real technical review.
        </p>
      </form>
    </div>
  );
}
