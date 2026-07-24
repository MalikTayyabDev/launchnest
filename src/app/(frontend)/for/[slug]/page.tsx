import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Section, Eyebrow } from "@/components/Section";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { CTASection } from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { audiences, getAudience } from "@/lib/audiences";
import { getCaseStudy } from "@/lib/content";
import { breadcrumbSchema, selfCanonical } from "@/lib/seo";
import { primaryCta } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return audiences.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const audience = getAudience(slug);
  if (!audience) return { title: "For you" };
  const path = `/for/${audience.slug}`;
  const { canonical, openGraph } = selfCanonical(path);
  return {
    title: audience.title,
    description: audience.description,
    alternates: { canonical },
    openGraph: {
      ...openGraph,
      title: audience.title,
      description: audience.description,
    },
  };
}

export default async function AudiencePage({ params }: Props) {
  const { slug } = await params;
  const audience = getAudience(slug);
  if (!audience) notFound();

  const studies = (
    await Promise.all(audience.caseStudySlugs.map((s) => getCaseStudy(s)))
  ).filter(Boolean);

  const faqs = [
    {
      q: `Do you specialize in ${audience.label.replace(/^For /, "").toLowerCase()} clients?`,
      a: "Yes — they are among our primary partners. We also work with agencies and growing businesses, but our engineering-first process is built for product and growth teams who care about conversion and speed.",
    },
    {
      q: "What does a free growth audit include?",
      a: "A practical review of what's blocking leads, conversion, and performance — with a clear recommended path. You leave with specifics whether or not you hire us.",
    },
    {
      q: "How fast can we launch?",
      a: "Focused marketing sites often ship in 1–5 weeks depending on scope. Custom product / MVP work is planned with milestones before we start.",
    },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: audience.label, path: `/for/${audience.slug}` },
        ])}
      />

      <Hero
        eyebrow={audience.label}
        headline={audience.headline}
        subhead={audience.subhead}
        trustChips={[
          "Engineering-first",
          "Outcome-focused",
          "UK · US · AU",
          "Reply in 1 business day",
        ]}
        cta={primaryCta}
        secondaryCta={{ label: "See related work", href: "/portfolio" }}
      />

      <Section tone="offwhite">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>Why this page exists</Eyebrow>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-navy">
            Built for how {audience.label.replace(/^For /, "")} teams buy
          </h2>
          <div className="mt-6 flex flex-col gap-5">
            {audience.body.map((p) => (
              <p key={p.slice(0, 48)} className="text-lg leading-relaxed text-slate">
                {p}
              </p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {audience.services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="rounded-full border border-navy/15 bg-white px-4 py-2 font-heading text-sm font-medium text-navy transition-colors hover:border-gold hover:text-gold"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>You&apos;re here if</Eyebrow>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-navy">
              These blockers sound familiar
            </h2>
            <ul className="mt-6 flex flex-col gap-3">
              {audience.pains.map((p) => (
                <li key={p} className="flex items-start gap-3 text-base text-slate">
                  <span
                    className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold"
                    aria-hidden="true"
                  />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow>What you get</Eyebrow>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-navy">
              Outcomes we optimize for
            </h2>
            <ul className="mt-6 flex flex-col gap-3">
              {audience.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 text-base text-slate">
                  <span
                    className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold"
                    aria-hidden="true"
                  />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {studies.length > 0 && (
        <Section tone="offwhite">
          <div className="max-w-2xl">
            <Eyebrow>Proof</Eyebrow>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Related outcomes
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">
              Real engagement patterns — situation, work, and metrics.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {studies.map((study, i) =>
              study ? (
                <Reveal key={study.slug} delay={i * 0.06}>
                  <CaseStudyCard study={study} />
                </Reveal>
              ) : null,
            )}
          </div>
        </Section>
      )}

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-navy">
              Quick answers
            </h2>
          </div>
          <FAQ items={faqs} withSchema />
        </div>
      </Section>

      <CTASection
        heading="Ready to grow with an engineering-first partner?"
        body="Book a free growth audit. We'll tell you what's blocking pipeline — no sales script."
        cta={primaryCta}
        secondaryCta={{ label: "View pricing", href: "/pricing" }}
      />
    </>
  );
}
