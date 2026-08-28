"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Property } from "@/entities/property";
import { ROUTES } from "@/shared/constants/routes";
import { useTranslation } from "@/shared/i18n";
import { formatPrice } from "@/shared/lib/format-price";
import { Button } from "@/shared/ui/button";

const EASE = [0.2, 0.7, 0.2, 1] as const;

export function Hero({ featured }: { featured?: Property | null }) {
  const ref = useRef<HTMLElement>(null);
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const parallax = useTransform(scrollYProgress, [0, 1], [0, 160]);

  return (
    <section
      ref={ref}
      className="bg-brand-ink relative h-[90vh] max-h-[920px] min-h-[640px] overflow-hidden"
    >
      <motion.div style={{ y: parallax }} className="absolute -inset-x-0 -top-[6%] h-[112%]">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80"
          alt="A considered home at dusk"
          fill
          priority
          className="anim-hero-zoom object-cover"
        />
      </motion.div>
      <div className="from-brand-ink/85 via-brand-ink/55 to-brand-ink/10 absolute inset-0 bg-gradient-to-r" />
      <div className="from-brand-ink/55 absolute inset-0 bg-gradient-to-t to-transparent" />

      <div className="relative z-30 mx-auto flex h-full max-w-[1240px] flex-col justify-center px-6 pb-0 md:px-12 md:pb-40">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-brand-lime mb-6 inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.22em] uppercase"
        >
          <span className="bg-brand-green inline-block h-px w-6" />
          {t("hero.badge")}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="m-0 max-w-3xl font-serif text-5xl leading-[0.98] font-medium tracking-[-0.015em] text-balance text-white md:text-[84px]"
        >
          {t("hero.titlePre")} <em className="text-brand-amber not-italic">{t("hero.titleEm")}</em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
          className="mt-6 mb-9 max-w-md text-lg leading-relaxed text-[#ececec]"
        >
          {t("hero.subtitle")}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="flex flex-wrap gap-3.5"
        >
          <Button asChild variant="lime" size="lg">
            <Link href={ROUTES.properties}>{t("actions.browse")}</Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="border border-white/35 bg-white/10 text-white backdrop-blur hover:bg-white/20"
          >
            <Link href={ROUTES.contacts}>{t("actions.talk")}</Link>
          </Button>
        </motion.div>
      </div>

      {/* floating featured listing */}
      {featured ? (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute top-[120px] right-14 z-20 hidden w-[280px] lg:block"
        >
          <Link
            href={ROUTES.property(featured.slug)}
            className="anim-float-a bg-brand-ink/60 block rounded-2xl border border-white/15 p-5 text-white shadow-2xl backdrop-blur-xl"
          >
            <div className="text-brand-green mb-2.5 text-[11px] tracking-[0.14em] uppercase">
              {t("hero.featured")}
            </div>
            <div className="font-serif text-2xl leading-tight font-semibold">{featured.title}</div>
            <div className="mt-1 text-[13px] text-[#c8c8c8]">
              {featured.area} · {featured.beds} bd · {featured.baths} ba
            </div>
            <div className="mt-3.5 flex items-baseline justify-between border-t border-white/15 pt-3.5">
              <span className="text-brand-amber text-xl font-bold">
                {formatPrice(featured.price)}
              </span>
              <span className="text-[13px] font-semibold">View →</span>
            </div>
          </Link>
        </motion.div>
      ) : null}

      {/* floating stats */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="anim-float-b absolute bottom-16 left-14 z-20 hidden gap-3.5 md:flex"
      >
        <div className="bg-brand-green/90 rounded-2xl px-5 py-[18px] text-white shadow-2xl">
          <div className="font-serif text-[38px] leading-none font-bold">
            4.9<span className="text-lg">★</span>
          </div>
          <div className="mt-1 text-xs font-semibold">{t("hero.rating")}</div>
        </div>
        <div className="bg-brand-ink/60 rounded-2xl border border-white/15 px-5 py-[18px] text-white shadow-2xl backdrop-blur-xl">
          <div className="font-serif text-[38px] leading-none font-bold">320+</div>
          <div className="mt-1 text-xs text-[#c8c8c8]">{t("hero.homesPlaced")}</div>
        </div>
      </motion.div>

      <div className="anim-shimmer absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[11px] tracking-[0.24em] text-white/60 uppercase">
        {t("hero.scroll")}
      </div>
    </section>
  );
}
