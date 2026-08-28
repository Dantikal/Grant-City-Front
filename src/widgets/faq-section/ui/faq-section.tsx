"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useTranslation } from "@/shared/i18n";
import { Reveal } from "@/shared/ui/reveal";
import { cn } from "@/shared/lib/cn";

const FAQ_COUNT = 5;

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  const { t } = useTranslation();
  const faqs = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    q: t(`faq.q${i + 1}`),
    a: t(`faq.a${i + 1}`),
  }));

  return (
    <section className="mx-auto max-w-[1240px] px-6 py-[104px] md:px-12">
      <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <div className="text-brand-accent mb-4 text-xs font-semibold tracking-[0.22em] uppercase">
            {t("home.faq.eyebrow")}
          </div>
          <h2 className="m-0 font-serif text-4xl leading-tight font-medium tracking-[-0.01em] md:text-[46px]">
            {t("home.faq.title")}
          </h2>
        </Reveal>

        <div className="border-border border-t">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div key={faq.q} className="border-border border-b">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-xl font-semibold md:text-[22px]">{faq.q}</span>
                  <Plus
                    className={cn(
                      "text-brand-accent size-5 shrink-0 transition-transform duration-300",
                      isOpen && "rotate-45",
                    )}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-muted-foreground max-w-xl pb-6 text-[15px] leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
