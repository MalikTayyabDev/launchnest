"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "./Button";
import { Eyebrow } from "./Section";

type HeroProps = {
  eyebrow?: string;
  headline: string;
  subhead: string;
  cta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Optional slot rendered alongside the copy (e.g. a lead-capture form). */
  aside?: ReactNode;
  /** Small trust chips shown under the subhead (above-the-fold credibility). */
  trustChips?: string[];
};

/** Reusable hero with editable headline/subhead/CTA props. */
export function Hero({
  eyebrow,
  headline,
  subhead,
  cta,
  secondaryCta,
  aside,
  trustChips,
}: HeroProps) {
  const reduceMotion = useReducedMotion();
  const anim = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, delay },
        };

  return (
    <section className="relative overflow-hidden bg-white">
      <TrajectoryBackdrop />
      <div className="relative mx-auto w-full max-w-content px-6 pb-16 pt-12 sm:pb-28 sm:pt-24 lg:px-8">
        <div
          className={
            aside
              ? "grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16"
              : ""
          }
        >
          {/* On mobile, show the form first so the main action is above the fold. */}
          {aside && (
            <motion.div
              id="audit-form"
              className="scroll-mt-28 order-1 lg:order-2"
              {...anim(0.08)}
            >
              {aside}
            </motion.div>
          )}
          <div className={`order-2 lg:order-1 ${aside ? "max-w-2xl" : "max-w-3xl"}`}>
            {eyebrow && (
              <motion.div {...anim(0)}>
                <Eyebrow>{eyebrow}</Eyebrow>
              </motion.div>
            )}
            <motion.h1
              className="font-heading text-4xl font-bold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-6xl"
              {...anim(0.04)}
            >
              {headline}
            </motion.h1>
            <motion.p
              className="mt-6 max-w-2xl text-lg leading-relaxed text-slate"
              {...anim(0.08)}
            >
              {subhead}
            </motion.p>
            {trustChips && trustChips.length > 0 && (
              <motion.ul
                className="mt-6 flex flex-wrap gap-2"
                {...anim(0.1)}
                aria-label="Trust signals"
              >
                {trustChips.map((chip) => (
                  <li
                    key={chip}
                    className="rounded-full border border-navy/10 bg-offwhite px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-wider text-navy/80"
                  >
                    {chip}
                  </li>
                ))}
              </motion.ul>
            )}
            {(cta || secondaryCta) && (
              <motion.div
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
                {...anim(0.14)}
              >
                {cta && (
                  <Button href={cta.href} variant="primary">
                    {cta.label}
                  </Button>
                )}
                {secondaryCta && (
                  <Button href={secondaryCta.href} variant="ghost">
                    {secondaryCta.label}
                  </Button>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Subtle geometric chevron/trajectory lines echoing the logo arrow motif. */
function TrajectoryBackdrop() {
  return (
    <svg
      className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-[0.06]"
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMaxYMid slice"
    >
      {[0, 60, 120, 180, 240].map((offset) => (
        <path
          key={offset}
          d={`M${offset} 400 L${offset + 200} 200 L${offset} 0`}
          stroke="#0B1F3A"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}
