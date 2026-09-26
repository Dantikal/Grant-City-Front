import { Facebook, Instagram, Linkedin, Link2, Send, Twitter, Youtube } from "lucide-react";
import { appConfig } from "@/shared/config/app.config";
import { cn } from "@/shared/lib/cn";

/** Lucide ships no Pinterest glyph, so it is drawn inline. */
function Pinterest({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2a10 10 0 0 0-3.65 19.31c-.09-.78-.16-1.98.03-2.83l1.15-4.87s-.29-.59-.29-1.46c0-1.37.79-2.39 1.78-2.39.84 0 1.25.63 1.25 1.39 0 .84-.54 2.11-.82 3.28-.23.98.49 1.79 1.46 1.79 1.76 0 3.11-1.85 3.11-4.52 0-2.36-1.7-4.02-4.12-4.02-2.8 0-4.45 2.1-4.45 4.28 0 .85.33 1.76.74 2.25.08.1.09.19.07.29l-.28 1.13c-.04.18-.15.22-.34.13-1.25-.58-2.03-2.4-2.03-3.87 0-3.15 2.29-6.04 6.6-6.04 3.46 0 6.16 2.47 6.16 5.77 0 3.44-2.17 6.21-5.18 6.21-1.01 0-1.96-.53-2.29-1.15l-.62 2.37c-.22.86-.83 1.94-1.24 2.6A10 10 0 1 0 12 2z" />
    </svg>
  );
}

/** Lucide ships no WhatsApp glyph either. */
function WhatsApp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.9-4.44 9.9-9.9S17.5 2 12.04 2zm0 18.15c-1.5 0-2.97-.4-4.25-1.16l-.3-.18-3.15.83.84-3.07-.2-.32a8.2 8.2 0 1 1 7.06 3.9zm4.5-6.13c-.25-.12-1.46-.72-1.68-.8-.23-.09-.39-.13-.56.12s-.64.8-.78.97c-.15.16-.29.18-.53.06a6.7 6.7 0 0 1-3.36-2.94c-.25-.43.25-.4.72-1.33.08-.16.04-.3-.02-.43l-.78-1.86c-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.06s.89 2.39 1.01 2.56c.12.16 1.74 2.66 4.22 3.73 1.57.68 2.19.74 2.97.62.48-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z" />
    </svg>
  );
}

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  whatsapp: WhatsApp,
  instagram: Instagram,
  linkedin: Linkedin,
  facebook: Facebook,
  twitter: Twitter,
  x: Twitter,
  youtube: Youtube,
  telegram: Send,
  pinterest: Pinterest,
};

export function socialIcon(label: string) {
  return ICONS[label.toLowerCase()] ?? Link2;
}

/** Full accessible name of a social link, e.g. "Instagram @bizness.expert". */
export function socialName(s: { label: string; handle?: string }) {
  return s.handle ? `${s.label} ${s.handle}` : s.label;
}

/** Icon links for every entry of `appConfig.social`. */
export function SocialLinks({
  className,
  iconClassName,
  linkClassName,
  secondaryClassName,
}: {
  className?: string;
  iconClassName?: string;
  linkClassName?: string;
  /** Extra classes for non-primary links, e.g. to hide them where space is short. */
  secondaryClassName?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {appConfig.social.map((s) => {
        const Icon = socialIcon(s.label);
        return (
          <a
            key={s.href}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={socialName(s)}
            title={socialName(s)}
            className={cn(
              "text-muted-foreground hover:text-foreground hover:bg-accent grid size-8 place-items-center rounded-full transition-colors",
              linkClassName,
              !s.primary && secondaryClassName,
            )}
          >
            <Icon className={cn("size-4", iconClassName)} />
          </a>
        );
      })}
    </div>
  );
}
