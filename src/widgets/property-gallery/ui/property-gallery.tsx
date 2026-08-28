"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/cn";

export function PropertyGallery({ images, alt }: { images: string[]; alt: string }) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (embla) setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
    return () => {
      embla.off("select", onSelect);
    };
  }, [embla, onSelect]);

  return (
    <div>
      <div className="relative overflow-hidden rounded-xl" ref={emblaRef}>
        <div className="flex">
          {images.map((src, i) => (
            <div key={src} className="relative min-w-0 flex-[0_0_100%]">
              <div className="relative aspect-[16/10]">
                <Image
                  src={src}
                  alt={`${alt} — photo ${i + 1}`}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          aria-label="Previous photo"
          onClick={() => embla?.scrollPrev()}
          className="bg-background/85 absolute top-1/2 left-4 grid size-10 -translate-y-1/2 place-items-center rounded-full backdrop-blur transition-transform hover:scale-105"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Next photo"
          onClick={() => embla?.scrollNext()}
          className="bg-background/85 absolute top-1/2 right-4 grid size-10 -translate-y-1/2 place-items-center rounded-full backdrop-blur transition-transform hover:scale-105"
        >
          <ChevronRight className="size-5" />
        </button>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((src, i) => (
            <span
              key={src}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === selected ? "w-6 bg-white" : "w-1.5 bg-white/50",
              )}
            />
          ))}
        </div>
      </div>

      {images.length > 1 ? (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => embla?.scrollTo(i)}
              className={cn(
                "relative aspect-[4/3] overflow-hidden rounded-lg ring-2 transition",
                i === selected ? "ring-brand-accent" : "hover:ring-border ring-transparent",
              )}
            >
              <Image src={src} alt="" fill sizes="160px" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
