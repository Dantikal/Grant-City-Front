import type { Metadata } from "next";
import { PropertyBanner, PropertyCatalog, PropertyTabs } from "@/widgets/property-catalog";
import { ROUTES } from "@/shared/constants/routes";
import { getT } from "@/shared/i18n/server";

export const metadata: Metadata = {
  title: "Homes for sale",
  description: "Browse homes for sale with Grand City across inner Portland.",
};

export default async function BuyPage() {
  const { t } = await getT();
  return (
    <>
      <PropertyBanner
        eyebrow={t("properties.tabSale")}
        title={t("properties.buyTitle")}
        subtitle={t("properties.buySub")}
      />
      <PropertyTabs active={ROUTES.propertiesBuy} />
      <section className="mx-auto max-w-[1240px] px-6 py-12 md:px-12">
        <PropertyCatalog listingType="buy" />
      </section>
    </>
  );
}
