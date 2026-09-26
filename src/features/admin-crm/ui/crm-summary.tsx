"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AlarmClock, Inbox, ListTodo, Send, UserX } from "lucide-react";
import { toast } from "sonner";
import { fetchCrmSummary, sendTelegramTest } from "@/entities/crm";
import { queryKeys } from "@/shared/api/query-client";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/cn";

/** Headline numbers for the pipeline plus the Telegram connection status. */
export function CrmSummaryCards() {
  const { data } = useQuery({
    queryKey: [...queryKeys.crm(), "summary"],
    queryFn: fetchCrmSummary,
    refetchInterval: 30_000,
  });
  const [testing, setTesting] = useState(false);

  const open = data
    ? Object.entries(data.byStage)
        .filter(([s]) => s !== "won" && s !== "lost")
        .reduce((n, [, c]) => n + c, 0)
    : 0;

  const cards = [
    { label: "Новые заявки", value: data?.byStage.new ?? 0, icon: Inbox, alert: false },
    { label: "Сделок в работе", value: open, icon: ListTodo, alert: false },
    { label: "Без ответственного", value: data?.unassigned ?? 0, icon: UserX, alert: (data?.unassigned ?? 0) > 0 },
    { label: "Просроченные задачи", value: data?.overdueTasks ?? 0, icon: AlarmClock, alert: (data?.overdueTasks ?? 0) > 0 },
  ];

  async function test() {
    setTesting(true);
    try {
      const sent = await sendTelegramTest();
      if (sent) toast.success("Тестовое сообщение отправлено в Telegram");
      else toast.error("Telegram не ответил. Проверьте токен бота и ID чата.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Ошибка отправки");
    } finally {
      setTesting(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.label}
              className={cn(
                "border-border bg-card rounded-xl border p-5",
                c.alert && "border-red-300 dark:border-red-900",
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">{c.label}</span>
                <Icon className={cn("size-4", c.alert ? "text-red-600" : "text-brand-accent")} />
              </div>
              <div className={cn("mt-3 font-serif text-4xl font-semibold", c.alert && "text-red-600")}>
                {c.value}
              </div>
            </div>
          );
        })}
      </div>

      {data ? (
        <div className="border-border bg-card flex flex-wrap items-center gap-3 rounded-xl border px-5 py-3 text-sm">
          <Send className="text-brand-accent size-4" />
          {data.telegramEnabled ? (
            <>
              <span>Telegram подключён — новые заявки и напоминания о задачах приходят в чат.</span>
              <Button size="sm" variant="outline" className="ml-auto" onClick={test} disabled={testing}>
                Отправить тест
              </Button>
            </>
          ) : (
            <span className="text-muted-foreground">
              Уведомления в Telegram выключены: на сервере не заданы <code>TELEGRAM_BOT_TOKEN</code> и{" "}
              <code>TELEGRAM_CHAT_ID</code>.
            </span>
          )}
        </div>
      ) : null}
    </div>
  );
}
