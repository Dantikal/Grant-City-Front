import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { PresentationDownloads } from "@/features/download-presentation";
import { ROUTES } from "@/shared/constants/routes";
import { getT } from "@/shared/i18n/server";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs";
import { PageIntro } from "@/shared/ui/page-intro";
import { Reveal } from "@/shared/ui/reveal";

export const metadata: Metadata = {
  title: "Presentation",
  description:
    "Download the Grand City company presentation in English, Russian, Kyrgyz or Chinese.",
};

export default async function PresentationPage() {
  const { t } = await getT();

  return (
    <>
      <div className="mx-auto max-w-[1240px] px-6 pt-8 md:px-12">
        <Breadcrumbs
          items={[
            { label: t("nav.home"), href: ROUTES.home },
            { label: t("nav.about"), href: ROUTES.about },
            { label: t("docs.title"), href: ROUTES.aboutDocuments },
            { label: t("certs.presTitle") },
          ]}
        />
      </div>

      <PageIntro
        className="pt-8 md:pt-10"
        eyebrow={t("certs.eyebrow")}
        title={t("certs.presTitle")}
        subtitle={t("certs.presText")}
      />

      <section className="mx-auto max-w-[1240px] px-6 py-14 pb-24 md:px-12">
        <Reveal className="bg-brand-sand dark:bg-secondary rounded-2xl p-8 md:p-11">
          <div className="flex items-start gap-5">
            <span className="bg-background text-brand-accent grid size-12 shrink-0 place-items-center rounded-xl">
              <FileText className="size-5" />
            </span>
            <div>
              <h2 className="m-0 font-serif text-2xl font-medium">{t("certs.pickLang")}</h2>
              <p className="text-muted-foreground mt-2 max-w-lg text-[15px] leading-relaxed">
                {t("certs.pickLangSub")}
              </p>
            </div>
          </div>

          <PresentationDownloads className="mt-8" />
        </Reveal>
      </section>
    </>
  );
}
