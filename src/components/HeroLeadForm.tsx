"use client";

import { FormEvent, useState } from "react";
import { siteConfig } from "@/lib/site";
import { getClientFormError } from "@/lib/form-validation";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-sm border border-navy/12 bg-[var(--color-paper)] px-4 py-3 text-sm text-navy placeholder:text-slate/45 focus:border-gold focus:bg-white focus:outline-none focus:ring-1 focus:ring-gold";
const labelClass = "mb-1.5 block font-heading text-xs font-semibold text-navy";

/** Compact lead-capture form shown in the home hero. */
export function HeroLeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

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
          : `Something went wrong. Email us at ${siteConfig.email}.`,
      );
    }
  }

  if (status === "success") {
    return (
      <div className="surface-panel rounded-sm p-8 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-confirm">
          Received
        </p>
        <h3 className="mt-3 font-heading text-xl font-semibold text-navy">
          We&apos;ll review your URL next.
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate">
          Reply within one business day — speed, messaging, SEO, and next steps. No
          script.
        </p>
      </div>
    );
  }

  return (
    <div className="surface-panel rounded-sm p-6 sm:p-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate/70">
        Free growth audit
      </p>
      <h3 className="mt-2 font-heading text-xl font-semibold tracking-tight text-navy">
        Send your live URL.
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate">
        We reply within one business day with what is blocking demos, speed, and SEO.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <div>
          <label htmlFor="hero-name" className={labelClass}>
            Name <span className="text-gold">*</span>
          </label>
          <input
            id="hero-name"
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
          <label htmlFor="hero-email" className={labelClass}>
            Email <span className="text-gold">*</span>
          </label>
          <input
            id="hero-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
            placeholder="jordan@acme.co"
          />
        </div>
        <div>
          <label htmlFor="hero-detail" className={labelClass}>
            Website{" "}
            <span className="font-normal text-slate/55">(optional)</span>
          </label>
          <input
            id="hero-detail"
            name="detail"
            type="text"
            className={fieldClass}
            placeholder="yoursite.com"
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
          className="inline-flex items-center justify-center rounded-sm bg-gold px-6 py-3 font-heading text-sm font-semibold text-navy transition-colors hover:bg-[#B89421] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "Sending…" : "Book my free growth audit"}
        </button>
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.14em] text-slate/60">
          SaaS &amp; AI · UK · US · AU
        </p>
      </form>
    </div>
  );
}
