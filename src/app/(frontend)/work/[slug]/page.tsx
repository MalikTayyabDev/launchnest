import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section, Eyebrow } from "@/components/Section";
import { CTASection } from "@/components/CTASection";
import { TestimonialQuote } from "@/components/TestimonialQuote";
import { JsonLd } from "@/components/JsonLd";
import { Button } from "@/components/Button";
import { PostCoverImage } from "@/components/PostBody";
import { getCaseStudy, getCaseStudySlugs } from "@/lib/content";
import {
  breadcrumbSchema,
  caseStudySchema,
  selfCanonical,
} from "@/lib/seo";
import { primaryCta } from "@/lib/site";
import { services } from "@/lib/services";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getCaseStudySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return { title: "Case study" };
  const path = `/work/${study.slug}`;
  const { canonical, openGraph } = selfCanonical(path);
  const title =
    study.seo?.metaTitle || `${study.client} — ${study.headlineResult}`;
  const description = study.seo?.metaDescription || study.summary;
  const ogImages = study.coverImage?.url
    ? [{ url: study.coverImage.url, alt: study.coverImage.alt || study.client }]
    : undefined;
  return {
    title,
    description,
    keywords: study.primaryKeyword
      ? [study.primaryKeyword, "US", "UK", "Australia", study.industry]
      : ["case study", "US", "UK", "Australia", study.industry],
    alternates: { canonical },
    openGraph: {
      ...openGraph,
      type: "article",
      title,
      description,
      images: ogImages,
      locale: "en_US",
      alternateLocale: ["en_GB", "en_AU"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages?.map((img) => img.url),
    },
  };
}

export const revalidate = 10;

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) notFound();

  const related = study.relatedService
    ? services.find((s) => s.slug === study.relatedService)
    : undefined;

  return (
    <>
      <JsonLd data={caseStudySchema(study)} />
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
          {study.coverImage?.url ? (
            <div className="mt-10 overflow-hidden rounded-lg">
              <PostCoverImage
                src={study.coverImage.url}
                alt={study.coverImage.alt || `${study.client} case study`}
                priority
              />
            </div>
          ) : null}
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

        {related ? (
          <p className="mt-12 max-w-3xl rounded-lg border border-navy/10 bg-offwhite p-5 text-base leading-relaxed text-slate">
            Related service:{" "}
            <Link
              href={`/services/${related.slug}`}
              className="font-heading font-semibold text-navy underline decoration-gold underline-offset-2"
            >
              {related.label}
            </Link>{" "}
            — for SaaS, startups, and growth teams in the US, UK, and Australia.
          </p>
        ) : null}

        <div className="mt-12">
          <Button href="/portfolio" variant="ghost">
            ← Back to portfolio
          </Button>
        </div>
      </Section>

      <CTASection
        heading="Want outcomes like these for your product?"
        body="Book a free growth audit — we'll map what's blocking leads, conversion, and speed for teams in the US, UK, and Australia."
        cta={primaryCta}
      />
    </>
  );
}
