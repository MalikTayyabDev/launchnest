import { RichText } from "@payloadcms/richtext-lexical/react";
import type { LexicalContent } from "@/lib/content";

type PostBodyProps = {
  richText?: LexicalContent | null;
  paragraphs?: string[];
};

/**
 * Renders a blog post body from either Lexical rich text (CMS) or plain
 * paragraphs (seed fallback). Styling comes from the `.richtext` rules in globals.css.
 */
export function PostBody({ richText, paragraphs }: PostBodyProps) {
  if (richText) {
    return (
      <div className="richtext">
        <RichText data={richText as never} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {paragraphs?.map((para) => (
        <p key={para} className="text-lg leading-relaxed text-slate">
          {para}
        </p>
      ))}
    </div>
  );
}
