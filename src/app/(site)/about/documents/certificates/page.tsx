import type { Metadata } from "next";
import { CertificatesGallery } from "@/widgets/certificates-gallery";
import { ROUTES } from "@/shared/constants/routes";
import { getT } from "@/shared/i18n/server";
import { Breadcrumbs } from "@/shared/ui/breadcrumbs";
import { PageIntro } from "@/shared/ui/page-intro";

export const metadata: Metadata = {
  title: "Certificates",
  description: "Grand City's certificates and licences.",
};

export default async function CertificatesPage() {
  const { t } = await getT();

  return (
    <>
      <div className="mx-auto max-w-[1240px] px-6 pt-8 md:px-12">
        <Breadcrumbs
          items={[
            { label: t("nav.home"), href: ROUTES.home },
            { label: t("nav.about"), href: ROUTES.about },
            { label: t("docs.title"), href: ROUTES.aboutDocuments },
            { label: t("certs.title") },
          ]}
        />
      </div>

      <PageIntro
        className="pt-8 md:pt-10"
        eyebrow={t("certs.eyebrow")}
        title={t("certs.galleryTitle")}
        subtitle={t("certs.gallerySub")}
      />

      <section className="mx-auto max-w-[1240px] px-6 py-14 pb-24 md:px-12">
        <CertificatesGallery />
      </section>
    </>
  );
}
