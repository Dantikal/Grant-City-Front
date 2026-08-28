"use client";

import { useState } from "react";
import { toast } from "sonner";
import { emailSchema } from "@/shared/lib/validators";
import { useTranslation } from "@/shared/i18n";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { t } = useTranslation();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }
    setError("");
    setEmail("");
    toast.success("You're on the list", {
      description: "We'll send the occasional, considered update.",
    });
  }

  return (
    <section className="mx-auto max-w-[1240px] px-6 pb-[104px] md:px-12">
      <div className="bg-brand-sand dark:bg-secondary rounded-2xl px-8 py-12 md:px-14 md:py-16">
        <div className="flex flex-wrap items-center justify-between gap-8">
          <div className="max-w-md">
            <div className="text-brand-accent mb-3 text-xs font-semibold tracking-[0.22em] uppercase">
              {t("home.news.eyebrow")}
            </div>
            <h2 className="m-0 font-serif text-3xl leading-tight font-medium tracking-[-0.01em] md:text-4xl">
              {t("home.news.title")}
            </h2>
          </div>
          <form onSubmit={onSubmit} className="w-full max-w-md">
            <div className="flex gap-3">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
                className="bg-background"
              />
              <Button type="submit" variant="lime">
                {t("actions.subscribe")}
              </Button>
            </div>
            {error ? <p className="text-destructive mt-2 text-xs">{error}</p> : null}
          </form>
        </div>
      </div>
    </section>
  );
}
