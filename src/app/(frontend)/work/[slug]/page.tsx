import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section, Eyebrow } from "@/components/Section";
import { StatCallout } from "@/components/StatCallout";
import { TestimonialQuote } from "@/components/TestimonialQuote";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { getCaseStudy, getCaseStudySlugs } from "@/lib/content";

export const revalidate = 60;

export async function generateStaticParams() {
  return (await getCaseStudySlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return { title: "Case study not found" };
  return {
    title: study.seo?.metaTitle || `${study.client} — ${study.headlineResult}`,
    description: study.seo?.metaDescription || study.summary,
    alternates: { canonical: `/work/${study.slug}` },
  };
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-navy/10 py-10">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-gold">{label}</p>
      <div className="mt-4 max-w-3xl">{children}</div>
    </div>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: study.client, path: `/work/${study.slug}` },
        ])}
      />
      <Section tone="offwhite">
        <div className="max-w-3xl">
          <Link
            href="/work"
            className="mb-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate transition-colors hover:text-navy"
          >
            <span aria-hidden="true">←</span> All work
          </Link>
          <Eyebrow>{study.industry}</Eyebrow>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            {study.client}
          </h1>
          <p className="mt-6 font-mono text-lg font-semibold text-navy">
            {study.headlineResult}
          </p>
          <p className="mt-3 text-lg leading-relaxed text-slate">{study.summary}</p>
        </div>
      </Section>

      <Section tone="white" className="!pt-0">
        {/* Result numbers up top for scannability */}
        <div className="grid grid-cols-1 gap-8 rounded-xl bg-navy p-8 sm:grid-cols-3 sm:p-10">
          {study.results.map((r) => (
            <StatCallout key={r.label} value={r.metric} label={r.label} onNavy />
          ))}
        </div>

        <Block label="Situation">
          <p className="text-lg leading-relaxed text-slate">{study.situation}</p>
        </Block>

        <Block label="Problem">
          <p className="text-lg leading-relaxed text-slate">{study.problem}</p>
        </Block>

        <Block label="What we did">
          <ul className="flex flex-col gap-4">
            {study.whatWeDid.map((step, i) => (
              <Reveal as="li" key={step} delay={i * 0.06} className="flex items-start gap-4">
                <span className="mt-0.5 font-mono text-sm font-bold text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg leading-relaxed text-slate">{step}</span>
              </Reveal>
            ))}
          </ul>
        </Block>

        <Block label="Result">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {study.results.map((r) => (
              <StatCallout key={r.label} value={r.metric} label={r.label} />
            ))}
          </div>
        </Block>

        <div className="border-t border-navy/10 pt-12">
          <TestimonialQuote
            text={study.quote.text}
            name={study.quote.name}
            role={study.quote.role}
          />
        </div>
      </Section>

      <CTASection
        heading="Have a problem that looks like this one?"
        body="We'll run a free technical audit and tell you what it would take to fix it — with numbers."
        cta={{ label: "Book a Free Technical Audit", href: "/contact" }}
        secondaryCta={{ label: "See more work", href: "/work" }}
      />
    </>
  );
}
