/**
 * Domains / case-study slugs allowed as public, zero-friction live proof.
 * Everything else stays contact-gated (client confidentiality).
 * Re-audit Update 2 — P1: keep 2–3 click-through examples.
 */
export const PUBLIC_PROOF_DOMAINS = [
  "wiz.ai",
  "clearmatrix.io",
  "algorithmicsoftware.co.uk",
] as const;

export const PUBLIC_PROOF_CASE_SLUGS = [
  "wiz-ai-product-site",
  "clearmatrix-custom-platform",
  "algorithmicsoftware-uk-commerce",
] as const;

function normalizeHost(input: string): string {
  try {
    const host = input.includes("://")
      ? new URL(input).hostname
      : input.replace(/^www\./i, "");
    return host.replace(/^www\./i, "").toLowerCase();
  } catch {
    return input.replace(/^www\./i, "").toLowerCase();
  }
}

export function isPublicProofDomain(domainOrUrl: string | null | undefined): boolean {
  if (!domainOrUrl) return false;
  const host = normalizeHost(domainOrUrl);
  return PUBLIC_PROOF_DOMAINS.some(
    (d) => host === d || host.endsWith(`.${d}`),
  );
}

export function isPublicProofCaseSlug(slug: string | null | undefined): boolean {
  if (!slug) return false;
  return (PUBLIC_PROOF_CASE_SLUGS as readonly string[]).includes(slug);
}
