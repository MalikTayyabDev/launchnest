import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/Section";
import { CTASection } from "@/components/CTASection";
import { WorkGrid } from "@/components/WorkGrid";
import { getAllCaseStudies } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies with real numbers: checkout rebuilds, performance fixes, and qualified-lead systems for e-commerce, professional services, and SaaS.",
  alternates: { canonical: "/work" },
};

export const revalidate = 60;

export default async function WorkPage() {
  const caseStudies = await getAllCaseStudies();
  return (
    <>
      <Section tone="offwhite">
        <div className="max-w-3xl">
          <Eyebrow>Selected work</Eyebrow>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            The problem, the fix, and the number that changed.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate">
            No mood boards or vague &ldquo;digital experiences.&rdquo; Every project here
            started with a specific problem and ended with a specific, measurable result.
          </p>
        </div>
      </Section>

      <Section tone="white">
        <WorkGrid caseStudies={caseStudies} />
      </Section>

      <CTASection
        heading="Your project could be the next number on this page."
        body="Tell us what's breaking. We'll show you exactly what it would take to fix it."
        cta={{ label: "Book a Free Technical Audit", href: "/contact" }}
      />
    </>
  );
}
