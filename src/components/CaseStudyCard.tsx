import Link from "next/link";
import type { CaseStudyItem } from "@/lib/content";

export function CaseStudyCard({ study }: { study: CaseStudyItem }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-navy/10 bg-white transition-all duration-200 hover:border-gold/50 hover:shadow-[0_12px_40px_-16px_rgba(11,31,58,0.25)]"
    >
      <Thumbnail accent={study.accent} result={study.headlineResult} />
      <div className="flex flex-1 flex-col p-6">
        <span className="mb-3 inline-flex w-fit rounded-full bg-offwhite px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-slate">
          {study.industry}
        </span>
        <h3 className="font-heading text-lg font-semibold text-navy">{study.client}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{study.summary}</p>
        <span className="mt-5 font-mono text-sm font-semibold text-navy transition-colors group-hover:text-gold">
          {study.headlineResult}
        </span>
      </div>
    </Link>
  );
}

/** Abstract geometric thumbnail — chevron/trajectory lines, no stock photography. */
function Thumbnail({ accent, result }: { accent: string; result: string }) {
  const onGold = accent === "#C9A227";
  return (
    <div
      className="relative aspect-[16/9] w-full overflow-hidden"
      style={{ backgroundColor: accent }}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-20"
        viewBox="0 0 320 180"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        {[0, 50, 100, 150, 200].map((x) => (
          <path
            key={x}
            d={`M${x} 180 L${x + 120} 90 L${x} 0`}
            stroke={onGold ? "#0B1F3A" : "#F4F5F7"}
            strokeWidth="1.5"
          />
        ))}
      </svg>
      <span
        className={`absolute bottom-4 left-5 font-mono text-sm font-semibold ${
          onGold ? "text-navy" : "text-offwhite"
        }`}
      >
        {result}
      </span>
    </div>
  );
}
