"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { useSettings, type CompanySettings } from "@/shared/store/settings.store";
import { LanguageSwitcher } from "@/features/language-switcher/ui/language-switcher";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

export default function AdminSettingsPage() {
  const settings = useSettings();
  const update = useSettings((s) => s.update);
  const reset = useSettings((s) => s.reset);

  const [form, setForm] = useState<CompanySettings>({
    phone: settings.phone,
    email: settings.email,
    street: settings.street,
    city: settings.city,
    region: settings.region,
    postal: settings.postal,
  });

  // Sync local form once the persisted store has hydrated.
  useEffect(() => {
    setForm({
      phone: settings.phone,
      email: settings.email,
      street: settings.street,
      city: settings.city,
      region: settings.region,
      postal: settings.postal,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    settings.phone,
    settings.email,
    settings.street,
    settings.city,
    settings.region,
    settings.postal,
  ]);

  const set = <K extends keyof CompanySettings>(k: K, v: CompanySettings[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  function onSave(e: React.FormEvent) {
    e.preventDefault();
    update(form);
    toast.success("Settings saved", { description: "Studio details updated across the site." });
  }

  return (
    <div>
      <h1 className="font-serif text-3xl font-medium">Settings</h1>
      <p className="text-muted-foreground mt-1 text-sm">
        Studio contact details — these appear in the site footer and contact page.
      </p>

      <form onSubmit={onSave} className="mt-8 space-y-6">
        <section className="border-border bg-card rounded-xl border p-6">
          <h2 className="font-serif text-xl font-semibold">Studio details</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Phone">
              <Input value={form.phone} onChange={(e) => set("phone", e.target.value)} />
            </Field>
            <Field label="Email">
              <Input value={form.email} onChange={(e) => set("email", e.target.value)} />
            </Field>
            <Field label="Street address" className="sm:col-span-2">
              <Input value={form.street} onChange={(e) => set("street", e.target.value)} />
            </Field>
            <Field label="City">
              <Input value={form.city} onChange={(e) => set("city", e.target.value)} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Region">
                <Input value={form.region} onChange={(e) => set("region", e.target.value)} />
              </Field>
              <Field label="Postal">
                <Input value={form.postal} onChange={(e) => set("postal", e.target.value)} />
              </Field>
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <Button type="submit" variant="lime">
              <Save className="size-4" />
              Save changes
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                toast.message("Settings reset to defaults");
              }}
            >
              Reset
            </Button>
          </div>
        </section>

        <section className="border-border bg-card rounded-xl border p-6">
          <h2 className="font-serif text-xl font-semibold">Display</h2>
          <div className="mt-4 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="text-muted-foreground text-sm">Language</span>
              <LanguageSwitcher />
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`space-y-1.5 ${className ?? ""}`}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}
