"use client";

import Image from "next/image";
import Link from "next/link";
import type { PublicPortfolioItem } from "@/lib/projects";

/** Accent dot per platform for quick visual scanning. */
const stackDot: Record<string, string> = {
  WordPress: "#21759B",
  Shopify: "#95BF47",
  Wix: "#0C6EFC",
  Webflow: "#4353FF",
  GoHighLevel: "#14B8A6",
  Custom: "#C9A227",
};

export function dotColor(category: string) {
  return stackDot[category] ?? "#4A5568";
}

/**
 * Portfolio preview card — no live URLs in the DOM.
 * Contact is required to receive full project links.
 */
export function PortfolioCard({
  item,
  priority = false,
}: {
  item: PublicPortfolioItem;
  priority?: boolean;
}) {
  return (
    <article
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-navy/10 bg-white select-none transition-all duration-200 hover:border-gold/50 hover:shadow-[0_12px_40px_-16px_rgba(11,31,58,0.25)]"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-offwhite">
        {item.image ? (
          <Image
            src={item.image}
            alt={`Preview of ${item.name}`}
            fill
            priority={priority}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="pointer-events-none object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-navy/5 font-mono text-xs text-slate">
            Preview on request
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-base font-semibold text-navy">
          {item.name}
        </h3>
        <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-offwhite px-3 py-1 font-mono text-[11px] font-medium text-slate">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: dotColor(item.category) }}
            aria-hidden="true"
          />
          {item.stack}
        </span>
        <Link
          href="/contact"
          className="mt-5 inline-flex w-fit items-center gap-1.5 font-heading text-sm font-semibold text-navy underline decoration-gold underline-offset-4 transition-colors hover:text-gold"
        >
          Contact to view live site
        </Link>
      </div>
    </article>
  );
}
