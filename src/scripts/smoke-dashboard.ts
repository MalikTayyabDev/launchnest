/**
 * End-to-end dashboard smoke test:
 * metrics, media upload, project auto-screenshot, posts, case studies, intro offer, leads.
 *
 * Run: npx payload run src/scripts/smoke-dashboard.ts
 */
import { getPayload } from "payload";
import config from "../payload.config";
import { captureScreenshot } from "../lib/screenshot";

type Check = { name: string; ok: boolean; detail?: string };

const checks: Check[] = [];
const pass = (name: string, detail?: string) =>
  checks.push({ name, ok: true, detail });
const fail = (name: string, detail: string) =>
  checks.push({ name, ok: false, detail });

function print() {
  for (const c of checks) {
    console.log(`${c.ok ? "PASS" : "FAIL"}  ${c.name}${c.detail ? ` — ${c.detail}` : ""}`);
  }
}

async function main() {
  const payload = await getPayload({ config });
  pass("Payload init");

  // --- Screenshot provider (thum.io / ScreenshotOne) ---
  let shot;
  try {
    shot = await captureScreenshot("https://example.com");
    pass(
      "Screenshot capture",
      `${shot.mimetype} ${shot.ext} ${shot.buffer.length} bytes`,
    );
  } catch (err) {
    fail(
      "Screenshot capture",
      err instanceof Error ? err.message : String(err),
    );
    print();
    process.exit(1);
  }

  // --- Media upload (local disk or Blob) ---
  let mediaId: string | number | undefined;
  try {
    const media = await payload.create({
      collection: "media",
      data: { alt: "Smoke test screenshot — example.com" },
      file: {
        data: shot.buffer,
        mimetype: shot.mimetype,
        name: `smoke-example-${Date.now()}.${shot.ext}`,
        size: shot.buffer.length,
      },
      overrideAccess: true,
    });
    mediaId = media.id;
    pass(
      "Media upload",
      `id=${media.id} url=${typeof media.url === "string" ? media.url : "ok"}`,
    );
  } catch (err) {
    fail("Media upload", err instanceof Error ? err.message : String(err));
  }

  // --- Project create with auto-screenshot ---
  let projectId: string | number | undefined;
  try {
    const project = await payload.create({
      collection: "projects",
      data: {
        name: "Smoke Portfolio Example",
        url: "https://example.com",
        platform: "Custom",
        status: "draft",
        showInGrid: false,
        featured: false,
        autoScreenshot: true,
      },
      overrideAccess: true,
    });
    projectId = project.id;
    const hasShot = Boolean(project.screenshot);
    if (hasShot) {
      pass(
        "Project auto-screenshot",
        `id=${project.id} screenshot=${typeof project.screenshot === "object" ? (project.screenshot as { id?: unknown }).id : project.screenshot}`,
      );
    } else {
      fail("Project auto-screenshot", "Project saved but screenshot field empty");
    }
  } catch (err) {
    fail(
      "Project auto-screenshot",
      err instanceof Error ? err.message : String(err),
    );
  }

  // --- Read collections used by MetricsDashboard ---
  try {
    const [leads, posts, cs, projects, intro, users] = await Promise.all([
      payload.count({ collection: "leads" }),
      payload.count({ collection: "posts" }),
      payload.count({ collection: "case-studies" }),
      payload.count({ collection: "projects" }),
      payload.findGlobal({ slug: "intro-offer" }),
      payload.count({ collection: "users" }),
    ]);
    pass(
      "Dashboard collections",
      `leads=${leads.totalDocs} posts=${posts.totalDocs} caseStudies=${cs.totalDocs} projects=${projects.totalDocs} users=${users.totalDocs} introOpen=${Boolean((intro as { open?: boolean }).open)}`,
    );
  } catch (err) {
    fail(
      "Dashboard collections",
      err instanceof Error ? err.message : String(err),
    );
  }

  // --- Case study + post round-trip (keep — used on frontend) ---
  try {
    const list = await payload.find({
      collection: "case-studies",
      limit: 1,
      depth: 0,
    });
    pass("Case studies readable", `sample=${list.docs[0]?.slug ?? "none"}`);
  } catch (err) {
    fail("Case studies readable", err instanceof Error ? err.message : String(err));
  }

  try {
    const list = await payload.find({
      collection: "posts",
      where: { status: { equals: "published" } },
      limit: 1,
      depth: 0,
    });
    pass("Posts readable", `sample=${list.docs[0]?.slug ?? "none"}`);
  } catch (err) {
    fail("Posts readable", err instanceof Error ? err.message : String(err));
  }

  // --- Cleanup smoke records ---
  try {
    if (projectId != null) {
      await payload.delete({
        collection: "projects",
        id: projectId,
        overrideAccess: true,
      });
    }
    if (mediaId != null) {
      await payload.delete({
        collection: "media",
        id: mediaId,
        overrideAccess: true,
      });
    }
    // Also remove any media created by the project hook
    const leftovers = await payload.find({
      collection: "media",
      where: { alt: { contains: "Smoke" } },
      limit: 20,
      overrideAccess: true,
    });
    for (const doc of leftovers.docs) {
      await payload.delete({
        collection: "media",
        id: doc.id,
        overrideAccess: true,
      });
    }
    const leftoverProjects = await payload.find({
      collection: "projects",
      where: { name: { equals: "Smoke Portfolio Example" } },
      limit: 10,
      overrideAccess: true,
    });
    for (const doc of leftoverProjects.docs) {
      await payload.delete({
        collection: "projects",
        id: doc.id,
        overrideAccess: true,
      });
    }
    pass("Cleanup smoke records");
  } catch (err) {
    fail("Cleanup", err instanceof Error ? err.message : String(err));
  }

  print();
  if (checks.some((c) => !c.ok)) process.exit(1);
}

await main();
