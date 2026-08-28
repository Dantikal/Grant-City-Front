import type { Metadata } from "next";
import { PageIntro } from "@/shared/ui/page-intro";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Grand City collects, uses and protects your personal information.",
};

const SECTIONS = [
  {
    h: "What we collect",
    p: "When you enquire, book a viewing or subscribe, we collect the details you give us — your name, contact information and any message. We also keep basic, anonymized analytics about how the site is used.",
  },
  {
    h: "How we use it",
    p: "We use your information solely to respond to your enquiry, arrange viewings, and keep you updated about properties you've expressed interest in. We never sell your data.",
  },
  {
    h: "Local storage",
    p: "Your saved favorites are stored locally in your own browser (IndexedDB) and are never transmitted to us.",
  },
  {
    h: "Your rights",
    p: "You can ask us at any time to access, correct or delete the personal information we hold about you. Email hello@grandcity.studio and we'll action it within 30 days.",
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageIntro eyebrow="Legal" title="Privacy Policy" subtitle="Last updated June 2026." />
      <article className="mx-auto max-w-3xl space-y-10 px-6 py-16 md:px-12">
        {SECTIONS.map((s) => (
          <section key={s.h}>
            <h2 className="m-0 mb-3 font-serif text-2xl font-semibold">{s.h}</h2>
            <p className="text-muted-foreground m-0 leading-relaxed">{s.p}</p>
          </section>
        ))}
      </article>
    </>
  );
}
