import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/Section";
import { CTASection } from "@/components/CTASection";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { getGridProjects, getOfflineProjects } from "@/lib/projects";
import { getAllCaseStudies } from "@/lib/content";
import { primaryCta } from "@/lib/site";
import { selfCanonical } from "@/lib/seo";

const seo = selfCanonical("/portfolio");

export const metadata: Metadata = {
  title: "SaaS & Startup Portfolio and Case Studies",
  description:
    "SaaS and startup portfolio with outcome case studies and live website builds — conversion, Core Web Vitals, migrations, and product launches.",
  alternates: { canonical: seo.canonical },
  openGraph: { ...seo.openGraph },
};

export const revalidate = 60;

export default async function PortfolioPage() {
  const [portfolioLive, portfolioOffline, caseStudies] = await Promise.all([
    getGridProjects(),
    getOfflineProjects(),
    getAllCaseStudies(),
  ]);

  const platformCount = new Set(portfolioLive.map((i) => i.category)).size;
  const totalDelivered = portfolioLive.length + portfolioOffline.length;

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
        ])}
      />

      <Section tone="offwhite">
        <div className="max-w-3xl">
          <Eyebrow>Portfolio</Eyebrow>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Outcomes first. Live builds second.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate">
            Case studies show the metrics. The grid shows sites in production —
            across stacks, for SaaS, startups, ecommerce, and service businesses.
          </p>
        </div>

        <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { n: `${totalDelivered}+`, l: "Sites delivered" },
            { n: caseStudies.length, l: "Case studies" },
            { n: platformCount, l: "Platforms" },
            { n: "SaaS+", l: "Primary focus" },
          ].map((s) => (
            <div key={s.l}>
              <dt className="font-heading text-3xl font-bold text-navy">{s.n}</dt>
              <dd className="mt-1 font-mono text-xs uppercase tracking-wider text-slate">
                {s.l}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {caseStudies.length > 0 && (
        <Section tone="white">
          <div className="max-w-2xl">
            <Eyebrow>Case studies</Eyebrow>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              Situation. Work. Results.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate">
              The stories buyers use to de-risk hiring us.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study, i) => (
              <Reveal key={study.slug} delay={i * 0.05}>
                <CaseStudyCard study={study} priority={i < 2} />
              </Reveal>
            ))}
          </div>
        </Section>
      )}

      <Section tone="offwhite">
        <div className="max-w-3xl">
          <Eyebrow>Live sites</Eyebrow>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            In production across platforms
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate">
            Filter by platform, or browse. Every card links to the live site.
          </p>
        </div>
        <div className="mt-10">
          <PortfolioGrid items={portfolioLive} />
        </div>
      </Section>

      {portfolioOffline.length > 0 && (
        <Section tone="white">
          <div className="max-w-3xl">
            <Eyebrow>Also delivered</Eyebrow>
            <h2 className="font-heading text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              More projects
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate">
              These are live but bot-protected, moved to a new provider, or since
              retired by the client — so we haven&apos;t shown a live preview.
              Listed here for completeness.
            </p>
          </div>

          <ul className="mt-8 flex flex-wrap gap-3">
            {portfolioOffline.map((item) => (
              <li key={item.url}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-offwhite px-4 py-2 text-sm text-slate transition-colors hover:border-navy/40 hover:text-navy"
                >
                  <span className="font-heading font-medium text-navy">
                    {item.name}
                  </span>
                  <span className="font-mono text-[11px] text-slate/70">
                    {item.stack}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CTASection
        heading="Want results like these — or better?"
        body="Book a free growth audit. We'll map the right solution and show you what it takes to ship."
        cta={primaryCta}
      />
    </>
  );
}
