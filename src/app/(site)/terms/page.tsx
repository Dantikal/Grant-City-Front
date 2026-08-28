import type { Metadata } from "next";
import { PageIntro } from "@/shared/ui/page-intro";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing your use of the Grand City website.",
};

const SECTIONS = [
  {
    h: "Use of this site",
    p: "This website is provided for general information about Grand City and the properties we represent. Listing details are believed accurate but are not guaranteed and should be independently verified.",
  },
  {
    h: "No agency relationship",
    p: "Using this site or submitting an enquiry does not in itself create a formal agency or brokerage relationship. Any such relationship is established by separate written agreement.",
  },
  {
    h: "Intellectual property",
    p: "All content, branding and photography on this site belong to Grand City or its licensors and may not be reused without permission.",
  },
  {
    h: "Liability",
    p: "We work hard to keep the site accurate and available but accept no liability for any loss arising from reliance on its content or from temporary unavailability.",
  },
];

export default function TermsPage() {
  return (
    <>
      <PageIntro eyebrow="Legal" title="Terms of Service" subtitle="Last updated June 2026." />
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
