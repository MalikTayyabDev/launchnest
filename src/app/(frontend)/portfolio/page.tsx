import type { Metadata } from "next";
import Link from "next/link";
import { Section, Eyebrow } from "@/components/Section";
import { CTASection } from "@/components/CTASection";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, selfCanonical } from "@/lib/seo";
import { getGridProjects, getOfflineProjects } from "@/lib/projects";
import { getAllCaseStudies } from "@/lib/content";

const seo = selfCanonical("/portfolio");

export const metadata: Metadata = {
  title: "SaaS & Startup Website Portfolio & Case Studies",
  description:
    "LaunchNest (launch-nest.com) portfolio — SaaS and startup website case studies and live builds across WordPress, Shopify, Webflow, Wix, and custom stacks (US, UK, AU).",
  keywords: [
    "SaaS portfolio",
    "startup website portfolio",
    "website case studies",
    "LaunchNest portfolio",
    "launch-nest.com",
  ],
  alternates: { canonical: seo.canonical },
  openGraph: {
    ...seo.openGraph,
    title: "SaaS & Startup Website Portfolio & Case Studies | LaunchNest",
    description:
      "Live website case studies and portfolio from LaunchNest at launch-nest.com.",
    locale: "en_US",
    alternateLocale: ["en_GB", "en_AU"],
  },
  twitter: {
    card: "summary_large_image",
    title: "SaaS & Startup Website Portfolio & Case Studies | LaunchNest",
    description:
      "Live website case studies and portfolio from LaunchNest at launch-nest.com.",
  },
};

export const revalidate = 10;

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
            Featured case studies include clickable live sites you can verify in
            seconds. The wider grid stays contact-gated to protect client
            confidentiality — ask us for any URL you need.
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
              Featured studies link to live production URLs. Remaining portfolio
              work is available on request.
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
          <Eyebrow>Production work</Eyebrow>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            In production across platforms
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate">
            Filter by platform and browse previews. Featured public-proof sites
            link live; remaining URLs are shared privately after you contact us.
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
              Additional deliveries without public previews. Ask us for details and
              live access when you get in touch.
            </p>
          </div>

          <ul className="mt-8 flex flex-wrap gap-3">
            {portfolioOffline.map((item) => (
              <li key={item.id}>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-offwhite px-4 py-2 text-sm text-slate transition-colors hover:border-navy/40 hover:text-navy"
                >
                  <span className="font-heading font-medium text-navy">
                    {item.name}
                  </span>
                  <span className="font-mono text-[11px] text-slate/70">
                    {item.stack}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <CTASection
        heading="Want more live URLs from the full portfolio?"
        body="Featured projects are clickable above. Book a free growth audit or send a short note for any other production URL you want to review."
        cta={{ label: "Contact for more live sites", href: "/contact" }}
      />
    </>
  );
}
