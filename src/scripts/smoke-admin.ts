/**
 * Smoke-test Payload admin data layer (MetricsDashboard queries + key collections).
 * Run: npx payload run src/scripts/smoke-admin.ts
 */
import { getPayload } from "payload";
import config from "../payload.config";

type Check = { name: string; ok: boolean; detail?: string };

async function main() {
  const checks: Check[] = [];
  const fail = (name: string, detail: string) => checks.push({ name, ok: false, detail });
  const pass = (name: string, detail?: string) => checks.push({ name, ok: true, detail });

  let payload;
  try {
    payload = await getPayload({ config });
    pass("Payload init", "connected");
  } catch (err) {
    fail("Payload init", err instanceof Error ? err.message : String(err));
    print(checks);
    process.exit(1);
  }

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  try {
    const [
      leadsTotal,
      leads30,
      postsTotal,
      postsPub,
      csTotal,
      csPub,
      projects,
      recentLeads,
      introOffer,
      users,
    ] = await Promise.all([
      payload.count({ collection: "leads" }),
      payload.count({
        collection: "leads",
        where: { createdAt: { greater_than: thirtyDaysAgo } },
      }),
      payload.count({ collection: "posts" }),
      payload.count({
        collection: "posts",
        where: { status: { equals: "published" } },
      }),
      payload.count({ collection: "case-studies" }),
      payload.count({
        collection: "case-studies",
        where: { status: { equals: "published" } },
      }),
      payload.count({ collection: "projects" }),
      payload.find({ collection: "leads", limit: 5, sort: "-createdAt", depth: 0 }),
      payload.findGlobal({ slug: "intro-offer" }),
      payload.count({ collection: "users" }),
    ]);

    pass(
      "MetricsDashboard queries",
      `leads=${leadsTotal.totalDocs} (30d=${leads30.totalDocs}), posts=${postsPub.totalDocs}/${postsTotal.totalDocs}, caseStudies=${csPub.totalDocs}/${csTotal.totalDocs}, recent=${recentLeads.docs.length}`,
    );
    pass("Projects collection", `count=${projects.totalDocs}`);
    pass(
      "Intro Offer global",
      `open=${Boolean((introOffer as { open?: boolean }).open)} slotsUsed=${(introOffer as { slotsUsed?: number }).slotsUsed ?? "n/a"}`,
    );
    pass("Users collection", `count=${users.totalDocs}`);

    // Round-trip: create + delete a handled smoke lead (cleanup).
    const smokeEmail = `smoke-admin+${Date.now()}@launchnest.tech`;
    const created = await payload.create({
      collection: "leads",
      data: {
        name: "Smoke Test",
        company: "LaunchNest Smoke",
        email: smokeEmail,
        source: "smoke-admin",
        message: "Automated admin smoke test — safe to delete.",
        handled: true,
      },
      overrideAccess: true,
    });
    pass("Lead create", `id=${created.id}`);

    await payload.delete({
      collection: "leads",
      id: created.id,
      overrideAccess: true,
    });
    pass("Lead delete", `cleaned ${created.id}`);
  } catch (err) {
    fail("Collection smoke", err instanceof Error ? err.message : String(err));
  }

  print(checks);
  if (checks.some((c) => !c.ok)) process.exit(1);
}

function print(checks: Check[]) {
  for (const c of checks) {
    console.log(`${c.ok ? "PASS" : "FAIL"}  ${c.name}${c.detail ? ` — ${c.detail}` : ""}`);
  }
}

await main();
