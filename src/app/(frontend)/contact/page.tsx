import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { BookCallForm } from "@/components/BookCallForm";
import { StatCallout } from "@/components/StatCallout";
import { siteConfig } from "@/lib/site";
import { selfCanonical } from "@/lib/seo";

const seo = selfCanonical("/contact");

export const metadata: Metadata = {
  title: "Free Website Growth Audit — Contact LaunchNest",
  description:
    "Book a free website growth audit or 30-minute discovery call. We reply within one business day with specifics on leads, conversion, and speed — no sales script.",
  alternates: { canonical: seo.canonical },
  openGraph: { ...seo.openGraph },
};

const expect = [
  "A real review of your speed, security, and what's costing you conversions.",
  "Specific findings — the exact scripts, queries, or assets slowing you down.",
  "An honest read on whether you even need us. Sometimes you don't.",
];

const callExpect = [
  "30 minutes, video or phone — your choice.",
  "Walk through your project, existing site, or timeline.",
  "Leave with a clearer scope and next steps — no obligation.",
];

export default function ContactPage() {
  return (
    <>
      <Section tone="offwhite">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Let&apos;s talk about your project.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate">
            Book a free 30-minute call for a fast discovery conversation, or send a
            detailed audit request if you already have a live site to review.
          </p>
        </div>
      </Section>

      {/* 30-min call */}
      <Section tone="white" id="book-call">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <Eyebrow>Discovery call</Eyebrow>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-navy">
              Book a free 30-minute call
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">
              Best if you want to talk through a new build, get a rough scope, or ask
              questions before committing. We&apos;ll confirm a time by email — usually
              within one business day.
            </p>
            <ul className="mt-8 flex flex-col gap-4">
              {callExpect.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold"
                    aria-hidden="true"
                  />
                  <span className="text-base leading-relaxed text-slate">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex gap-10 border-t border-navy/10 pt-8">
              <StatCallout value="30 min" label="free discovery" />
              <StatCallout value="1 day" label="typical reply" />
            </div>
          </div>
          <div className="rounded-xl border border-navy/10 bg-offwhite p-7 shadow-[0_16px_50px_-24px_rgba(11,31,58,0.35)] sm:p-9">
            <BookCallForm />
          </div>
        </div>
      </Section>

      {/* Technical audit form */}
      <Section tone="offwhite" id="audit">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <Eyebrow>Free growth audit</Eyebrow>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-navy">
              Tell us what&apos;s breaking.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">
              A few questions so we can come prepared. The more specific you are, the
              more specific our answer will be.
            </p>
            <ul className="mt-8 flex flex-col gap-4">
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
            <div className="mt-10 flex gap-10 border-t border-navy/10 pt-8">
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
            <p className="mt-4 text-sm text-slate">
              Already worked with us?{" "}
              <a
                href={siteConfig.googleReview}
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4"
              >
                Leave a Google review
              </a>
            </p>
          </div>
          <div className="rounded-xl border border-navy/10 bg-white p-7 shadow-[0_16px_50px_-24px_rgba(11,31,58,0.35)] sm:p-9">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
