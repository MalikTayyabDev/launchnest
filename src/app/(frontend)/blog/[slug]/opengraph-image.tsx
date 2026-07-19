import { ImageResponse } from "next/og";
import { getPost } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "LaunchNest article";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  const title = post?.title ?? "LaunchNest";
  const category = post?.category ?? "Blog";

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
          <span style={{ color: "#94A3B8", fontWeight: 400 }}>
            · {category.toUpperCase()}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            color: "#F4F4F0",
            fontSize: "64px",
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", color: "#94A3B8", fontSize: "26px" }}>
          launchnest.co
        </div>
      </div>
    ),
    { ...size }
  );
}
