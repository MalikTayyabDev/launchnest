import { getPayload } from "payload";
import configPromise from "@payload-config";

/**
 * First-party metrics panel shown above the admin dashboard.
 * Counts and recent leads only - no third-party analytics required.
 * Renders at request time (admin is dynamic), so it needs no DB at build.
 */
export async function MetricsDashboard() {
  let leads = 0;
  let recentLeads = 0;
  let posts = 0;
  let publishedPosts = 0;
  let caseStudies = 0;
  let publishedCaseStudies = 0;
  let recent: { id: string | number; name?: string; company?: string; email?: string; createdAt: string }[] = [];

  try {
    const payload = await getPayload({ config: configPromise });
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

    const [
      leadsTotal,
      leads30,
      postsTotal,
      postsPub,
      csTotal,
      csPub,
      recentLeadsRes,
    ] = await Promise.all([
      payload.count({ collection: "leads" }),
      payload.count({ collection: "leads", where: { createdAt: { greater_than: thirtyDaysAgo } } }),
      payload.count({ collection: "posts" }),
      payload.count({ collection: "posts", where: { status: { equals: "published" } } }),
      payload.count({ collection: "case-studies" }),
      payload.count({ collection: "case-studies", where: { status: { equals: "published" } } }),
      payload.find({ collection: "leads", limit: 5, sort: "-createdAt", depth: 0 }),
    ]);

    leads = leadsTotal.totalDocs;
    recentLeads = leads30.totalDocs;
    posts = postsTotal.totalDocs;
    publishedPosts = postsPub.totalDocs;
    caseStudies = csTotal.totalDocs;
    publishedCaseStudies = csPub.totalDocs;
    recent = recentLeadsRes.docs as typeof recent;
  } catch {
    // DB not reachable yet (e.g. before first migration) - render zeros.
  }

  const cardStyle: React.CSSProperties = {
    border: "1px solid var(--theme-elevation-100)",
    borderRadius: "6px",
    padding: "1.25rem 1.5rem",
    background: "var(--theme-elevation-50)",
  };
  const valueStyle: React.CSSProperties = {
    fontSize: "2rem",
    fontWeight: 700,
    lineHeight: 1.1,
    fontFamily: "var(--font-mono, monospace)",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: "0.75rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    opacity: 0.7,
    marginTop: "0.35rem",
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>Overview</h2>
      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        }}
      >
        <div style={cardStyle}>
          <div style={valueStyle}>{leads}</div>
          <div style={labelStyle}>Total leads</div>
        </div>
        <div style={cardStyle}>
          <div style={valueStyle}>{recentLeads}</div>
          <div style={labelStyle}>Leads last 30 days</div>
        </div>
        <div style={cardStyle}>
          <div style={valueStyle}>
            {publishedPosts}
            <span style={{ fontSize: "1rem", opacity: 0.5 }}> / {posts}</span>
          </div>
          <div style={labelStyle}>Posts published / total</div>
        </div>
        <div style={cardStyle}>
          <div style={valueStyle}>
            {publishedCaseStudies}
            <span style={{ fontSize: "1rem", opacity: 0.5 }}> / {caseStudies}</span>
          </div>
          <div style={labelStyle}>Case studies published / total</div>
        </div>
      </div>

      {recent.length > 0 && (
        <div style={{ ...cardStyle, marginTop: "1rem" }}>
          <div style={{ ...labelStyle, marginBottom: "0.75rem" }}>Recent submissions</div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
            <thead>
              <tr style={{ textAlign: "left", opacity: 0.6 }}>
                <th style={{ padding: "0.35rem 0" }}>Name</th>
                <th style={{ padding: "0.35rem 0" }}>Company</th>
                <th style={{ padding: "0.35rem 0" }}>Email</th>
                <th style={{ padding: "0.35rem 0" }}>Received</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((lead) => (
                <tr key={lead.id} style={{ borderTop: "1px solid var(--theme-elevation-100)" }}>
                  <td style={{ padding: "0.4rem 0" }}>{lead.name}</td>
                  <td style={{ padding: "0.4rem 0" }}>{lead.company}</td>
                  <td style={{ padding: "0.4rem 0" }}>{lead.email}</td>
                  <td style={{ padding: "0.4rem 0" }}>
                    {new Date(lead.createdAt).toLocaleDateString("en-US")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
