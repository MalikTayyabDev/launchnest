type TestimonialQuoteProps = {
  text: string;
  name: string;
  role: string;
  onNavy?: boolean;
};

export function TestimonialQuote({ text, name, role, onNavy = false }: TestimonialQuoteProps) {
  return (
    <figure className="relative">
      {/* Gold accent quote mark */}
      <span
        aria-hidden="true"
        className="font-heading text-6xl font-bold leading-none text-gold"
      >
        &ldquo;
      </span>
      <blockquote
        className={`mt-2 font-heading text-xl font-medium leading-relaxed tracking-tight sm:text-2xl ${
          onNavy ? "text-offwhite" : "text-navy"
        }`}
      >
        {text}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="h-px w-8 bg-gold" aria-hidden="true" />
        <span>
          <span
            className={`block font-heading text-sm font-semibold ${
              onNavy ? "text-offwhite" : "text-navy"
            }`}
          >
            {name}
          </span>
          <span
            className={`block font-mono text-xs ${
              onNavy ? "text-offwhite/60" : "text-slate"
            }`}
          >
            {role}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
