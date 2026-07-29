import Image from "next/image";
import Link from "next/link";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { BlogSection } from "@/lib/blog";
import type { LexicalContent } from "@/lib/content";
import { services } from "@/lib/services";

type PostBodyProps = {
  richText?: LexicalContent | null;
  /** Legacy flat paragraphs (older seed shape). */
  paragraphs?: string[];
  intro?: string[];
  sections?: BlogSection[];
  conclusion?: string[];
  relatedService?: string;
};

/**
 * Renders a blog post body from Lexical (CMS) or structured seed sections.
 */
export function PostBody({
  richText,
  paragraphs,
  intro,
  sections,
  conclusion,
  relatedService,
}: PostBodyProps) {
  if (richText) {
    return (
      <div className="richtext">
        <RichText data={richText as never} />
        {relatedService ? <RelatedServiceLink slug={relatedService} /> : null}
      </div>
    );
  }

  if (sections && sections.length > 0) {
    return (
      <div className="richtext">
        {intro?.map((p, i) => (
          <p key={`intro-${i}`}>{p}</p>
        ))}
        {sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((p, i) => (
              <p key={`${section.heading}-p-${i}`}>{p}</p>
            ))}
            {section.bullets && section.bullets.length > 0 ? (
              <ul>
                {section.bullets.map((b, i) => (
                  <li key={`${section.heading}-b-${i}`}>{b}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
        {conclusion?.map((p, i) => (
          <p key={`conclusion-${i}`}>{p}</p>
        ))}
        {relatedService ? <RelatedServiceLink slug={relatedService} /> : null}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {paragraphs?.map((para) => (
        <p key={para.slice(0, 40)} className="text-lg leading-relaxed text-slate">
          {para}
        </p>
      ))}
      {relatedService ? <RelatedServiceLink slug={relatedService} /> : null}
    </div>
  );
}

function RelatedServiceLink({ slug }: { slug: string }) {
  const service = services.find((s) => s.slug === slug);
  if (!service) return null;
  return (
    <p className="mt-10 rounded-lg border border-navy/10 bg-offwhite p-5 text-base leading-relaxed text-slate">
      Related service:{" "}
      <Link
        href={`/services/${service.slug}`}
        className="font-heading font-semibold text-navy underline decoration-gold underline-offset-2"
      >
        {service.label}
      </Link>{" "}
      — {service.primaryKeyword}.
    </p>
  );
}

/** Cover image for blog index cards and post heroes. */
export function PostCoverImage({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[16/9] w-full overflow-hidden bg-offwhite ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 720px"
        className="object-cover"
      />
    </div>
  );
}
