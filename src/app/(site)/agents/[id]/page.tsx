import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Mail, MapPin, Phone, Star } from "lucide-react";
import { fetchAgent } from "@/entities/agent";
import { fetchProperties, PropertyCard } from "@/entities/property";
import { ContactAgentDialog } from "@/features/contact-agent";
import { FavoriteButton } from "@/features/toggle-favorite";
import { getT } from "@/shared/i18n/server";
import { Badge } from "@/shared/ui/badge";
import { Reveal } from "@/shared/ui/reveal";

// Agent data lives in the backend — render on demand.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const agent = await fetchAgent(id);
  if (!agent) return { title: "Agent not found" };
  return { title: agent.name, description: `${agent.name} — ${agent.role} at Grand City.` };
}

export default async function AgentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agent = await fetchAgent(id);
  if (!agent) notFound();

  const listings = await fetchProperties()
    .then((all) => all.filter((p) => p.agentId === agent.id))
    .catch(() => []);
  const { t } = await getT();
  const firstName = agent.name.split(" ")[0];
  const bioKey = `agent.${agent.id}.bio`;
  const bioVal = t(bioKey);
  const bio = bioVal === bioKey ? agent.longBio : bioVal;

  return (
    <div className="mx-auto max-w-[1240px] px-6 py-20 md:px-12 md:py-28">
      <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
        <Reveal className="relative h-[460px] overflow-hidden rounded-xl">
          <Image src={agent.photo} alt={agent.name} fill sizes="40vw" className="object-cover" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="text-brand-accent mb-3 text-xs font-semibold tracking-[0.18em] uppercase">
            {agent.role}
          </div>
          <h1 className="m-0 font-serif text-5xl font-medium">{agent.name}</h1>
          <div className="text-muted-foreground mt-3 flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1.5">
              <Star className="fill-brand-amber text-brand-amber size-4" />
              {agent.rating.toFixed(1)} {t("ad.rating")}
            </span>
            <span>·</span>
            <span>
              {agent.salesCount} {t("ad.placed")}
            </span>
            <span>·</span>
            <span>{t("ad.since", { year: agent.since })}</span>
          </div>

          <p className="text-muted-foreground mt-6 max-w-xl text-base leading-relaxed">{bio}</p>

          <div className="mt-7 flex flex-wrap gap-2">
            {agent.specialties.map((s) => (
              <Badge key={s} variant="muted">
                {s}
              </Badge>
            ))}
          </div>

          <ul className="mt-7 space-y-2.5 text-sm">
            <li className="flex items-center gap-3">
              <MapPin className="text-brand-accent size-4" /> {agent.areas.join(" · ")}
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-brand-accent size-4" /> {agent.phone}
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-brand-accent size-4" /> {agent.email}
            </li>
          </ul>

          <div className="mt-8">
            <ContactAgentDialog
              agentName={agent.name}
              variant="lime"
              triggerLabel={t("ad.message", { name: firstName })}
            />
          </div>
        </Reveal>
      </div>

      {listings.length > 0 ? (
        <section className="mt-24">
          <h2 className="mb-8 font-serif text-3xl font-medium">
            {t("ad.listings", { name: firstName })}
          </h2>
          <div className="grid grid-cols-3 gap-[30px] max-lg:grid-cols-2 max-sm:grid-cols-1">
            {listings.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                action={<FavoriteButton propertyId={p.id} title={p.title} />}
              />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
