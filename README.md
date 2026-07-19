# LaunchNest

Marketing website for **LaunchNest** — the technical web partner growing businesses call when their website has to actually perform.

Built as proof of the brand's own claims: fast, accessible, and maintainable. Includes a secure, WordPress-like admin (Payload CMS) for managing blog posts, portfolio/case studies, and first-party lead metrics.

## Tech stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Payload CMS 3** embedded in Next.js (admin at `/admin`, REST/GraphQL at `/api`)
- **Neon Postgres** via `@payloadcms/db-postgres`
- **Vercel Blob** for media storage (`@payloadcms/storage-vercel-blob`)
- **Tailwind CSS** with the brand design tokens wired into `tailwind.config.ts`
- **Framer Motion** for restrained scroll/entrance animations
- **next/font** for self-hosted fonts (no FOUT)
- Deploy target: **Vercel**

> The project is an ESM package (`"type": "module"`). Payload's CLI on Node 22
> is run through the provided npm scripts.

## Design tokens

Colors are defined as CSS variables in `src/app/globals.css` and mapped in `tailwind.config.ts`:

| Token       | Hex       | Usage                                                        |
| ----------- | --------- | ----------------------------------------------------------- |
| `navy`      | `#0B1F3A` | Primary — headers, backgrounds, authority                   |
| `gold`      | `#C9A227` | Accent/CTAs **only** — keep under 10% of any layout         |
| `slate`     | `#4A5568` | Body text, secondary UI                                     |
| `offwhite`  | `#F4F5F7` | Section backgrounds, breathing room                         |
| `confirm`   | `#1E8E5A` | Success/status states only                                  |

Fonts (via `next/font`, exposed as CSS variables and Tailwind families):

- **Headings:** Space Grotesk → `font-heading`
- **Body:** Inter → `font-body`
- **Accent/mono:** JetBrains Mono → `font-mono`

## Getting started

```bash
npm install --legacy-peer-deps
cp .env.example .env   # then fill in the values (see below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the site and
[http://localhost:3000/admin](http://localhost:3000/admin) for the CMS.

> The public site renders even without a database: content falls back to the
> bundled seed data in `src/lib/blog.ts` and `src/lib/work.ts`. The admin and
> lead capture require a real `DATABASE_URL`.

## Environment variables

See `.env.example`. Required for the CMS/admin:

| Variable                | Purpose                                                        |
| ----------------------- | ------------------------------------------------------------- |
| `PAYLOAD_SECRET`        | Signs auth tokens. Generate with `openssl rand -hex 32`.       |
| `DATABASE_URL`          | Postgres connection string (Neon recommended, `sslmode=require`). |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token for media uploads (production).             |
| `NEXT_PUBLIC_SERVER_URL`| Canonical site URL — used for CORS/CSRF and SEO.              |
| `CRM_WEBHOOK_URL`       | Optional. Also forward leads to an external CRM.              |

## Database setup (Neon)

1. Create a Postgres database at [neon.tech](https://neon.tech) and copy the
   connection string into `DATABASE_URL` (include `?sslmode=require`).
2. Create the schema. In development the Postgres adapter auto-syncs the schema
   on first run. For production, generate and run migrations:

   ```bash
   npm run migrate:create   # generate a migration from the schema
   npm run migrate          # apply migrations
   ```

3. Seed the initial admin user + migrate the bundled content into the CMS:

   ```bash
   # optionally set SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD first
   npm run seed
   ```

   This is idempotent — it skips anything that already exists.

## Media storage (Vercel Blob)

Vercel's filesystem is ephemeral, so uploaded media must go to Blob storage.
Create a Blob store in the Vercel dashboard (**Storage → Blob**) and set
`BLOB_READ_WRITE_TOKEN`. Locally you can leave it blank to use the disk.

## Admin & security

- Admin panel: `/admin` (Payload). First user is created by the seed script.
- Roles: `admin` (full access, user management) and `editor` (content only).
- Auth hardening: bcrypt password hashing, httpOnly cookies, brute-force
  lockout (`maxLoginAttempts` + `lockTime`), and per-collection access control.
- Leads are public-create but admin-read only, so submissions never leak.
- Security headers + a Content-Security-Policy (public routes) are set in
  `next.config.mjs`. CORS/CSRF origins lock to `NEXT_PUBLIC_SERVER_URL`.

## Scripts

- `npm run dev` — start the dev server (site + admin)
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint
- `npm run seed` — create the admin user and migrate seed content into the CMS
- `npm run generate:types` — regenerate `src/payload-types.ts`
- `npm run generate:importmap` — regenerate the admin import map (after adding
  custom admin components)

## Content model

Managed in the CMS (`src/collections/`):

- **Posts** — blog posts (rich text, SEO fields, draft/published status)
- **Case Studies** — portfolio (industry, results, quote, SEO, status)
- **Media** — image uploads (→ Vercel Blob)
- **Leads** — contact + newsletter submissions (admin-only)
- **Users** — admin/editor accounts

Public pages read via the Payload Local API (`src/lib/content.ts`) with ISR
(`revalidate = 60`) and fall back to the seed data when the DB is unreachable.
`services` and `pricing` remain code-defined in `src/lib/*`.

## SEO

- Per-page metadata + canonical URLs; JSON-LD (`ProfessionalService`, `WebSite`,
  `Service`, `Article`, `BreadcrumbList`, `FAQPage`) with `areaServed` GB/US/AU.
- Dynamic Open Graph images for posts and case studies.
- `sitemap.xml` (CMS-driven) and `robots.txt`.
- See `SEO.md` for the target-keyword map and pre-launch checklist.

## Project structure

```
src/
  app/
    (frontend)/   # Public marketing site (own root layout + Header/Footer)
    (payload)/    # Payload admin UI + REST/GraphQL API
    api/contact/  # Lead intake (writes to the Leads collection)
    sitemap.ts, robots.ts, icon.png, globals.css, fonts.ts
  collections/    # Payload collections (Users, Media, Posts, CaseStudies, Leads)
  components/     # Reusable UI (+ components/admin for the metrics dashboard)
  access/         # Reusable access-control helpers
  fields/         # Reusable field configs (slug, seo)
  lib/            # Site config, services, pricing, seed data, content layer, seo
  seed/           # One-time content + admin seed script
  payload.config.ts
```

## Voice

Direct, calm, specific. Specific numbers, specific causes, specific fixes — no vague
superlatives. CTAs are always a specific action ("Book a Free Technical Audit"), never a
bare "Contact Us".
```
