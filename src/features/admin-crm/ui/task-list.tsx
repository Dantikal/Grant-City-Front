"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { isPast, isToday, parseISO } from "date-fns";
import { CalendarClock } from "lucide-react";
import { toast } from "sonner";
import { fetchOpenTasks, updateTask, type LeadTask } from "@/entities/crm";
import { queryKeys } from "@/shared/api/query-client";
import { Loader } from "@/shared/ui/loader";
import { formatDate } from "@/shared/lib/format-date";
import { cn } from "@/shared/lib/cn";

const GROUPS: { key: string; title: string; test: (t: LeadTask) => boolean }[] = [
  { key: "overdue", title: "Просрочено", test: (t) => isPast(parseISO(t.dueAt)) },
  { key: "today", title: "Сегодня", test: (t) => !isPast(parseISO(t.dueAt)) && isToday(parseISO(t.dueAt)) },
  { key: "later", title: "Позже", test: (t) => !isPast(parseISO(t.dueAt)) && !isToday(parseISO(t.dueAt)) },
];

/** Every open follow-up across the pipeline, soonest first. */
export function TaskList({ onOpen }: { onOpen: (leadId: number) => void }) {
  const queryClient = useQueryClient();
  const { data: tasks, isLoading } = useQuery({
    queryKey: [...queryKeys.crm(), "tasks"],
    queryFn: fetchOpenTasks,
    refetchInterval: 30_000,
  });

  async function complete(id: number) {
    try {
      await updateTask(id, { done: true });
      toast.success("Задача выполнена");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Не удалось сохранить");
    } finally {
      queryClient.invalidateQueries({ queryKey: queryKeys.crm() });
    }
  }

  if (isLoading || !tasks) return <Loader label="Загрузка задач…" />;
  if (tasks.length === 0)
    return (
      <p className="border-border text-muted-foreground rounded-lg border border-dashed p-10 text-center">
        Открытых задач нет. Задачи создаются в карточке сделки.
      </p>
    );

  return (
    <div className="space-y-8">
      {GROUPS.map((g) => {
        const items = tasks.filter(g.test);
        if (items.length === 0) return null;
        return (
          <section key={g.key}>
            <h3 className={cn("mb-3 text-sm font-semibold tracking-wide uppercase", g.key === "overdue" ? "text-red-600" : "text-muted-foreground")}>
              {g.title} · {items.length}
            </h3>
            <ul className="border-border bg-card divide-border divide-y rounded-xl border">
              {items.map((t) => (
                <li key={t.id} className="flex items-center gap-3 px-4 py-3">
                  <input
                    type="checkbox"
                    aria-label="Выполнено"
                    className="accent-brand-green size-4 shrink-0 cursor-pointer"
                    checked={false}
                    onChange={() => complete(t.id)}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium">{t.title}</div>
                    <div className="text-muted-foreground mt-0.5 flex flex-wrap items-center gap-x-3 text-xs">
                      <span className={cn("flex items-center gap-1", g.key === "overdue" && "font-semibold text-red-600")}>
                        <CalendarClock className="size-3" />
                        {formatDate(t.dueAt, "dd.MM.yyyy HH:mm")}
                      </span>
                      {t.assigneeName ? <span>{t.assigneeName}</span> : null}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpen(t.leadId)}
                    className="text-brand-accent shrink-0 text-sm font-semibold hover:underline"
                  >
                    {t.leadName ?? `Сделка #${t.leadId}`} →
                  </button>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
