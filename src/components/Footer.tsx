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
              Engineering-first digital solutions for startups, SaaS companies, agencies,
              and growing businesses — launch, scale, and optimize.
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
            <div className="mt-6 flex flex-wrap gap-4">
              <SocialLink href={siteConfig.social.instagram} label="LaunchNest on Instagram">
                <InstagramIcon />
              </SocialLink>
              <SocialLink href={siteConfig.social.facebook} label="LaunchNest on Facebook">
                <FacebookIcon />
              </SocialLink>
              <SocialLink href={siteConfig.googleReview} label="Leave a Google review for LaunchNest">
                <GoogleIcon />
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

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.78-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}
