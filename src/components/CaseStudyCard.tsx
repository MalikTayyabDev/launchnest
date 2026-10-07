import Link from "next/link";
import type { CaseStudyItem } from "@/lib/content";

/** Case study card — public-proof studies link live; others stay contact-gated. */
export function CaseStudyCard({
  study,
}: {
  study: CaseStudyItem;
  /** Kept for call-site compatibility; unused (no image to prioritize). */
  priority?: boolean;
}) {
  const results = (study.results ?? []).slice(0, 3);

  return (
    <article className="group flex h-full flex-col rounded-lg border border-navy/10 bg-white p-6 transition-colors hover:border-gold/50">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate">
        {study.industry}
        {study.liveDomain ? (
          <>
            <span aria-hidden="true"> · </span>
            <span className="text-gold">{study.liveDomain}</span>
          </>
        ) : null}
      </p>
      <Link href={`/work/${study.slug}`} className="mt-3 block">
        <h3 className="font-heading text-xl font-bold leading-snug tracking-tight text-navy transition-colors group-hover:text-gold sm:text-2xl">
          {study.headlineResult}
        </h3>
      </Link>
      <p className="mt-3 font-heading text-sm font-semibold text-navy/70">
        {study.client}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-slate">{study.summary}</p>
      {results.length > 0 && (
        <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-navy/10 pt-4">
          {results.map((r) => (
            <div key={`${r.metric}-${r.label}`}>
              <dt className="font-heading text-sm font-bold text-navy">{r.metric}</dt>
              <dd className="mt-0.5 text-[11px] leading-snug text-slate">{r.label}</dd>
            </div>
          ))}
        </dl>
      )}
      <div className="mt-5 flex flex-1 flex-col justify-end gap-2 sm:flex-row sm:items-center sm:gap-4">
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
          className="font-heading text-sm font-semibold text-navy/70 underline decoration-navy/20 underline-offset-4 hover:text-navy"
        >
          Read the case study
        </Link>
      </div>
    </article>
  );
}
