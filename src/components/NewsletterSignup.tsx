"use client";

import { FormEvent, useState } from "react";
import { getClientFormError } from "@/lib/form-validation";

export function NewsletterSignup() {
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const clientError = getClientFormError(form);
    if (clientError) {
      setError(clientError);
      return;
    }

    setSubmitting(true);
    setError("");
    const email = String(new FormData(form).get("email") || "").trim();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "speed-report" }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(typeof body.error === "string" ? body.error : "Failed");
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Please enter a valid email.");
    }
    setSubmitting(false);
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
      {error && (
        <p className="w-full text-xs text-gold" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
