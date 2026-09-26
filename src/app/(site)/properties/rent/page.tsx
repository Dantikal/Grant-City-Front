import type { Metadata } from "next";
import { PropertyBanner, PropertyCatalog, PropertyTabs } from "@/widgets/property-catalog";
import { ROUTES } from "@/shared/constants/routes";
import { getT } from "@/shared/i18n/server";

export const metadata: Metadata = {
  title: "Homes to rent",
  description: "Browse homes to rent with Grand City across inner Portland.",
};

export default async function RentPage() {
  const { t } = await getT();
  return (
    <>
      <PropertyBanner
        eyebrow={t("properties.tabRent")}
        title={t("properties.rentTitle")}
        subtitle={t("properties.rentSub")}
      />
      <PropertyTabs active={ROUTES.propertiesRent} />
      <section className="mx-auto max-w-[1240px] px-6 py-12 md:px-12">
        <PropertyCatalog listingType="rent" />
      </section>
    </>
  );
}
