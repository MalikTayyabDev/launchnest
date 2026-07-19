"use client";

import { useState } from "react";
import { CaseStudyCard } from "./CaseStudyCard";
import { industries, type Industry } from "@/lib/work";
import type { CaseStudyItem } from "@/lib/content";

type Filter = "All" | Industry;

const filters: Filter[] = ["All", ...industries];

export function WorkGrid({ caseStudies }: { caseStudies: CaseStudyItem[] }) {
  const [active, setActive] = useState<Filter>("All");

  const visible =
    active === "All"
      ? caseStudies
      : caseStudies.filter((c) => c.industry === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter case studies by industry">
        {filters.map((f) => {
          const isActive = active === f;
          return (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(f)}
              className={`rounded-full px-4 py-2 font-heading text-sm font-medium transition-colors ${
                isActive
                  ? "bg-navy text-offwhite"
                  : "border border-navy/15 text-slate hover:border-navy/40 hover:text-navy"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((study) => (
          <CaseStudyCard key={study.slug} study={study} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-10 text-center font-mono text-sm text-slate">
          No case studies in this category yet.
        </p>
      )}
    </div>
  );
}
