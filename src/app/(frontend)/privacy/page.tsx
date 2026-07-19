import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/Section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How LaunchNest handles the information you share with us.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <Section tone="white">
      <article className="mx-auto max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="font-heading text-4xl font-bold tracking-tight text-navy">
          Privacy Policy
        </h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-wider text-slate">
          Last updated: {new Date().getFullYear()}
        </p>
        <div className="mt-8 flex flex-col gap-6 text-lg leading-relaxed text-slate">
          <p>
            This is a starter privacy policy. Replace it with your reviewed legal copy
            before going live.
          </p>
          <p>
            <strong className="text-navy">What we collect.</strong> When you submit the
            contact form we collect your name, company, email, budget range, timeline,
            current site status, and any message you provide. We use this solely to
            respond to your enquiry and prepare your technical audit.
          </p>
          <p>
            <strong className="text-navy">How we use it.</strong> Lead details may be
            forwarded to our CRM to manage the conversation. We do not sell your data.
          </p>
          <p>
            <strong className="text-navy">Contact.</strong> For any privacy request,
            email{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-heading font-semibold text-navy underline decoration-gold decoration-2 underline-offset-4"
            >
              {siteConfig.email}
            </a>
            .
          </p>
        </div>
      </article>
    </Section>
  );
}
