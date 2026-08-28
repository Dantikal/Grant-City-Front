import type { Metadata } from "next";
import { PropertyCatalog, PropertyTabs } from "@/widgets/property-catalog";
import { ROUTES } from "@/shared/constants/routes";
import { getT } from "@/shared/i18n/server";
import { PageIntro } from "@/shared/ui/page-intro";

export const metadata: Metadata = {
  title: "Luxury collection",
  description: "Our luxury collection — the most distinctive homes on our books.",
};

export default async function LuxuryPage() {
  const { t } = await getT();
  return (
    <>
      <PageIntro
        eyebrow={t("properties.tabLux")}
        title={t("properties.luxTitle")}
        subtitle={t("properties.luxSub")}
      />
      <PropertyTabs active={ROUTES.propertiesLuxury} />
      <section className="mx-auto max-w-[1240px] px-6 py-12 md:px-12">
        <PropertyCatalog listingType="luxury" />
      </section>
    </>
  );
}
