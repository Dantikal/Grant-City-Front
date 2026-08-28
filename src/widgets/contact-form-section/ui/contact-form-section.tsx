import { appConfig } from "@/shared/config/app.config";
import { RequestForm } from "@/features/create-request";
import { getT } from "@/shared/i18n/server";
import { Reveal } from "@/shared/ui/reveal";
import { Mail, MapPin, Phone } from "lucide-react";

export async function ContactFormSection() {
  const { t } = await getT();
  return (
    <section id="request" className="mx-auto max-w-[1240px] scroll-mt-24 px-6 py-[104px] md:px-12">
      <div className="grid gap-16 md:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div className="text-brand-accent mb-4 text-xs font-semibold tracking-[0.22em] uppercase">
            {t("contacts.eyebrow")}
          </div>
          <h2 className="m-0 mb-5 font-serif text-4xl leading-tight font-medium tracking-[-0.01em] md:text-5xl">
            {t("contacts.heading")}
          </h2>
          <p className="text-muted-foreground mb-10 max-w-md text-base leading-relaxed">
            {t("contacts.text")}
          </p>
          <ul className="space-y-5">
            <ContactRow icon={<Phone className="size-4" />} label={t("contacts.call")}>
              {appConfig.phone}
            </ContactRow>
            <ContactRow icon={<Mail className="size-4" />} label={t("contacts.email")}>
              {appConfig.email}
            </ContactRow>
            <ContactRow icon={<MapPin className="size-4" />} label={t("contacts.studio")}>
              {appConfig.address.street}, {appConfig.address.city} {appConfig.address.region}{" "}
              {appConfig.address.postal}
            </ContactRow>
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="border-border bg-card rounded-2xl border p-7 md:p-9">
            <RequestForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-4">
      <span className="bg-brand-sand text-brand-accent dark:bg-secondary mt-0.5 grid size-9 place-items-center rounded-full">
        {icon}
      </span>
      <div>
        <div className="text-muted-foreground text-xs tracking-[0.14em] uppercase">{label}</div>
        <div className="font-medium">{children}</div>
      </div>
    </li>
  );
}
