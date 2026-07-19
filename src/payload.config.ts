import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { resendAdapter } from "@payloadcms/email-resend";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Posts } from "./collections/Posts";
import { CaseStudies } from "./collections/CaseStudies";
import { Projects } from "./collections/Projects";
import { Leads } from "./collections/Leads";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

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
  editor: lexicalEditor(),
  // Transactional email via Resend. When RESEND_API_KEY is unset, Payload falls
  // back to logging emails to the console (safe no-op for local dev).
  email: process.env.RESEND_API_KEY
    ? resendAdapter({
        defaultFromAddress: process.env.EMAIL_FROM || "onboarding@resend.dev",
        defaultFromName: "LaunchNest",
        apiKey: process.env.RESEND_API_KEY,
      })
    : undefined,
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  // Locks API/admin origins in production; prevents cross-site abuse.
  cors: process.env.NEXT_PUBLIC_SERVER_URL ? [process.env.NEXT_PUBLIC_SERVER_URL] : [],
  csrf: process.env.NEXT_PUBLIC_SERVER_URL ? [process.env.NEXT_PUBLIC_SERVER_URL] : [],
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
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],
});
