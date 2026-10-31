import Link from "next/link";
import type { CaseStudyItem } from "@/lib/content";

/** Case study card — public-proof studies link live; others stay contact-gated. */
export function CaseStudyCard({
  study,
}: {
  study: CaseStudyItem;
  priority?: boolean;
}) {
  const results = (study.results ?? []).slice(0, 3);

  return (
    <article className="group flex h-full flex-col border-t border-navy/15 pt-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate/70">
        {study.industry}
        {study.liveDomain ? (
          <>
            <span aria-hidden="true"> · </span>
            <span className="text-navy/60">{study.liveDomain}</span>
          </>
        ) : null}
      </p>
      <Link href={`/work/${study.slug}`} className="mt-3 block">
        <h3 className="font-heading text-xl font-semibold leading-snug tracking-tight text-navy transition-colors group-hover:text-navy/70 sm:text-[1.35rem]">
          {study.headlineResult}
        </h3>
      </Link>
      <p className="mt-3 font-heading text-sm font-medium text-navy/55">{study.client}</p>
      <p className="mt-3 text-sm leading-relaxed text-slate">{study.summary}</p>
      {results.length > 0 && (
        <dl className="mt-6 grid grid-cols-3 gap-3 border-t border-navy/8 pt-4">
          {results.map((r) => (
            <div key={`${r.metric}-${r.label}`}>
              <dt className="font-heading text-sm font-semibold text-navy">{r.metric}</dt>
              <dd className="mt-0.5 text-[11px] leading-snug text-slate">{r.label}</dd>
            </div>
          ))}
        </dl>
      )}
      <div className="mt-6 flex flex-1 flex-col justify-end gap-3 sm:flex-row sm:items-center sm:gap-5">
        {study.liveUrl ? (
          <a
            href={study.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading text-sm font-semibold text-navy underline decoration-gold underline-offset-4 hover:text-gold"
          >
            Visit live site
          </a>
        ) : study.hasLiveSite ? (
          <Link
            href="/contact"
            className="font-heading text-sm font-semibold text-navy underline decoration-gold underline-offset-4 hover:text-gold"
          >
            Contact to view live site
          </Link>
        ) : null}
        <Link
          href={`/work/${study.slug}`}
          className="font-heading text-sm font-medium text-navy/55 underline decoration-navy/15 underline-offset-4 hover:text-navy"
        >
          Case study
        </Link>
      </div>
    </article>
  );
}
