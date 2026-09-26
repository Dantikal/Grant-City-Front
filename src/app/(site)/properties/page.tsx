import type { Metadata } from "next";
import { PropertyBanner, PropertyCatalog, PropertyTabs } from "@/widgets/property-catalog";
import { ROUTES } from "@/shared/constants/routes";
import { getT } from "@/shared/i18n/server";

export const metadata: Metadata = {
  title: "Properties",
  description: "Browse every home on our books — for sale, to rent, and the luxury collection.",
};

export default async function PropertiesPage() {
  const { t } = await getT();
  return (
    <>
      <PropertyBanner
        eyebrow={t("properties.eyebrow")}
        title={t("properties.title")}
        subtitle={t("properties.subtitle")}
      />
      <PropertyTabs active={ROUTES.properties} />
      <section className="mx-auto max-w-[1240px] px-6 py-12 md:px-12">
        <PropertyCatalog />
      </section>
    </>
  );
}
