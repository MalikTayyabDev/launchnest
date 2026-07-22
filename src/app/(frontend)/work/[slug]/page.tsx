import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section, Eyebrow } from "@/components/Section";
import { CTASection } from "@/components/CTASection";
import { TestimonialQuote } from "@/components/TestimonialQuote";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/Button";
import { getCaseStudy, getCaseStudySlugs } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/seo";
import { primaryCta } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return { title: "Case study" };
  return {
    title: study.seo?.metaTitle || `${study.client} — ${study.headlineResult}`,
    description:
      study.seo?.metaDescription || study.summary,
    alternates: { canonical: `/work/${study.slug}` },
  };
}

export const revalidate = 60;

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
          { name: study.client, path: `/work/${study.slug}` },
        ])}
      />

      <Section tone="offwhite">
        <div className="max-w-3xl">
          <Eyebrow>{study.industry}</Eyebrow>
          <p className="font-mono text-sm font-semibold uppercase tracking-wider text-gold">
            {study.client}
          </p>
          <h1 className="mt-3 font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            {study.headlineResult}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate">{study.summary}</p>
        </div>

        <dl className="mt-12 grid max-w-3xl gap-6 sm:grid-cols-3">
          {study.results.map((r) => (
            <div key={r.label} className="rounded-lg border border-navy/10 bg-white p-5">
              <dt className="font-heading text-3xl font-bold text-navy">{r.metric}</dt>
              <dd className="mt-1 font-mono text-xs uppercase tracking-wider text-slate">
                {r.label}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Situation</Eyebrow>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-navy">
              Where they started
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate">{study.situation}</p>
          </div>
          <div>
            <Eyebrow>Problem</Eyebrow>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-navy">
              What was blocking growth
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate">{study.problem}</p>
          </div>
        </div>

        <div className="mt-16 max-w-3xl">
          <Eyebrow>What we did</Eyebrow>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-navy">
            The work that moved the numbers
          </h2>
          <ul className="mt-6 flex flex-col gap-3">
            {study.whatWeDid.map((step) => (
              <li key={step} className="flex items-start gap-3 text-base text-slate">
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold"
                  aria-hidden="true"
                />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {study.quote.text && (
          <div className="mt-16 max-w-2xl">
            <TestimonialQuote
              text={study.quote.text}
              name={study.quote.name}
              role={study.quote.role}
            />
          </div>
        )}

        <div className="mt-12">
          <Button href="/portfolio" variant="ghost">
            ← Back to portfolio
          </Button>
        </div>
      </Section>

      <CTASection
        heading="Want outcomes like these for your product?"
        body="Book a free growth audit — we'll map what's blocking leads, conversion, and speed."
        cta={primaryCta}
      />
    </>
  );
}
