import Link from "next/link";
import { Logo } from "./Logo";
import { NewsletterSignup } from "./NewsletterSignup";
import { navLinks, siteConfig } from "@/lib/site";
import { services } from "@/lib/services";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-offwhite">
      <div className="mx-auto w-full max-w-content px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo variant="white" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-offwhite/60">
              The technical partner growing businesses call when their website has
              to actually perform.
            </p>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-gold">
              {siteConfig.founded}
            </p>
          </div>

          <FooterCol title="Company">
            {navLinks.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterCol>

          <FooterCol title="Services">
            {services.slice(0, 6).map((s) => (
              <FooterLink key={s.slug} href={`/services/${s.slug}`}>
                {s.label}
              </FooterLink>
            ))}
          </FooterCol>

          <div>
            <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-offwhite/80">
              Get a free speed &amp; security report
            </h3>
            <NewsletterSignup />
            <div className="mt-6 flex gap-4">
              <SocialLink href={siteConfig.social.instagram} label="Instagram">
                <InstagramIcon />
              </SocialLink>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-offwhite/10 pt-8 text-xs text-offwhite/50 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono">
            © {year} {siteConfig.name}. Built right, kept right.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-offwhite">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-offwhite">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider text-offwhite/80">
        {title}
      </h3>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-sm text-offwhite/60 transition-colors hover:text-offwhite">
        {children}
      </Link>
    </li>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-offwhite/15 text-offwhite/70 transition-colors hover:border-gold hover:text-gold"
    >
      {children}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
