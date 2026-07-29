# LaunchNest — SEO & Keyword Map

Positioning: **Engineering-First Digital Solutions Agency** — launch / growth partner
for startups, SaaS, agencies, and growing businesses. Never rank for or brand as
"WordPress agency", "Shopify agency", or generic "web design agency."

Markets: UK (GB), US, Australia (AU). Refine phrases in Google Search Console before
locking long-term content bets.

Priorities: (P1) commercial-intent money pages, (P2) supporting/service pages,
(P3) informational blog posts that feed the money pages.

## Global on-page setup

- `metadataBase` + **absolute self-canonical** on every public page (`selfCanonical()`).
- Per-page Open Graph `url` matches the canonical (not forced to homepage).
- Structured data (JSON-LD): `ProfessionalService` + `WebSite` site-wide, `Service`
  on service pages, `Article` on posts, `BreadcrumbList` on nested pages. `areaServed`
  is set to `GB`, `US`, `AU`.
- `sitemap.xml` includes services, `/for/*`, `/work/*`, blog.
- `robots.txt`: allow `/`, disallow `/admin/` and `/api/`, declare Sitemap.
  Do **not** use `Host:` (Googlebot ignores it → GSC warning).

## Page → keyword mapping

| Page | Priority | Primary keyword | Secondary / long-tail |
| --- | --- | --- | --- |
| `/` Home | P1 | engineering-first digital solutions agency | startup growth partner, SaaS digital agency |
| `/services` | P1 | digital product engineering services | launch partner for startups, end-to-end digital solutions |
| `/services/website-design-dev` | P1 | SaaS website development | startup MVP website, Next.js agency, conversion website redesign |
| `/services/ui-ux-design` | P1 | SaaS UI UX design | startup product design, conversion-focused UX |
| `/services/graphic-design` | P2 | brand identity for startups | premium brand system agency |
| `/services/ai-automation` | P1 | AI integrations for SaaS | CRM automation agency, marketing automation |
| `/services/seo` | P1 | technical SEO agency | SEO content writing for SaaS, Core Web Vitals |
| `/services/maintenance-support` | P1 | website maintenance retainer | QA testing, hosting and deployment support |
| `/pricing` | P1 | SaaS website development cost | digital agency pricing, growth retainer |
| `/portfolio` | P2 | SaaS and startup portfolio | live website case proof |
| `/for/saas` | P1 | SaaS marketing site agency | SaaS website development, trial conversion |
| `/for/ai-startups` | P1 | AI startup website | MVP launch partner, Next.js for AI startups |
| `/about` | P3 | engineering-first digital agency | launch partner for modern businesses |
| `/contact` | P2 | free website growth audit | book discovery call digital agency |

## Blog → keyword mapping (P3 → feeds money pages)

| Post slug | Primary keyword | Feeds service |
| --- | --- | --- |
| `/blog/saas-marketing-site-checklist` | SaaS website development | website-design-dev |
| `/blog/saas-ui-ux-that-converts` | SaaS UI UX design | ui-ux-design |
| `/blog/brand-identity-for-startups` | brand identity for startups | graphic-design |
| `/blog/ai-automation-for-saas-growth` | AI integrations for SaaS | ai-automation |
| `/blog/core-web-vitals-that-matter` | Core Web Vitals / technical SEO | seo |
| `/blog/what-maintenance-actually-means` | website maintenance retainer | maintenance-support |
| `/blog/why-your-checkout-is-slow` | conversion / performance | website-design-dev |
| `/blog/shopify-speed-optimization-checklist` | Shopify speed | website-design-dev |
| `/blog/how-much-should-a-website-cost` | website development cost | website-design-dev |
| `/blog/webflow-vs-wordpress` | Webflow vs WordPress (comparison) | website-design-dev |

On-page for posts: unique `metaTitle` / `metaDescription`, H2 sections, internal link to related service, Article JSON-LD (incl. cover `image` when set), OG/Twitter large image when `coverImage` is uploaded in CMS.

## Ranking data (important)

**Exact ranking keywords require Google Search Console → Performance → Queries.**
Without a GSC export, we cannot truthfully list ranked terms. Early US analytics
(pageviews) only show which URLs are being hit — not which queries ranked.

When you export GSC (last 28 days), share: Query, Clicks, Impressions, CTR, Position.

## Brand note

Other companies use “LaunchNest” on different domains (`.net`, `.com.au`, etc.).
Differentiate with **launch-nest.com** + “engineering-first” + SaaS/AI messaging.

## Pre-launch / growth checklist

- [x] Production domain `https://www.launch-nest.com`
- [x] Absolute self-canonicals + page OG URLs
- [x] Expanded robots.txt (admin/api disallow)
- [x] Keyword-deeper service + audience page copy
- [ ] Verify Google Search Console + Bing Webmaster Tools
- [ ] Submit `https://www.launch-nest.com/sitemap.xml` in GSC + Bing
- [ ] Confirm money-page titles against live SERP competitors
- [ ] Replace seed case studies with permissioned client stories
- [ ] Track Core Web Vitals in GSC after launch
