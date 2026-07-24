import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/Section";
import { siteConfig } from "@/lib/site";
import { selfCanonical } from "@/lib/seo";

const seo = selfCanonical("/terms");

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that apply to using the LaunchNest website.",
  alternates: { canonical: seo.canonical },
  openGraph: { ...seo.openGraph },
};

export default function TermsPage() {
  return (
    <Section tone="white">
      <article className="mx-auto max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-navy">
          Terms of Service
        </h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-wider text-slate">
          Last updated: {new Date().getFullYear()}
        </p>
        <div className="mt-8 flex flex-col gap-6 text-lg leading-relaxed text-slate">
          <p>
            This is a starter terms document. Replace it with your reviewed legal copy
            before going live.
          </p>
          <p>
            <strong className="text-navy">Use of this site.</strong> Content on this
            website is provided for information only. Pricing shown as ranges represents
            current starting points and is not a binding quote.
          </p>
          <p>
            <strong className="text-navy">Engagements.</strong> Any project work is
            governed by a separate written agreement signed by both parties.
          </p>
          <p>
            <strong className="text-navy">Contact.</strong> Questions about these terms?
            Email{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-heading font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </div>
      </article>
    </Section>
  );
}
