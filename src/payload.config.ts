import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Posts } from "./collections/Posts";
import { CaseStudies } from "./collections/CaseStudies";
import { Projects } from "./collections/Projects";
import { Leads } from "./collections/Leads";
import { IntroOffer } from "./globals/IntroOffer";
import { getAllowedOrigins } from "./lib/site-origins";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const smtpHost = process.env.SMTP_HOST?.trim();
const smtpUser = process.env.SMTP_USER?.trim();
const smtpPass = process.env.SMTP_PASS?.trim();
const smtpConfigured = Boolean(smtpHost && smtpUser && smtpPass);

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " — LaunchNest Admin",
    },
    components: {
      // First-party metrics panel above the default dashboard (Phase 4).
      beforeDashboard: ["@/components/admin/MetricsDashboard#MetricsDashboard"],
    },
  },
  collections: [Posts, CaseStudies, Projects, Media, Leads, Users],
  globals: [IntroOffer],
  editor: lexicalEditor(),
  // Business webmail via SMTP (solutions@launch-nest.com). When SMTP_* is unset,
  // Payload skips the adapter and logs outbound mail attempts (safe for local dev).
  email: smtpConfigured
    ? nodemailerAdapter({
        defaultFromAddress:
          process.env.EMAIL_FROM || "solutions@launch-nest.com",
        defaultFromName: process.env.EMAIL_FROM_NAME || "LaunchNest",
        transportOptions: {
          host: smtpHost,
          port: Number(process.env.SMTP_PORT || 465),
          secure: process.env.SMTP_SECURE !== "false",
          auth: {
            user: smtpUser!,
            pass: smtpPass!,
          },
        },
      })
    : undefined,
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  // Locks API/admin origins in production; prevents cross-site abuse.
  cors: getAllowedOrigins(),
  csrf: getAllowedOrigins(),
  db: postgresAdapter({
    // Pool tuned for Neon's pooled endpoint: cap concurrent connections and
    // proactively close idle ones before Neon's PgBouncer drops them, which
    // avoids the "Reconnecting to postgres" churn and its added latency.
    pool: {
      connectionString: process.env.DATABASE_URL || "",
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      // Required on Vercel — without a token, uploads fail (ephemeral filesystem).
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      // Keep prefix fields in schema even when token is missing locally.
      alwaysInsertFields: true,
      collections: {
        media: {
          // Serve public CDN URLs on read so the frontend never depends on
          // /api/media/file proxy working for next/image.
          disablePayloadAccessControl: true,
        },
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
      // Bypass Vercel’s ~4.5MB serverless body limit for admin uploads.
      clientUploads: true,
      // Avoid name collisions when re-uploading the same filename.
      addRandomSuffix: true,
    }),
  ],
});
