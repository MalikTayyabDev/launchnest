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

## Brand / entity clarity (organic + AI Overviews)

Google and AI Overviews confuse LaunchNest with other “Launch Nest” brands
(`.net`, `.io`, `.com.au`, `.dev`, `.co.uk`). On-site entity fingerprint:

- Homepage / default titles include **LaunchNest (launch-nest.com)**
- `siteConfig.description` names the domain in the first sentence
- JSON-LD `ProfessionalService` + `Organization` with `alternateName`, `knowsAbout`, and `sameAs` (IG, FB, Clutch, GBP)

### Commercial keyword priorities (page-1 path)

Do **not** expect overnight page-1 for bare “web developer” / “graphic designer”
(hyper-competitive). Win these first, then broaden:

| Priority | Target queries | Primary URL |
| --- | --- | --- |
| P0 brand | LaunchNest, launch-nest, launch-nest.com | `/` |
| P1 | SaaS website development, startup web development | `/services/website-design-dev` |
| P1 | SaaS website cost / agency pricing | `/pricing` |
| P1 | brand identity for startups, graphic design for startups | `/services/graphic-design` |
| P1 | SaaS UI UX design | `/services/ui-ux-design` |
| P1 | technical SEO agency | `/services/seo` |
| P2 | AI automation for SaaS | `/services/ai-automation` |
| P2 | website maintenance retainer | `/services/maintenance-support` |

**Authority still required for competitive service SERPs:** GBP reviews, Clutch/DesignRush,
client footer credits, and weekly outbound. On-page alone will not outrank aged agencies
for generic “web developer” nationwide.

## Brand note

Other companies use “LaunchNest” / “Launch Nest” on different domains (e.g. `.com.au`, `.net`, `.io`).
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
- [x] Public-proof live URLs (WIZ.AI, Clearmatrix, Algorithmicsoftware) are click-through; rest gated
- [x] Intro-offer slot counter auto-increments on claim (Admin → Intro Offer)

## Re-audit Update 2 — P0: diagnose zero brand search (you run)

On-page SEO is ready. Google still not showing `launch-nest.com` for its own name is an **indexing / GSC / authority** problem, not a content rewrite.

### Step A — Confirm Search Console is actually verified

1. Open [Google Search Console](https://search.google.com/search-console).
2. Prefer a **Domain** property for `launch-nest.com` (covers www + apex), **or** verify both URL-prefix properties:
   - `https://www.launch-nest.com`
   - `https://launch-nest.com`
3. Confirm ownership shows **Verified** (DNS / HTML — not “pending”).
4. Confirm live redirects: `http://` and apex → `https://www.launch-nest.com` (308).

### Step B — Read Coverage / Pages (Indexing)

For the homepage and money URLs, note which state applies:

| GSC state | What it means | What to do |
| --- | --- | --- |
| Submitted and indexed | Crawl OK; brand ranking is authority | Directories, GBP, footer credits, outbound |
| Discovered — currently not indexed | Known but not chosen yet | Request indexing; improve internal links; wait |
| Crawled — currently not indexed | Seen but not kept | Check soft-404, thin/duplicate; Request indexing again |
| **Page with redirect** | URL is a redirect, not a destination | **Expected** for `http://` and apex → `https://www…`. Do not “fix” those; validate and leave them. Only the www HTTPS URL should be indexed. |
| URL is not on Google | Not in index | Submit sitemap + Request indexing |

**Retired /work URLs:** Fictional case studies (`brightpath`, `meridian`, `northform`, `cadence`, `harbour`) permanently redirect to `/portfolio` so GSC stops treating them as indexable pages. In Admin, unpublish any leftover CMS docs with those slugs.

### After a “Page with redirect” or “Discovered” fix

1. Deploy redirects (done in repo).
2. In GSC → Pages → open the issue → **Validate fix**.
3. URL Inspection on `https://www.launch-nest.com/` → **Request indexing** (the only homepage that should rank).
4. Do **not** request indexing on `http://www…` or `https://launch-nest.com/` — those should keep redirecting.

### Step C — Sitemap + Request indexing

1. Submit / resubmit: `https://www.launch-nest.com/sitemap.xml`
2. URL Inspection → **Request indexing** on: `/`, `/pricing`, `/about`, `/portfolio`, `/contact`, `/services`, each `/work/*`, each published `/blog/*`
3. Bing: verify (BingSiteAuth.xml) + same sitemap

### Step D — Google Business Profile (fastest brand surface)

1. Claim / verify GBP; website = `https://www.launch-nest.com`
2. Categories + services complete; hours accurate
3. Ask for reviews (target **10+** before showing a rating strip on-site)

## Google Search Console — Week 1 checklist

1. Open GSC for www + apex (or Domain property) — **must be Verified**
2. Submit sitemap: `https://www.launch-nest.com/sitemap.xml`
3. **Request indexing** (URL Inspection) for money pages + blog (list in Step C)
4. Spot-check live HTML for `<link rel="canonical" href="https://www.launch-nest.com/...">`
5. Bing Webmaster Tools with the same sitemap

## Pre-launch / growth checklist

- [x] Production domain `https://www.launch-nest.com`
- [x] Absolute self-canonicals + page OG URLs
- [x] Expanded robots.txt (admin/api disallow)
- [x] Keyword-deeper service + audience page copy
- [x] Real live case studies; 3 public Visit live site CTAs; rest gated
- [x] Pricing floor raised (no $79 / $9); typical anchors
- [x] Intro-offer counter CMS-driven + auto-increment on claim
- [ ] Verify Google Search Console + Bing Webmaster Tools (P0)
- [ ] Diagnose GSC indexing state for homepage (table above)
- [ ] Submit / resubmit sitemap + Request indexing
- [x] Google Business Profile URL wired (footer + JSON-LD)
- [ ] Confirm GBP verified/complete in Google Business Manager
- [ ] Claim / complete Google Business Profile (P0) — listing linked; finish verification if pending
- [ ] Confirm money-page titles against live SERP competitors
- [ ] Track Core Web Vitals in GSC after launch
- [ ] Add permissioned client testimonials to CMS when approved
- [ ] Surface GBP rating on site once you have 10+ Google reviews
- [ ] Directory profiles: Clutch and/or DesignRush + 1–2 startup directories (P2)
- [ ] Footer credits on new client builds: `Site by LaunchNest — launch-nest.com` (P2)

---

## Client acquisition ops (90-day)

Ops you run in parallel with the live site — not automatable from this repo.

### Week 1 (do before more on-page work)

- [ ] Complete **Re-audit Update 2 — P0** GSC diagnose steps (A–D) above
- [x] Google Business Profile linked on site (`siteConfig.googleBusiness` + schema `sameAs`)
- [ ] Confirm GBP is **claimed, verified, complete** (categories, services, website = `https://www.launch-nest.com`)
- [ ] Ask recent clients for Google reviews (target 10+ before showing a rating strip)
- [ ] In Admin → **Intro Offer**: set `slotsUsed` to the real booked count if the public counter looks wrong

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
- Public-proof allowlist lives in `src/lib/public-proof.ts` (add domains only with client OK)