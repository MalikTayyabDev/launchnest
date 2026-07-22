import type { Metadata } from "next";
import Link from "next/link";
import { Section, Eyebrow } from "@/components/Section";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { getAllPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Specific, practical writing on web performance, technical SEO, and maintenance — no vague thought-leadership.",
  alternates: { canonical: "/blog" },
};

// Revalidate periodically so CMS edits appear without a redeploy.
export const revalidate = 60;

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
      <Section tone="offwhite">
        <div className="max-w-3xl">
          <Eyebrow>Blog</Eyebrow>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Specific fixes, not thought leadership.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate">
            Practical writing on performance, SEO, and maintenance — the kind of thing
            we&apos;d actually tell a client on a call.
          </p>
        </div>
      </Section>

      <Section tone="white">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 0.08}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-lg border border-navy/10 bg-white p-7 transition-all duration-200 hover:border-gold/50 hover:shadow-[0_12px_40px_-16px_rgba(11,31,58,0.25)]"
              >
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
                <p className="mt-6 font-mono text-xs text-slate">{formatDate(post.date)}</p>
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
