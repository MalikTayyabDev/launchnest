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
- Canonical host: `https://www.launch-nest.com` (`site-origins.ts` + middleware force www).
- Per-page Open Graph `url` matches the canonical (not forced to homepage).
- Structured data (JSON-LD): `ProfessionalService` + `WebSite` site-wide, `Service`
  on service pages, `Article` on posts, `BreadcrumbList` on nested pages. `areaServed`
  is set to `GB`, `US`, `AU`.
- `sitemap.xml` includes services, `/for/*`, `/work/*`, blog — **auto-updated** when you publish or edit CMS posts/case studies (no manual sitemap file).
- `robots.ts`: allow `/`, disallow `/admin/` and `/api/`, declare Sitemap.
  Do **not** use `Host:` (Googlebot ignores it → GSC warning).
- Money pages use `index: true` (layout default) — never noindex home, pricing, about, portfolio, or services.

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
| `/portfolio` | P2 | SaaS and startup portfolio | live website case proof, US UK Australia |
| `/work/wiz-ai-product-site` | P2 | AI startup website | live AI product marketing site |
| `/work/clearmatrix-custom-platform` | P2 | custom SaaS website development | engineering-first live case study |
| `/work/algorithmicsoftware-uk-commerce` | P2 | UK WooCommerce website | UK tech commerce case study |
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

Other companies use “LaunchNest” / “Launch Nest” on different domains (e.g. `.com.au`).
Differentiate with **launch-nest.com** + engineering-first + SaaS/AI messaging + live portfolio proof.

## Indexing hygiene (code verified)

- [x] `robots.ts` allows `/`, blocks `/admin/` `/api/`
- [x] `sitemap.ts` includes money pages + `/work/*` + blog (CMS-driven, refreshes on publish)

## Sitemap auto-update (you do not edit sitemap.xml by hand)

When you **Publish** a blog post or case study in Payload Admin, hooks immediately refresh `/sitemap.xml` plus the live page and index.

Fallback: the sitemap route also revalidates at most once per hour.

**Your workflow:** publish in CMS → optionally spot-check `https://www.launch-nest.com/sitemap.xml` → in GSC use **Sitemaps → Resubmit** (or Request indexing on the new URL). Google still chooses crawl timing; the sitemap stays accurate without code changes.

New **code-only** pages (new route files) still need a one-line entry in `src/app/sitemap.ts` `staticRoutes` — blogs and `/work/*` do not.
- [x] Absolute self-canonicals via `selfCanonical()` / www host
- [x] Featured case studies are live, linkable portfolio projects

## Google Search Console — Week 1 (you run)

1. Open [Google Search Console](https://search.google.com/search-console) for both `https://www.launch-nest.com` and apex `https://launch-nest.com` (or domain property covering both).
2. Submit sitemap: `https://www.launch-nest.com/sitemap.xml`
3. **Request indexing** (URL Inspection → Request indexing) for:
   - `/` (home)
   - `/pricing`
   - `/about`
   - `/portfolio`
   - `/contact`
   - `/services` (+ each service slug)
   - each `/work/*` case study
   - each published `/blog/*` post
4. Spot-check live HTML for `<link rel="canonical" href="https://www.launch-nest.com/...">` on those URLs after deploy.
5. Optionally add Bing Webmaster Tools with the same sitemap.

## Pre-launch / growth checklist

- [x] Production domain `https://www.launch-nest.com`
- [x] Absolute self-canonicals + page OG URLs
- [x] Expanded robots.txt (admin/api disallow)
- [x] Keyword-deeper service + audience page copy
- [x] Real live case studies with Visit live site CTAs (no $79 / $9 public floor)
- [ ] Verify Google Search Console + Bing Webmaster Tools
- [ ] Submit `https://www.launch-nest.com/sitemap.xml` in GSC + Bing
- [ ] Confirm money-page titles against live SERP competitors
- [ ] Request indexing on money pages + blog (list above)
- [ ] Track Core Web Vitals in GSC after launch
- [ ] Add permissioned client testimonials to CMS when approved
- [ ] Surface GBP rating on site once you have 10+ Google reviews

---

## Client acquisition ops (90-day)

Ops you run in parallel with the live site — not automatable from this repo.

### Week 1

- [ ] Complete GSC steps above
- [ ] Claim / complete **Google Business Profile**; confirm categories, services, website = `https://www.launch-nest.com`
- [ ] Ask recent clients for Google reviews (target 10+ before showing a rating strip)

### Weeks 2–4

- [ ] Shortlist **40** SaaS/AI companies (US / UK / AU) with weak marketing sites
- [ ] Send **10 personalized outbound messages/week** (opener = free growth audit or $20 intro offer)
- [ ] Submit / claim profiles: Clutch and/or DesignRush + 1–2 SaaS/startup directories
- [ ] Keep homepage featured studies synced to newest **verifiable** live wins

### Weeks 5–12 cadence

| Weeks | Focus |
| --- | --- |
| 5–6 | Convert audits → 1–2 paid projects |
| 7–8 | Publish 1 generalized blog post from each audit; request intro-client testimonial |
| 9–10 | Scale the best outreach angle; swap featured case study to newest live win |
| 11–12 | Offer Care / Growth retainers; ask referral + LinkedIn recommendation |

### Delivery hygiene (ongoing)

- Ask permission; add `Site by LaunchNest — launch-nest.com` on new client builds
- Ask a few past clients for footer credit where appropriate
- Never invent case-study metrics or quotes — live URL is the proof until testimonials are approved
