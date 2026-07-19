"use client";

import { useMemo, useState } from "react";
import type { PortfolioItem } from "@/lib/portfolio";
import { PortfolioCard, dotColor } from "./PortfolioCard";

const CATEGORY_ORDER = [
  "WordPress",
  "Shopify",
  "Webflow",
  "Wix",
  "GoHighLevel",
  "Custom",
];

export function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  const [active, setActive] = useState<string>("All");

  const categories = useMemo(() => {
    const present = new Set(items.map((i) => i.category));
    return ["All", ...CATEGORY_ORDER.filter((c) => present.has(c))];
  }, [items]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: items.length };
    for (const it of items) c[it.category] = (c[it.category] ?? 0) + 1;
    return c;
  }, [items]);

  const visible =
    active === "All" ? items : items.filter((i) => i.category === active);

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter portfolio by platform"
      >
        {categories.map((f) => {
          const isActive = active === f;
          const count = counts[f] ?? 0;
          if (f !== "All" && count === 0) return null;
          return (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(f)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-heading text-sm font-medium transition-colors ${
                isActive
                  ? "bg-navy text-offwhite"
                  : "border border-navy/15 text-slate hover:border-navy/40 hover:text-navy"
              }`}
            >
              {f !== "All" && (
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: dotColor(f) }}
                  aria-hidden="true"
                />
              )}
              {f}
              <span className={isActive ? "text-offwhite/60" : "text-slate/60"}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((item) => (
          <PortfolioCard key={item.url} item={item} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-10 text-center font-mono text-sm text-slate">
          No sites in this category.
        </p>
      )}
    </div>
  );
}
