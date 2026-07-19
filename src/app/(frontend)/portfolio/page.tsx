import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/Section";
import { CTASection } from "@/components/CTASection";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { getGridProjects, getOfflineProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "A selection of websites we've designed and built across WordPress, Shopify, Webflow, Wix, and custom stacks — for clients in the UK, US, Australia, and beyond.",
  alternates: { canonical: "/portfolio" },
};

export const revalidate = 60;

export default async function PortfolioPage() {
  const [portfolioLive, portfolioOffline] = await Promise.all([
    getGridProjects(),
    getOfflineProjects(),
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
            {totalDelivered}+ sites shipped, across every major platform.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate">
            E-commerce stores, service businesses, clinics, agencies, and SaaS —
            built on the right tool for the job. Filter by platform, or just
            browse. Every card links straight to the live site.
          </p>
        </div>

        <dl className="mt-10 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { n: `${totalDelivered}+`, l: "Sites delivered" },
            { n: platformCount, l: "Platforms" },
            { n: portfolioLive.filter((i) => i.category === "WordPress").length, l: "WordPress builds" },
            { n: portfolioLive.filter((i) => i.category === "Shopify").length, l: "Shopify stores" },
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

      <Section tone="white">
        <PortfolioGrid items={portfolioLive} />
      </Section>

      {portfolioOffline.length > 0 && (
        <Section tone="offwhite">
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
                  className="inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white px-4 py-2 text-sm text-slate transition-colors hover:border-navy/40 hover:text-navy"
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
        heading="Want a site like these — or better?"
        body="Tell us what you're building. We'll recommend the right platform and show you exactly what it takes to ship it."
        cta={{ label: "Book a Free Technical Audit", href: "/contact" }}
      />
    </>
  );
}
