"use client";

import { LANGUAGES, type LanguageCode } from "@/shared/constants/languages";
import { useTranslation } from "@/shared/i18n";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Flag } from "@/shared/ui/flag";
import { cn } from "@/shared/lib/cn";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang } = useTranslation();

  return (
    <Select value={lang} onValueChange={(v) => setLang(v as LanguageCode)}>
      <SelectTrigger
        className={cn(
          "border-border h-9 w-[90px] rounded-full px-3 text-[13px] font-semibold",
          className,
        )}
        aria-label="Change language"
      >
        <Flag code={lang} />
        <SelectValue>{LANGUAGES.find((l) => l.code === lang)?.short}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {LANGUAGES.map((l) => (
          <SelectItem key={l.code} value={l.code}>
            <span className="flex items-center gap-2">
              <Flag code={l.code} />
              {l.short} · {l.label}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
