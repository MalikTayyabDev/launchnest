import type { Metadata } from "next";
import Link from "next/link";
import { Section, Eyebrow } from "@/components/Section";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { PostCoverImage } from "@/components/PostBody";
import { getAllPosts } from "@/lib/content";
import { breadcrumbSchema, selfCanonical } from "@/lib/seo";

const seo = selfCanonical("/blog");

export const metadata: Metadata = {
  title: "SaaS Growth, Performance & Technical SEO Blog",
  description:
    "Practical articles on SaaS website development, UI/UX, brand identity, AI automation, Core Web Vitals, and maintenance — written for founders and operators.",
  alternates: { canonical: seo.canonical },
  openGraph: {
    ...seo.openGraph,
    title: "SaaS Growth, Performance & Technical SEO Blog | LaunchNest",
    description:
      "Practical articles on SaaS sites, UI/UX, branding, AI automation, Core Web Vitals, and maintenance.",
  },
};

export const revalidate = 10;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getAllPosts();
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <Section tone="offwhite">
        <div className="max-w-3xl">
          <Eyebrow>Blog</Eyebrow>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Specific fixes, not thought leadership.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate">
            Practical writing on SaaS websites, UI/UX, branding, AI automation,
            performance, SEO, and maintenance — the kind of thing we&apos;d
            actually tell a client on a call.
          </p>
        </div>
      </Section>

      <Section tone="white">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.08}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-navy/10 bg-white transition-all duration-200 hover:border-gold/50 hover:shadow-[0_12px_40px_-16px_rgba(11,31,58,0.25)]"
              >
                {post.coverImage?.url ? (
                  <PostCoverImage
                    src={post.coverImage.url}
                    alt={post.coverImage.alt || post.title}
                    className="border-b border-navy/5"
                  />
                ) : null}
                <div className="flex flex-1 flex-col p-7">
                  <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-slate">
                    <span className="text-gold">{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h2 className="mt-4 font-heading text-xl font-semibold leading-snug text-navy transition-colors group-hover:text-gold">
                    {post.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">
                    {post.excerpt}
                  </p>
                  <p className="mt-6 font-mono text-xs text-slate">
                    {formatDate(post.date)}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        heading="Rather we just look at your site directly?"
        body="Skip the reading. Book a free growth audit and we'll tell you what's specific to you."
        cta={{ label: "Book a Free Growth Audit", href: "/contact" }}
      />
    </>
  );
}
