"use client";

import { FormEvent, useState } from "react";

export function NewsletterSignup() {
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const email = new FormData(e.currentTarget).get("email");
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "speed-report" }),
      });
    } catch {
      /* best-effort; still confirm to the user */
    }
    setSubmitting(false);
    setDone(true);
  }

  if (done) {
    return (
      <p className="font-mono text-xs text-confirm">
        Thanks — we&apos;ll send your report link shortly.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        name="email"
        type="email"
        required
        placeholder="you@company.com"
        className="min-w-0 flex-1 rounded-md border border-offwhite/15 bg-navy px-3 py-2.5 text-sm text-offwhite placeholder:text-offwhite/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
      />
      <button
        type="submit"
        disabled={submitting}
        className="shrink-0 rounded-md bg-gold px-4 py-2.5 font-heading text-sm font-semibold text-navy transition-colors hover:bg-[#B89421] disabled:opacity-60"
      >
        {submitting ? "Sending…" : "Get report"}
      </button>
    </form>
  );
}
