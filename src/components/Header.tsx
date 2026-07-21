"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { navLinks, primaryCta, whatsappLink } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();

  // Close menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll + Escape to close while the popup is open.
  useEffect(() => {
    if (!open) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-content items-center justify-between px-6 lg:px-8">
        <Link href="/" aria-label="LaunchNest home" onClick={() => setOpen(false)}>
          <Logo variant="navy" height={38} priority />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-heading text-sm font-medium transition-colors hover:text-navy ${
                  active ? "text-navy" : "text-slate"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href={primaryCta.href} variant="primary">
            {primaryCta.label}
          </Button>
        </div>

        {/* Animated hamburger → X */}
        <button
          type="button"
          className="relative z-[60] flex h-11 w-11 items-center justify-center rounded-md border border-navy/10 bg-white text-navy transition-colors hover:border-gold/50 hover:bg-offwhite focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <HamburgerIcon open={open} />
        </button>
      </div>

      {/* Mobile popup overlay — does not push page content */}
      <div
        className={`fixed inset-0 z-[55] lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        {/* Dimmed backdrop */}
        <button
          type="button"
          tabIndex={open ? 0 : -1}
          aria-label="Close menu"
          className={`absolute inset-0 bg-navy/50 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        {/* Popup panel */}
        <div
          id={menuId}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className={`absolute inset-x-0 top-0 origin-top rounded-b-2xl border-b border-navy/10 bg-white shadow-[0_24px_60px_-20px_rgba(11,31,58,0.45)] transition-all duration-300 ease-out ${
            open
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-3 opacity-0"
          }`}
        >
          {/* Spacer matching header height so links sit below the bar */}
          <div className="h-20" aria-hidden="true" />

          <nav className="mx-auto flex w-full max-w-content flex-col px-6 pb-8 pt-2" aria-label="Mobile">
            {navLinks.map((link, i) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-3.5 font-heading text-lg font-semibold transition-colors ${
                    active
                      ? "bg-offwhite text-navy"
                      : "text-navy hover:bg-offwhite"
                  }`}
                  style={{
                    transitionDelay: open ? `${60 + i * 30}ms` : "0ms",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="mt-5 flex flex-col gap-3 border-t border-navy/10 pt-5">
              <Button
                href={primaryCta.href}
                variant="primary"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                {primaryCta.label}
              </Button>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-navy/15 px-6 py-3 font-heading text-sm font-semibold text-navy transition-colors hover:border-gold hover:text-gold"
              >
                <WhatsAppGlyph />
                Chat on WhatsApp
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

/** Three-line hamburger that morphs into an X when open. */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-3.5 w-5" aria-hidden="true">
      <span
        className={`absolute left-0 top-0 block h-0.5 w-full rounded-full bg-current transition-transform duration-300 ease-out ${
          open ? "translate-y-[6px] rotate-45" : ""
        }`}
      />
      <span
        className={`absolute left-0 top-[6px] block h-0.5 w-full rounded-full bg-current transition-all duration-300 ease-out ${
          open ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
        }`}
      />
      <span
        className={`absolute left-0 top-[12px] block h-0.5 w-full rounded-full bg-current transition-transform duration-300 ease-out ${
          open ? "-translate-y-[6px] -rotate-45" : ""
        }`}
      />
    </span>
  );
}

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
