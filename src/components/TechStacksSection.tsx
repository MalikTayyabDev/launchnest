import Link from "next/link";
import { Eyebrow } from "./Section";
import { techStacks } from "@/lib/tech-stacks";

type Props = {
  tone?: "white" | "offwhite";
  showCta?: boolean;
};

export function TechStacksSection({ tone = "offwhite", showCta = true }: Props) {
  const bg = tone === "white" ? "bg-white" : "bg-offwhite";

  return (
    <section className={`border-y border-navy/10 ${bg}`}>
      <div className="mx-auto w-full max-w-content px-6 py-16 lg:px-8">
        <div className="max-w-2xl">
          <Eyebrow>Software engineering stacks we ship</Eyebrow>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Built for production software. Stack-agnostic when it matters.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate">
            LaunchNest is an engineering-first development partner for SaaS, AI, and
            growth teams — and we pick the stack that fits your roadmap, editors,
            and maintenance needs. Not a WordPress shop. Not a Shopify-only agency.
            One team that ships modern software and conversion surfaces across product
            and marketing stacks.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {techStacks.map((stack) => (
            <li
              key={stack.name}
              className="rounded-lg border border-navy/10 bg-white p-5 shadow-sm"
            >
              <p className="font-heading text-base font-semibold text-navy">
                <Link
                  href={stack.href}
                  className="hover:text-gold transition-colors"
                >
                  {stack.name}
                </Link>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate">{stack.use}</p>
            </li>
          ))}
        </ul>

        {showCta && (
          <p className="mt-8 text-sm text-slate">
            Not sure which stack fits?{" "}
            <Link
              href="/contact#audit"
              className="font-medium text-navy underline decoration-gold underline-offset-2"
            >
              Book a free growth audit
            </Link>{" "}
            — we recommend based on your product, not our preference.
          </p>
        )}
      </div>
    </section>
  );
}
