import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Section";

export default function NotFound() {
  return (
    <section className="bg-offwhite">
      <div className="mx-auto flex min-h-[60vh] w-full max-w-content flex-col items-start justify-center px-6 py-24 lg:px-8">
        <Eyebrow>404</Eyebrow>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl">
          That page has done a disappearing act.
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate">
          The link is broken or the page moved. Our sites don&apos;t 404 on real users
          — but this one page got away from us. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button href="/" variant="primary">
            Back to home
          </Button>
          <Button href="/contact" variant="ghost">
            Book a Free Technical Audit
          </Button>
        </div>
      </div>
    </section>
  );
}
