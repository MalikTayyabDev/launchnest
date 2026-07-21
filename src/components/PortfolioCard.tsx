import Image from "next/image";
import type { PortfolioItem } from "@/lib/portfolio";

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

export function PortfolioCard({
  item,
  priority = false,
}: {
  item: PortfolioItem;
  /** Eager-load above-the-fold cards (home featured work). */
  priority?: boolean;
}) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-navy/10 bg-white transition-all duration-200 hover:border-gold/50 hover:shadow-[0_12px_40px_-16px_rgba(11,31,58,0.25)]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-offwhite">
        <Image
          src={item.image}
          alt={`Screenshot of ${item.name}`}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 font-heading text-xs font-semibold text-navy opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          Visit
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-base font-semibold text-navy">{item.name}</h3>
        <p className="mt-1 truncate font-mono text-xs text-slate">{item.domain}</p>
        <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-offwhite px-3 py-1 font-mono text-[11px] font-medium text-slate">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: dotColor(item.category) }}
            aria-hidden="true"
          />
          {item.stack}
        </span>
      </div>
    </a>
  );
}
