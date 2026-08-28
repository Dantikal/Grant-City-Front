"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { TESTIMONIALS } from "@/entities/company";
import { useTranslation } from "@/shared/i18n";
import { cn } from "@/shared/lib/cn";

export function Testimonials() {
  const { t } = useTranslation();
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "center" });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (embla) setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
    const id = setInterval(() => embla.scrollNext(), 6000);
    return () => {
      clearInterval(id);
      embla.off("select", onSelect);
    };
  }, [embla, onSelect]);

  return (
    <section className="mx-auto max-w-[1240px] px-6 py-[110px] md:px-12">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {TESTIMONIALS.map((item, i) => (
            <div key={item.id} className="min-w-0 flex-[0_0_100%] px-2">
              <figure className="mx-auto max-w-3xl text-center">
                <div className="text-brand-accent h-10 font-serif text-[80px] leading-[0.5]">“</div>
                <blockquote className="m-0 mb-8 font-serif text-3xl leading-[1.28] font-medium tracking-[-0.01em] italic md:text-[38px]">
                  {t(`tst.${i + 1}.q`)}
                </blockquote>
                <figcaption>
                  <div className="text-sm font-bold tracking-[0.02em]">{item.author}</div>
                  <div className="text-muted-foreground mt-1 text-[13px]">
                    {t(`tst.${i + 1}.d`)}
                  </div>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 flex justify-center gap-2">
        {TESTIMONIALS.map((item, i) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Testimonial ${i + 1}`}
            onClick={() => embla?.scrollTo(i)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === selected ? "bg-brand-accent w-6" : "bg-border w-1.5",
            )}
          />
        ))}
      </div>
    </section>
  );
}
