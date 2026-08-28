"use client";

import { LANGUAGES } from "@/shared/constants/languages";
import { cn } from "@/shared/lib/cn";
import { DownloadPresentationButton } from "./download-presentation-button";

/** One download button per site language. */
export function PresentationDownloads({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {LANGUAGES.map((language) => (
        <DownloadPresentationButton key={language.code} lang={language.code} />
      ))}
    </div>
  );
}
