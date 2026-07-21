"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/lib/site";
import { getClientFormError } from "@/lib/form-validation";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-md border border-navy/15 bg-white px-4 py-3 text-sm text-navy placeholder:text-slate/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";
const labelClass = "mb-2 block font-heading text-sm font-semibold text-navy";

/** Book a free 30-minute discovery call — contact page + chat agent backend. */
export function BookCallForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const clientError = getClientFormError(form);
    if (clientError) {
      setStatus("error");
      setError(clientError);
      return;
    }

    setStatus("submitting");
    setError("");

    const raw = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "submit",
          lead: {
            requestType: "call-30min",
            channel: "contact",
            name: String(raw.name || "").trim(),
            email: String(raw.email || "").trim(),
            phone: String(raw.phone || "").trim(),
            message: String(raw.message || "").trim(),
            company: raw.company ? String(raw.company).trim() : undefined,
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Request failed");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : `Something went wrong. Email ${siteConfig.email}.`,
      );
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
        <h3 className="font-heading text-xl font-semibold text-navy">Call request received.</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate">
          We&apos;ll email you within one business day with available times for your free
          30-minute discovery call. No sales script — just a focused conversation about
          your project.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="call-name" className={labelClass}>
            Name <span className="text-gold">*</span>
          </label>
          <input
            id="call-name"
            name="name"
            type="text"
            required
            minLength={2}
            autoComplete="name"
            className={fieldClass}
            placeholder="Jordan Avery"
          />
        </div>
        <div>
          <label htmlFor="call-email" className={labelClass}>
            Email <span className="text-gold">*</span>
          </label>
          <input
            id="call-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
            placeholder="jordan@acme.co"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="call-phone" className={labelClass}>
            Phone / WhatsApp <span className="text-gold">*</span>
          </label>
          <input
            id="call-phone"
            name="phone"
            type="tel"
            required
            minLength={7}
            autoComplete="tel"
            className={fieldClass}
            placeholder="+1 555 000 0000"
          />
        </div>
        <div>
          <label htmlFor="call-company" className={labelClass}>
            Company <span className="font-normal text-slate/60">(optional)</span>
          </label>
          <input
            id="call-company"
            name="company"
            type="text"
            autoComplete="organization"
            className={fieldClass}
            placeholder="Acme Co."
          />
        </div>
      </div>
      <div>
        <label htmlFor="call-message" className={labelClass}>
          What would you like to discuss? <span className="text-gold">*</span>
        </label>
        <textarea
          id="call-message"
          name="message"
          required
          minLength={10}
          rows={3}
          className={fieldClass}
          placeholder="e.g. New Shopify store, slow WordPress site, or timeline for a rebuild."
        />
      </div>

      {status === "error" && (
        <p className="text-sm font-medium text-navy" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-md bg-gold px-6 py-3.5 font-heading text-sm font-semibold text-navy transition-colors hover:bg-[#B89421] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Booking…" : "Book my free 30-minute call"}
      </button>
      <p className="text-center font-mono text-xs text-slate">
        Free · No obligation · We reply within one business day
      </p>
    </form>
  );
}
