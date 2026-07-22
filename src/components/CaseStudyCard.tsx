import Link from "next/link";
import type { CaseStudyItem } from "@/lib/content";

/** Text-only case study card — SEO content without visual “proof” imagery. */
export function CaseStudyCard({
  study,
}: {
  study: CaseStudyItem;
  /** Kept for call-site compatibility; unused (no image to prioritize). */
  priority?: boolean;
}) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group flex h-full flex-col rounded-lg border border-navy/10 bg-white p-6 transition-colors hover:border-gold/50"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate">
        {study.industry}
      </p>
      <p className="mt-3 font-heading text-xl font-bold leading-snug tracking-tight text-navy sm:text-2xl">
        {study.headlineResult}
      </p>
      <p className="mt-3 font-heading text-sm font-semibold text-navy/70">
        {study.client}
      </p>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{study.summary}</p>
      <span className="mt-5 font-heading text-sm font-semibold text-navy underline decoration-gold underline-offset-4 group-hover:text-gold">
        Read the case study
      </span>
    </Link>
  );
}
