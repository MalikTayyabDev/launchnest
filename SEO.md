# LaunchNest — SEO & Keyword Map

Working target-keyword map for the UK (GB), US, and Australia (AU). Refine the
exact phrases in Google Search Console + a keyword tool before committing to them.
Priorities: (P1) commercial-intent money pages, (P2) supporting/service pages,
(P3) informational blog posts that feed the money pages.

## Global on-page setup (done)

- `metadataBase`, per-page `title`/`description`, and `alternates.canonical` on every page.
- Structured data (JSON-LD): `ProfessionalService` + `WebSite` site-wide, `Service`
  on service pages, `Article` on posts, `BreadcrumbList` on nested pages. `areaServed`
  is set to `GB`, `US`, `AU`.
- `sitemap.xml` (pulls slugs from the CMS) and `robots.txt`.
- Per-page Open Graph images for blog posts and case studies.

## Page → keyword mapping

| Page | Priority | Primary keyword | Secondary / long-tail |
| --- | --- | --- | --- |
| `/` Home | P1 | technical web agency | premium web development partner, website that performs |
| `/services` | P1 | web design and development services | build optimize maintain website |
| `/services/website-design-dev` | P1 | website design and development agency | custom website development, WordPress/Shopify/Webflow build |
| `/services/*` (perf) | P1 | website performance optimization agency | Core Web Vitals optimization, Shopify speed optimization |
| `/services/*` (SEO) | P1 | technical SEO agency | technical SEO services, site speed SEO |
| `/services/*` (maintenance) | P1 | website maintenance plans | website care plan, ongoing website support |
| `/pricing` | P1 | website maintenance pricing | website development cost, maintenance plan pricing |
| `/work` | P2 | web development case studies | Shopify/Webflow project results |
| `/about` | P3 | technical web partner | reliable web agency |
| `/contact` | P2 | free website technical audit | website audit, site speed audit |

## Blog topics (P3, informational → money pages)

Existing/seeded:
- "Why your checkout is slow" → feeds performance + Shopify services.
- "The Core Web Vitals that actually matter" → feeds performance + technical SEO.
- "What website maintenance actually means" → feeds maintenance plans.

Suggested next posts (map each to a service):
- "Shopify speed optimization: a practical checklist" → performance service.
- "How much should a website cost in 2026 (UK/US/AU)" → pricing page.
- "Webflow vs WordPress for a growing business" → website design & dev service.
- "A website maintenance plan that's actually worth paying for" → maintenance.

## Multi-country strategy (deferred — do after domain + GSC)

- Start with a single global site + `areaServed` GB/US/AU (current state).
- Once GSC shows country demand, consider country landing pages
  (`/uk`, `/us`, `/au`) or subfolders with `hreflang` `en-GB` / `en-US` / `en-AU`.
- Add localized proof (currencies, timezones, client logos per region) before
  splitting content, to avoid thin duplicate pages.

## Pre-launch checklist

- [ ] Set the real production domain in `NEXT_PUBLIC_SERVER_URL` and `siteConfig.url`.
- [ ] Verify the property in Google Search Console + Bing Webmaster Tools.
- [ ] Submit `sitemap.xml`.
- [ ] Confirm each money page's title/description against live SERP competitors.
- [ ] Add real client logos + testimonials (trust signals).
- [ ] Track Core Web Vitals in GSC after launch.
