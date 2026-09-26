import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Bath, BedDouble, Check, Maximize, MapPin } from "lucide-react";
import { fetchProperty, PropertyBadge } from "@/entities/property";
import { fetchAgent } from "@/entities/agent";
import { BookingDialog } from "@/features/create-booking";
import { DownloadBrochureButton } from "@/features/download-brochure";
import { FavoriteButton } from "@/features/toggle-favorite";
import { ContactAgentDialog } from "@/features/contact-agent";
import { PropertyGallery } from "@/widgets/property-gallery";
import { PropertyMap } from "@/widgets/property-map";
import { ROUTES } from "@/shared/constants/routes";
import { getT } from "@/shared/i18n/server";
import { formatPrice } from "@/shared/lib/format-price";
import { Reveal } from "@/shared/ui/reveal";

// Property data lives in the backend — render on demand.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const property = await fetchProperty(id);
  if (!property) return { title: "Property not found" };
  return {
    title: property.title,
    description: property.description.slice(0, 160),
    openGraph: { images: [property.images[0]] },
  };
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = await fetchProperty(id);
  if (!property) notFound();

  const agent = await fetchAgent(property.agentId);
  const { t } = await getT();

  // Translated description/features, falling back to the stored text for admin-added items.
  const descKey = `prop.${property.id}.desc`;
  const descVal = t(descKey);
  const description = descVal === descKey ? property.description : descVal;
  const featKey = `prop.${property.id}.features`;
  const featVal = t(featKey);
  const features = featVal === featKey ? property.features : featVal.split(" | ");

  return (
    <div className="mx-auto max-w-[1240px] px-6 py-12 md:px-12">
      <nav className="text-muted-foreground mb-6 text-sm">
        <Link href={ROUTES.properties} className="link-underline">
          {t("pd.crumb")}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{property.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <Reveal>
          <PropertyGallery images={property.images} alt={property.title} />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="border-border bg-card sticky top-24 rounded-xl border p-7">
            <div className="flex items-center justify-between">
              <PropertyBadge status={property.status} />
              <FavoriteButton
                propertyId={property.id}
                title={property.title}
                className="border-border border"
              />
            </div>
            <h1 className="mt-4 font-serif text-4xl leading-tight font-medium">{property.title}</h1>
            <p className="text-muted-foreground mt-1.5 flex items-center gap-1.5 text-sm">
              <MapPin className="size-4" /> {property.area}, {property.city}
            </p>
            <div className="text-brand-accent mt-5 font-serif text-4xl font-semibold">
              {formatPrice(property.price, property.rentPeriod)}
            </div>

            <div className="border-border mt-6 grid grid-cols-3 gap-2 border-y py-5 text-center">
              <Spec
                icon={<BedDouble className="size-5" />}
                value={property.beds}
                label={t("pd.beds")}
              />
              <Spec
                icon={<Bath className="size-5" />}
                value={property.baths}
                label={t("pd.baths")}
              />
              <Spec
                icon={<Maximize className="size-5" />}
                value={property.sqft.toLocaleString()}
                label={t("pd.sqft")}
              />
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <BookingDialog propertyId={property.id} propertyTitle={property.title} />
              <DownloadBrochureButton property={property} agent={agent ?? undefined} />
            </div>

            {agent ? (
              <div className="border-border mt-6 flex items-center gap-3 border-t pt-6">
                <Image
                  src={agent.photo}
                  alt={agent.name}
                  width={52}
                  height={52}
                  className="size-13 rounded-full object-cover"
                />
                <div className="flex-1">
                  <Link href={ROUTES.agent(agent.slug)} className="link-underline font-semibold">
                    {agent.name}
                  </Link>
                  <div className="text-muted-foreground text-xs">{agent.role}</div>
                </div>
                <ContactAgentDialog
                  agentName={agent.name}
                  agentId={agent.id}
                  propertyId={property.id}
                  triggerLabel="Ask"
                  variant="outline"
                />
              </div>
            ) : null}
          </div>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <h2 className="font-serif text-3xl font-medium">{t("pd.about")}</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl text-base leading-relaxed">
            {description}
          </p>

          <h3 className="mt-10 font-serif text-2xl font-semibold">{t("pd.features")}</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-3">
                <span className="bg-brand-lime text-brand-ink grid size-6 shrink-0 place-items-center rounded-full">
                  <Check className="size-3.5" />
                </span>
                <span className="text-[15px]">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-serif text-2xl font-semibold">{t("pd.location")}</h3>
          <PropertyMap
            markers={[
              {
                id: property.id,
                lat: property.coordinates.lat,
                lng: property.coordinates.lng,
                title: property.title,
                price: formatPrice(property.price, property.rentPeriod),
              },
            ]}
            height={360}
          />
        </div>
      </div>
    </div>
  );
}

function Spec({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-brand-accent">{icon}</span>
      <span className="font-semibold">{value}</span>
      <span className="text-muted-foreground text-xs">{label}</span>
    </div>
  );
}
