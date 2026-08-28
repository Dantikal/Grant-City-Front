import type { Metadata } from "next";
import { ContactFormSection } from "@/widgets/contact-form-section";
import { PropertyMap } from "@/widgets/property-map";
import { appConfig } from "@/shared/config/app.config";
import { getT } from "@/shared/i18n/server";
import { PageIntro } from "@/shared/ui/page-intro";
import { Reveal } from "@/shared/ui/reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${appConfig.name} — book a viewing, request a valuation, or just ask a question.`,
};

export default async function ContactsPage() {
  const { t } = await getT();
  return (
    <>
      <PageIntro
        eyebrow={t("contacts.eyebrow")}
        title={t("contacts.title")}
        subtitle={t("contacts.subtitle")}
      />
      <ContactFormSection />
      <section id="map" className="mx-auto max-w-[1240px] scroll-mt-24 px-6 pb-24 md:px-12">
        <Reveal>
          <PropertyMap
            markers={[
              {
                id: "office",
                lat: 42.87584,
                lng: 74.587196,
                title: `${appConfig.name} — ${appConfig.address.city}`,
                price: `${appConfig.address.street}, ${appConfig.address.city}`,
              },
            ]}
            center={[74.587196, 42.87584]}
            zoom={15}
            height={420}
          />
        </Reveal>
      </section>
    </>
  );
}
