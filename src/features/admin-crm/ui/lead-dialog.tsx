"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { isPast, parseISO } from "date-fns";
import { Bot, CalendarClock, Mail, Phone, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { fetchAgents, type Department } from "@/entities/agent";
import {
  addLeadNote,
  addLeadTask,
  deleteTask,
  DEPARTMENT_LABELS,
  DEPARTMENTS,
  fetchLead,
  KIND_LABELS,
  updateLead,
  updateTask,
  type LeadPatch,
} from "@/entities/crm";
import { queryKeys } from "@/shared/api/query-client";
import {
  REQUEST_STATUSES,
  REQUEST_STATUS_LABELS,
  type RequestStatus,
} from "@/shared/constants/statuses";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Loader } from "@/shared/ui/loader";
import { Modal, ModalContent, ModalHeader, ModalTitle } from "@/shared/ui/modal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Textarea } from "@/shared/ui/textarea";
import { formatDate } from "@/shared/lib/format-date";
import { cn } from "@/shared/lib/cn";

/** Radix Select can't hold an empty value, so "no assignee" gets a sentinel. */
const NONE = "none";

/** Default due time for a new task: tomorrow at 10:00, in the datetime-local format. */
function tomorrowAtTen() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(10, 0, 0, 0);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T10:00`;
}

export function LeadDialog({ leadId, onClose }: { leadId: number | null; onClose: () => void }) {
  return (
    <Modal open={leadId !== null} onOpenChange={(o) => !o && onClose()}>
      <ModalContent className="max-h-[92vh] max-w-3xl overflow-y-auto">
        {leadId !== null ? <LeadBody leadId={leadId} /> : null}
      </ModalContent>
    </Modal>
  );
}

function LeadBody({ leadId }: { leadId: number }) {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: queryKeys.crmLead(leadId),
    queryFn: () => fetchLead(leadId),
    retry: false,
  });
  const { data: agents } = useQuery({ queryKey: queryKeys.agents(), queryFn: fetchAgents });

  const [note, setNote] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDue, setTaskDue] = useState(tomorrowAtTen);
  const [busy, setBusy] = useState(false);

  // Everything on the board derives from the same data, so refresh it all at once.
  const refresh = () => queryClient.invalidateQueries({ queryKey: queryKeys.crm() });

  async function run(action: () => Promise<unknown>, success?: string) {
    setBusy(true);
    try {
      await action();
      if (success) toast.success(success);
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Не удалось сохранить");
    } finally {
      setBusy(false);
    }
  }

  const patch = (p: LeadPatch) => run(() => updateLead(leadId, p));

  if (isError)
    return (
      <ModalHeader>
        <ModalTitle>Сделка не найдена</ModalTitle>
        <p className="text-muted-foreground text-sm">
          Возможно, заявку удалили. Закройте окно и обновите доску.
        </p>
      </ModalHeader>
    );
  if (isLoading || !data) return <Loader label="Загрузка сделки…" />;
  const { lead, notes, tasks } = data;

  return (
    <div className="space-y-7">
      <ModalHeader>
        <div className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          Сделка #{lead.id} · {KIND_LABELS[lead.kind] ?? lead.kind} ·{" "}
          {formatDate(lead.createdAt, "dd.MM.yyyy HH:mm")}
        </div>
        <ModalTitle className="pr-8">{lead.name}</ModalTitle>
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
          {lead.phone ? (
            <a href={`tel:${lead.phone}`} className="hover:text-brand-accent flex items-center gap-1.5">
              <Phone className="size-3.5" /> {lead.phone}
            </a>
          ) : null}
          <a href={`mailto:${lead.email}`} className="hover:text-brand-accent flex items-center gap-1.5">
            <Mail className="size-3.5" /> {lead.email}
          </a>
        </div>
      </ModalHeader>

      <p className="bg-muted rounded-lg p-4 text-[15px] leading-relaxed whitespace-pre-line">
        {lead.message}
      </p>

      {/* Pipeline controls */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label>Этап</Label>
          <Select
            value={lead.status}
            onValueChange={(v) => patch({ status: v as RequestStatus })}
            disabled={busy}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {REQUEST_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {REQUEST_STATUS_LABELS[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Ответственный</Label>
          <Select
            value={lead.assigneeId ?? NONE}
            onValueChange={(v) => patch({ assigneeId: v === NONE ? "" : v })}
            disabled={busy}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={NONE}>Не назначен</SelectItem>
              {(agents ?? []).map((a) => (
                <SelectItem key={a.id} value={a.id}>
                  {a.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label>Отдел</Label>
          <Select
            value={lead.department ?? ""}
            onValueChange={(v) => patch({ department: v as Department })}
            disabled={busy}
          >
            <SelectTrigger>
              <SelectValue placeholder="Не выбран" />
            </SelectTrigger>
            <SelectContent>
              {DEPARTMENTS.map((d) => (
                <SelectItem key={d} value={d}>
                  {DEPARTMENT_LABELS[d]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tasks */}
      <section>
        <h3 className="mb-3 font-serif text-xl font-semibold">Задачи</h3>
        {tasks.length === 0 ? (
          <p className="text-muted-foreground mb-3 text-sm">Задач пока нет.</p>
        ) : (
          <ul className="mb-4 space-y-2">
            {tasks.map((t) => {
              const overdue = !t.done && isPast(parseISO(t.dueAt));
              return (
                <li
                  key={t.id}
                  className={cn(
                    "border-border flex items-center gap-3 rounded-lg border px-3 py-2.5",
                    overdue && "border-red-300 bg-red-50 dark:border-red-900 dark:bg-red-950/40",
                  )}
                >
                  <input
                    type="checkbox"
                    aria-label="Выполнено"
                    className="accent-brand-green size-4 shrink-0 cursor-pointer"
                    checked={t.done}
                    disabled={busy}
                    onChange={(e) =>
                      run(() => updateTask(t.id, { done: e.target.checked }), e.target.checked ? "Задача выполнена" : undefined)
                    }
                  />
                  <div className="min-w-0 flex-1">
                    <div className={cn("text-sm font-medium", t.done && "text-muted-foreground line-through")}>
                      {t.title}
                    </div>
                    <div className={cn("text-muted-foreground flex items-center gap-1.5 text-xs", overdue && "font-semibold text-red-600")}>
                      <CalendarClock className="size-3" />
                      {formatDate(t.dueAt, "dd.MM.yyyy HH:mm")}
                      {overdue ? " · просрочена" : ""}
                      {t.assigneeName ? ` · ${t.assigneeName}` : ""}
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label="Удалить задачу"
                    disabled={busy}
                    onClick={() => run(() => deleteTask(t.id))}
                    className="text-muted-foreground hover:text-destructive grid size-8 place-items-center rounded-md transition-colors"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        <form
          className="flex flex-col gap-2 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            if (!taskTitle.trim() || !taskDue) return;
            run(async () => {
              await addLeadTask(leadId, { title: taskTitle.trim(), dueAt: new Date(taskDue).toISOString() });
              setTaskTitle("");
              setTaskDue(tomorrowAtTen());
            }, "Задача добавлена");
          }}
        >
          <Input
            placeholder="Например: перезвонить клиенту"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="flex-1"
            aria-label="Новая задача"
          />
          <Input
            type="datetime-local"
            value={taskDue}
            onChange={(e) => setTaskDue(e.target.value)}
            className="sm:w-[210px]"
            aria-label="Срок"
          />
          <Button type="submit" variant="outline" disabled={busy || !taskTitle.trim()}>
            Добавить
          </Button>
        </form>
      </section>

      {/* Timeline */}
      <section>
        <h3 className="mb-3 font-serif text-xl font-semibold">История</h3>
        <form
          className="mb-5 space-y-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!note.trim()) return;
            run(async () => {
              await addLeadNote(leadId, note.trim());
              setNote("");
            });
          }}
        >
          <Textarea
            rows={2}
            placeholder="Комментарий: о чём договорились, что важно клиенту…"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            aria-label="Комментарий"
          />
          <Button type="submit" size="sm" variant="lime" disabled={busy || !note.trim()}>
            Добавить комментарий
          </Button>
        </form>
        <ol className="border-border space-y-4 border-l pl-5">
          {notes.map((n) => (
            <li key={n.id} className="relative">
              <span
                className={cn(
                  "ring-background absolute top-1.5 -left-[25px] size-2.5 rounded-full ring-4",
                  n.kind === "system" ? "bg-zinc-300 dark:bg-zinc-600" : "bg-brand-green",
                )}
              />
              <div className="text-muted-foreground flex items-center gap-1.5 text-xs">
                {n.kind === "system" && !n.author ? <Bot className="size-3" /> : null}
                {formatDate(n.createdAt, "dd.MM.yyyy HH:mm")}
                {n.author ? ` · ${n.author}` : n.kind === "system" ? " · автоматически" : ""}
              </div>
              <p className={cn("mt-0.5 text-sm whitespace-pre-line", n.kind === "system" && "text-muted-foreground")}>
                {n.text}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
