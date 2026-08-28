"use client";

import { useRef } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import type { EmblaOptionsType } from "embla-carousel";
import { PARTNERS, type Partner } from "@/entities/company";
import { useTranslation } from "@/shared/i18n";

const OPTIONS: EmblaOptionsType = {
  loop: true,
  // Free-scrolling so a drag glides instead of snapping to the nearest logo.
  dragFree: true,
  align: "start",
  containScroll: false,
};

/** Pointer travel past which a drag suppresses the click on a logo link. */
const DRAG_THRESHOLD = 5;

/**
 * Embla only loops while the slides are wider than the viewport, so the list is
 * repeated until the track comfortably outgrows any screen. Duplicates are
 * hidden from assistive tech.
 */
const REPEATS = 4;
const TRACK = Array.from({ length: REPEATS }, (_, run) =>
  PARTNERS.map((partner) => ({ partner, run, key: `${run}-${partner.name}` })),
).flat();

export function Partners() {
  const { t } = useTranslation();
  const [emblaRef] = useEmblaCarousel(OPTIONS, [
    AutoScroll({
      speed: 0.8,
      startDelay: 0,
      // Never park the marquee — it keeps drifting through hover, focus and drags.
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
      stopOnInteraction: false,
    }),
  ]);
  const pointerDownX = useRef(0);

  return (
    <section className="border-border border-y py-12">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="text-muted-foreground mb-7 text-center text-xs font-semibold tracking-[0.22em] uppercase">
          {t("partners.title")}
        </div>
      </div>

      {/* Edges fade out so logos slide in and out rather than popping at the cut. */}
      <div
        ref={emblaRef}
        className="cursor-grab overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] select-none active:cursor-grabbing"
        onPointerDown={(e) => (pointerDownX.current = e.clientX)}
        // A drag ends with a click on whatever sits under the cursor — swallow it.
        onClickCapture={(e) => {
          if (Math.abs(e.clientX - pointerDownX.current) > DRAG_THRESHOLD) e.preventDefault();
        }}
      >
        <div className="flex items-center">
          {TRACK.map(({ partner, run, key }) => (
            <PartnerLogo key={key} partner={partner} aria-hidden={run > 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnerLogo({
  partner,
  ...rest
}: { partner: Partner } & React.HTMLAttributes<HTMLDivElement>) {
  const content = partner.logo ? (
    <Image
      src={partner.logo}
      alt={partner.name}
      width={132}
      height={40}
      draggable={false}
      className="h-10 w-auto object-contain"
    />
  ) : (
    <span className="font-serif text-xl font-semibold tracking-[0.08em] whitespace-nowrap">
      {partner.name}
    </span>
  );

  const className =
    "text-muted-foreground hover:text-foreground grid h-10 place-items-center opacity-70 transition-all hover:opacity-100";

  return (
    // `flex-[0_0_auto]` keeps each logo at its natural width — Embla sizes slides
    // from the flex basis, so a percentage here would stretch them.
    <div className="flex-[0_0_auto] px-7" {...rest}>
      {partner.href ? (
        <a
          href={partner.href}
          target="_blank"
          rel="noreferrer"
          draggable={false}
          className={className}
        >
          {content}
        </a>
      ) : (
        <span className={className}>{content}</span>
      )}
    </div>
  );
}
