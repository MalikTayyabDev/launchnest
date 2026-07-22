import Link from "next/link";
import type { CaseStudyItem } from "@/lib/content";

/** Outcome-first case study card — metric headline, not a screenshot. */
export function CaseStudyCard({
  study,
  priority: _priority = false,
}: {
  study: CaseStudyItem;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-navy/10 bg-white transition-all duration-200 hover:border-gold/50 hover:shadow-[0_12px_40px_-16px_rgba(11,31,58,0.25)]"
    >
      <div
        className="relative flex aspect-[16/10] w-full flex-col justify-end p-6"
        style={{ backgroundColor: study.accent }}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">
          {study.industry}
        </p>
        <p className="mt-2 font-heading text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
          {study.headlineResult}
        </p>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-heading text-base font-semibold text-navy">{study.client}</p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{study.summary}</p>
        <span className="mt-4 font-heading text-sm font-semibold text-navy underline decoration-gold underline-offset-4 group-hover:text-gold">
          Read the case study
        </span>
      </div>
    </Link>
  );
}
