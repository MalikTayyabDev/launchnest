"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { whatsappLink } from "@/lib/site";

/**
 * Mobile-only sticky CTA that appears after the visitor scrolls past the hero.
 * Gives a second chance to engage (audit / WhatsApp) before they bounce.
 */
export function MobileStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 420);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const offset = visible ? "4.75rem" : "0px";
    document.documentElement.style.setProperty("--mobile-sticky-offset", offset);
    return () => {
      document.documentElement.style.setProperty("--mobile-sticky-offset", "0px");
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy/10 bg-white/95 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-8px_30px_-12px_rgba(11,31,58,0.35)] backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-content items-center gap-2">
        <Link
          href="/#audit-form"
          className="flex-1 rounded-md bg-gold px-3 py-3 text-center font-heading text-sm font-semibold text-navy"
        >
          Free audit
        </Link>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-md border border-navy/15 px-3 py-3 text-center font-heading text-sm font-semibold text-navy"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
