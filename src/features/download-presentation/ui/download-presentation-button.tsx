"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SERVICES } from "@/entities/service";
import { COMPANY_STATS } from "@/entities/company";
import { fetchPresentations } from "@/entities/certificate";
import { queryKeys } from "@/shared/api/query-client";
import { appConfig } from "@/shared/config/app.config";
import { LANGUAGES, type LanguageCode } from "@/shared/constants/languages";
import { translator } from "@/shared/i18n";
import { useSettings } from "@/shared/store/settings.store";
import { useTranslation } from "@/shared/i18n";
import { Button, type ButtonProps } from "@/shared/ui/button";
import { Flag } from "@/shared/ui/flag";
import { cn } from "@/shared/lib/cn";

const STAT_KEYS = ["stats.homesPlaced", "stats.neighborhoods", "stats.asking", "stats.rating"];

/** Static presentation files served straight from `public/` — see `findStaticPresentation`. */
const STATIC_PRESENTATION_DIR = "/prezentation";

/**
 * Downloads the presentation in one language, taking the first that exists:
 * the file uploaded through the admin panel, then a static file in
 * `public/prezentation`, then a PDF generated from that language's dictionary.
 */
export function DownloadPresentationButton({
  lang,
  variant = "outline",
  className,
}: {
  lang: LanguageCode;
  variant?: ButtonProps["variant"];
  className?: string;
}) {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  // A missing/unreachable endpoint just means "no upload" — the generated PDF covers it.
  const { data: presentations } = useQuery({
    queryKey: queryKeys.presentations(),
    queryFn: fetchPresentations,
  });
  const uploaded = presentations?.[lang];
  const settings = useSettings();
  const label = LANGUAGES.find((l) => l.code === lang)?.label ?? lang.toUpperCase();

  async function onClick() {
    setLoading(true);
    try {
      const staticFile = uploaded?.url ? null : await findStaticPresentation(lang);
      if (uploaded?.url) {
        triggerDownload(uploaded.url, uploaded.name || `presentation-${lang}.pdf`);
      } else if (staticFile) {
        triggerDownload(staticFile, `${slug(appConfig.name)}-presentation-${lang}.pdf`);
      } else {
        // Translate against the target language, not the one the visitor is browsing in.
        const tl = translator(lang);
        const { generatePresentation } = await import("@/shared/lib/pdf-generator");
        const blob = await generatePresentation({
          lang,
          company: appConfig.name,
          tagline: tl("hero.badge"),
          intro: tl("about.p1"),
          servicesHeading: tl("nav.services"),
          stats: COMPANY_STATS.map((s, i) => ({ value: s.value, label: tl(STAT_KEYS[i]) })),
          services: SERVICES.map((s) => ({
            title: tl(`svc.${s.id}.title`),
            body: tl(`svc.${s.id}.body`),
          })),
          contact: {
            phone: settings.phone,
            email: settings.email,
            address: [settings.street, settings.city].filter(Boolean).join(", "),
          },
        });
        const url = URL.createObjectURL(blob);
        triggerDownload(url, `${slug(appConfig.name)}-presentation-${lang}.pdf`);
        URL.revokeObjectURL(url);
      }
      toast.success(t("certs.downloaded", { lang: label }));
    } catch {
      toast.error(t("certs.downloadFailed"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant={variant}
      size="lg"
      onClick={onClick}
      disabled={loading}
      className={cn("justify-start gap-3", className)}
    >
      <Flag code={lang} className="h-3.5 w-[21px]" />
      <span className="flex-1 text-left">{label}</span>
      {loading ? (
        <Loader2 className="size-4 shrink-0 animate-spin" />
      ) : (
        <Download className="size-4 shrink-0 opacity-60" />
      )}
    </Button>
  );
}

/**
 * Files dropped into `public/prezentation` — a per-language file wins, otherwise the
 * shared one. Used when nothing is uploaded through the admin panel; returns `null`
 * when neither file exists, so the generated PDF stays the last resort.
 */
async function findStaticPresentation(lang: LanguageCode): Promise<string | null> {
  const candidates = [
    `${STATIC_PRESENTATION_DIR}/presentation-${lang}.pdf`,
    `${STATIC_PRESENTATION_DIR}/presentation.pdf`,
  ];
  for (const path of candidates) {
    try {
      const response = await fetch(path, { method: "HEAD" });
      if (response.ok) return path;
    } catch {
      // Network hiccup — treat it as "no static file" and fall through.
    }
  }
  return null;
}

function slug(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

function triggerDownload(url: string, filename: string) {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  // Cross-origin URLs ignore `download`; opening in a new tab is the safe fallback.
  link.rel = "noreferrer";
  document.body.appendChild(link);
  link.click();
  link.remove();
}
