import Image from "next/image";
import { Reveal } from "@/shared/ui/reveal";

/** Photo banner that opens every properties page (the image that used to sit behind
 *  the homepage hero). */
export function PropertyBanner({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="mx-auto max-w-[1240px] px-6 pt-8 pb-8 md:px-12 md:pt-10">
      <div className="bg-brand-ink relative overflow-hidden rounded-2xl">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80"
          alt="A considered home at dusk"
          fill
          priority
          sizes="(max-width: 1240px) 100vw, 1240px"
          className="object-cover"
        />
        <div className="from-brand-ink/85 via-brand-ink/55 to-brand-ink/10 absolute inset-0 bg-gradient-to-r" />
        <Reveal className="relative px-6 py-16 md:px-12 md:py-24">
          {eyebrow ? (
            <div className="text-brand-lime mb-4 text-xs font-semibold tracking-[0.22em] uppercase">
              {eyebrow}
            </div>
          ) : null}
          <h1 className="m-0 max-w-3xl font-serif text-5xl leading-[1.02] font-medium tracking-[-0.015em] text-balance text-white md:text-6xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#ececec]">{subtitle}</p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
