import { ImageResponse } from "next/og";
import { getCaseStudy } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "LaunchNest case study";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  const client = study?.client ?? "LaunchNest";
  const headline = study?.headlineResult ?? "Case study";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B1F3A",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#D4A62A",
            fontSize: "28px",
            fontWeight: 700,
            letterSpacing: "0.12em",
          }}
        >
          LAUNCHNEST
          <span style={{ color: "#94A3B8", fontWeight: 400 }}>· CASE STUDY</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", color: "#F4F4F0", fontSize: "40px", fontWeight: 600 }}>
            {client}
          </div>
          <div
            style={{
              display: "flex",
              color: "#F4F4F0",
              fontSize: "60px",
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            {headline}
          </div>
        </div>
        <div style={{ display: "flex", color: "#94A3B8", fontSize: "26px" }}>
          launchnest.co
        </div>
      </div>
    ),
    { ...size }
  );
}
