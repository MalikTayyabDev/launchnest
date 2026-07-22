import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section, Eyebrow } from "@/components/Section";
import { CTASection } from "@/components/CTASection";
import { PostBody } from "@/components/PostBody";
import { JsonLd } from "@/components/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/seo";
import { getPost, getPostSlugs } from "@/lib/content";

export const revalidate = 60;

export async function generateStaticParams() {
  return (await getPostSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd data={articleSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <Section tone="offwhite">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-slate transition-colors hover:text-navy"
          >
            <span aria-hidden="true">←</span> All posts
          </Link>
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-slate">
            <span className="text-gold">{post.category}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
            <span aria-hidden="true">·</span>
            <span>{formatDate(post.date)}</span>
          </div>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-tight tracking-tight text-navy sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate">{post.excerpt}</p>
        </div>
      </Section>

      <Section tone="white">
        <article className="mx-auto max-w-3xl">
          <PostBody richText={post.richText} paragraphs={post.paragraphs} />

          <div className="mt-12 flex items-center gap-3 border-t border-navy/10 pt-8">
            <Eyebrow>Written by</Eyebrow>
            <span className="font-heading text-sm font-semibold text-navy">
              {post.author}
            </span>
          </div>
        </article>
      </Section>

      <CTASection
        heading="Think this applies to your site? Let's check."
        body="Book a free growth audit and we'll tell you whether it does — with specifics."
        cta={{ label: "Book a Free Growth Audit", href: "/contact" }}
        secondaryCta={{ label: "Read more", href: "/blog" }}
      />
    </>
  );
}
