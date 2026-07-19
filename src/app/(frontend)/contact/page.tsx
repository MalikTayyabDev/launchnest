import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { StatCallout } from "@/components/StatCallout";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Free Technical Audit",
  description:
    "Tell us what's breaking. A short qualification form and we'll reply within one business day with a real technical review — no sales script.",
  alternates: { canonical: "/contact" },
};

const expect = [
  "A real review of your speed, security, and what's costing you conversions.",
  "Specific findings — the exact scripts, queries, or assets slowing you down.",
  "An honest read on whether you even need us. Sometimes you don't.",
];

export default function ContactPage() {
  return (
    <Section tone="offwhite">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <Eyebrow>Book a free technical audit</Eyebrow>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Tell us what&apos;s breaking.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate">
            A few questions so we can come to the call prepared. The more specific you
            are, the more specific our answer will be.
          </p>

          <div className="mt-10">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-slate">
              What to expect
            </p>
            <ul className="mt-4 flex flex-col gap-4">
              {expect.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    aria-hidden="true"
                    className="mt-1 shrink-0"
                  >
                    <path
                      d="M3.5 9.5 7 13l7.5-8"
                      stroke="#1E8E5A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-base leading-relaxed text-slate">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex gap-10 border-t border-navy/10 pt-8">
            <StatCallout value="1 day" label="typical reply time" />
            <StatCallout value="100+" label="projects delivered" />
          </div>

          <p className="mt-8 text-sm text-slate">
            Prefer email?{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-heading font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4"
            >
              {siteConfig.email}
            </a>
          </p>
        </div>

        <div className="rounded-xl border border-navy/10 bg-white p-7 shadow-[0_16px_50px_-24px_rgba(11,31,58,0.35)] sm:p-9">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
}
