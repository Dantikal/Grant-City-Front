"use client";

import { Suspense } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CrmBoard, CrmSummaryCards, LeadDialog, TaskList } from "@/features/admin-crm";
import { cn } from "@/shared/lib/cn";

const TABS = [
  { value: "board", label: "Воронка" },
  { value: "tasks", label: "Задачи" },
] as const;

export default function AdminCrmPage() {
  return (
    <Suspense>
      <Crm />
    </Suspense>
  );
}

/** Tab and open lead live in the URL, so a Telegram link (`?lead=12`) opens the right card. */
function Crm() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const tab = params.get("tab") === "tasks" ? "tasks" : "board";
  const leadParam = Number(params.get("lead"));
  const leadId = Number.isFinite(leadParam) && leadParam > 0 ? leadParam : null;

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value === null) next.delete(key);
    else next.set(key, value);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <div>
      <h1 className="font-serif text-3xl font-medium">CRM</h1>
      <p className="text-muted-foreground mt-1 text-sm">
        Заявки с сайта и записи на просмотр автоматически попадают в воронку и распределяются по
        отделам. Перетаскивайте карточки между этапами.
      </p>

      <div className="mt-8">
        <CrmSummaryCards />
      </div>

      <div className="border-border mt-10 mb-6 flex gap-1 border-b">
        {TABS.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setParam("tab", t.value === "board" ? null : t.value)}
            className={cn(
              "-mb-px border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors",
              tab === t.value
                ? "border-brand-green text-foreground"
                : "text-muted-foreground hover:text-foreground border-transparent",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "board" ? (
        <CrmBoard onOpen={(id) => setParam("lead", String(id))} />
      ) : (
        <TaskList onOpen={(id) => setParam("lead", String(id))} />
      )}

      <LeadDialog leadId={leadId} onClose={() => setParam("lead", null)} />
    </div>
  );
}
