/** Canonical production hostname (include www). */
export const CANONICAL_HOST = "www.launch-nest.com";

/** Apex domain — redirects to canonical in middleware. */
export const APEX_HOST = "launch-nest.com";

/** Previous Vercel deployment hostname (redirects to canonical in production). */
export const LEGACY_VERCEL_HOST = "launchnest-nine.vercel.app";

export const CANONICAL_URL = `https://${CANONICAL_HOST}`;

/** Origins allowed for Payload CORS/CSRF (canonical + apex + legacy Vercel during cutover). */
export function getAllowedOrigins(): string[] {
  const fromEnv = process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, "");
  const canonical = fromEnv || CANONICAL_URL;
  const origins = new Set<string>([canonical]);

  if (canonical.includes("://www.")) {
    origins.add(canonical.replace("://www.", "://"));
  }

  origins.add(`https://${LEGACY_VERCEL_HOST}`);

  return [...origins];
}
