"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Stagger index for sequenced groups. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
};

/**
 * Restrained scroll-entrance wrapper: a short fade + upward nudge, once.
 * Honours prefers-reduced-motion (no animation for those visitors).
 */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const MotionTag = motion[as];
  const reduceMotion = useReducedMotion();

  // Performance: above-the-fold items often use delay=0.
  // Avoid painting invisible initial state (LCP unfriendly).
  const isEager = delay === 0;

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <MotionTag
      className={className}
      initial={isEager ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: isEager ? 0 : delay }}
    >
      {children}
    </MotionTag>
  );
}
