"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const budgetRanges = [
  "Under $300",
  "$300 – $800",
  "$800 – $3,000",
  "$3,000+",
  "Not sure yet",
];

const timelines = [
  "ASAP / urgent",
  "Within 1 month",
  "1 – 3 months",
  "Just planning",
];

const siteStatuses = [
  "No site yet",
  "Have a site, needs a rebuild",
  "Have a site, needs fixes / speed",
  "Site is fine, need ongoing maintenance",
];

const fieldClass =
  "w-full rounded-md border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-slate/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";
const labelClass = "mb-2 block font-heading text-sm font-semibold text-navy";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Something went wrong. Email us directly at hello@launchnest.co.");
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
        <h3 className="font-heading text-xl font-semibold text-navy">Request received.</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate">
          We&apos;ll review your details and reply within one business day with next
          steps for your free technical audit. No sales script.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name
          </label>
          <input id="name" name="name" type="text" required className={fieldClass} placeholder="Jordan Avery" />
        </div>
        <div>
          <label htmlFor="company" className={labelClass}>
            Company
          </label>
          <input id="company" name="company" type="text" required className={fieldClass} placeholder="Acme Co." />
        </div>
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Work email
        </label>
        <input id="email" name="email" type="email" required className={fieldClass} placeholder="jordan@acme.co" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="budget" className={labelClass}>
            Budget range
          </label>
          <select id="budget" name="budget" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Select a range
            </option>
            {budgetRanges.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="timeline" className={labelClass}>
            Timeline
          </label>
          <select id="timeline" name="timeline" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Select a timeline
            </option>
            {timelines.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="siteStatus" className={labelClass}>
          Current site status
        </label>
        <select id="siteStatus" name="siteStatus" required defaultValue="" className={fieldClass}>
          <option value="" disabled>
            Where are you today?
          </option>
          {siteStatuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          What&apos;s breaking, or what do you need? <span className="font-normal text-slate">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={fieldClass}
          placeholder="e.g. Checkout is slow on mobile and we're losing sales."
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
        className="inline-flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-3.5 font-heading text-sm font-semibold tracking-tight text-navy transition-colors hover:bg-[#B89421] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Book a Free Technical Audit"}
      </button>
      <p className="text-center font-mono text-xs text-slate">
        No spam. No sales script. A real technical review.
      </p>
    </form>
  );
}
