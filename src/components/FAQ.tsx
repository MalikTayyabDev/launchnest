import { JsonLd } from "./JsonLd";

export type FaqItem = { q: string; a: string };

/**
 * Accessible FAQ using native <details>/<summary> (no JS required).
 * Emits FAQPage JSON-LD when `withSchema` is set.
 */
export function FAQ({
  items,
  withSchema = false,
}: {
  items: FaqItem[];
  withSchema?: boolean;
}) {
  return (
    <div className="divide-y divide-navy/10 border-y border-navy/10">
      {withSchema && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }}
        />
      )}
      {items.map((item) => (
        <details key={item.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-lg font-semibold text-navy">
            {item.q}
            <span
              aria-hidden="true"
              className="shrink-0 text-gold transition-transform duration-200 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
