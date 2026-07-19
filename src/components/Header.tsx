"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./Logo";
import { Monogram } from "./Monogram";
import { Button } from "./Button";
import { navLinks, primaryCta } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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

        {/* Mobile toggle */}
        <button
          type="button"
          className="flex items-center lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <path d="M7 7l14 14M21 7 7 21" stroke="#0B1F3A" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <Monogram size={36} />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-navy/10 bg-white lg:hidden">
          <nav className="mx-auto flex w-full max-w-content flex-col gap-1 px-6 py-4" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 font-heading text-base font-medium text-navy hover:bg-offwhite"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3">
              <Button href={primaryCta.href} variant="primary" className="w-full">
                {primaryCta.label}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
