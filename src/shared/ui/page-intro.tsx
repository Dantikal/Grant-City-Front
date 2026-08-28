import { Reveal } from "./reveal";
import { cn } from "@/shared/lib/cn";

export function PageIntro({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <Reveal className={cn("mx-auto max-w-[1240px] px-6 pt-20 pb-4 md:px-12 md:pt-28", className)}>
      {eyebrow ? (
        <div className="text-brand-accent mb-4 text-xs font-semibold tracking-[0.22em] uppercase">
          {eyebrow}
        </div>
      ) : null}
      <h1 className="m-0 max-w-3xl font-serif text-5xl leading-[1.02] font-medium tracking-[-0.015em] text-balance md:text-6xl">
        {title}
      </h1>
      {subtitle ? (
        <p className="text-muted-foreground mt-5 max-w-xl text-lg leading-relaxed">{subtitle}</p>
      ) : null}
    </Reveal>
  );
}
