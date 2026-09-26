"use client";

import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { isPast, parseISO } from "date-fns";
import { CalendarClock, Phone, Search, UserX } from "lucide-react";
import { toast } from "sonner";
import { fetchAgents } from "@/entities/agent";
import {
  DEPARTMENT_LABELS,
  DEPARTMENTS,
  fetchLeads,
  KIND_LABELS,
  STAGE_TONE,
  updateLead,
  type Lead,
} from "@/entities/crm";
import { queryKeys } from "@/shared/api/query-client";
import {
  REQUEST_STATUSES,
  REQUEST_STATUS_LABELS,
  type RequestStatus,
} from "@/shared/constants/statuses";
import { Input } from "@/shared/ui/input";
import { Loader } from "@/shared/ui/loader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { formatDate } from "@/shared/lib/format-date";
import { cn } from "@/shared/lib/cn";

const ALL = "all";
const UNASSIGNED = "unassigned";
/** New leads show up without a reload. */
const POLL_MS = 30_000;
/** Custom drag type, so text dragged in from elsewhere can't move a lead. */
const DRAG_TYPE = "application/x-gc-lead";

export function CrmBoard({ onOpen }: { onOpen: (id: number) => void }) {
  const queryClient = useQueryClient();
  const { data: leads, isLoading } = useQuery({
    queryKey: [...queryKeys.crm(), "leads"],
    queryFn: fetchLeads,
    refetchInterval: POLL_MS,
  });
  const { data: agents } = useQuery({ queryKey: queryKeys.agents(), queryFn: fetchAgents });

  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState(ALL);
  const [assignee, setAssignee] = useState(ALL);
  const [dragOver, setDragOver] = useState<RequestStatus | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (leads ?? []).filter(
      (l) =>
        (department === ALL || l.department === department) &&
        (assignee === ALL || (assignee === UNASSIGNED ? !l.assigneeId : l.assigneeId === assignee)) &&
        (!q || [l.name, l.email, l.phone ?? "", l.message].some((f) => f.toLowerCase().includes(q))),
    );
  }, [leads, query, department, assignee]);

  async function move(id: number, status: RequestStatus) {
    const key = [...queryKeys.crm(), "leads"];
    const previous = queryClient.getQueryData<Lead[]>(key);
    if (previous?.find((l) => l.id === id)?.status === status) return;
    // Optimistic: the card lands in its new column immediately.
    queryClient.setQueryData<Lead[]>(key, (old) => old?.map((l) => (l.id === id ? { ...l, status } : l)));
    try {
      await updateLead(id, { status });
      toast.success(`Этап: ${REQUEST_STATUS_LABELS[status]}`);
    } catch (e) {
      queryClient.setQueryData(key, previous);
      toast.error(e instanceof Error ? e.message : "Не удалось сменить этап");
    } finally {
      queryClient.invalidateQueries({ queryKey: queryKeys.crm() });
    }
  }

  if (isLoading || !leads) return <Loader label="Загрузка воронки…" />;

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
          <Input
            placeholder="Поиск: имя, телефон, email, текст"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={department} onValueChange={setDepartment}>
          <SelectTrigger className="w-[230px]" aria-label="Отдел">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>Все отделы</SelectItem>
            {DEPARTMENTS.map((d) => (
              <SelectItem key={d} value={d}>
                {DEPARTMENT_LABELS[d]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={assignee} onValueChange={setAssignee}>
          <SelectTrigger className="w-[200px]" aria-label="Ответственный">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>Все сотрудники</SelectItem>
            <SelectItem value={UNASSIGNED}>Без ответственного</SelectItem>
            {(agents ?? []).map((a) => (
              <SelectItem key={a.id} value={a.id}>
                {a.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Columns scroll sideways on narrow screens rather than squashing the cards. */}
      <div className="-mx-1 overflow-x-auto pb-4">
        <div className="grid min-w-[960px] grid-cols-6 gap-2.5 px-1">
          {REQUEST_STATUSES.map((stage) => {
            const column = filtered.filter((l) => l.status === stage);
            return (
              <div
                key={stage}
                data-stage={stage}
                onDragOver={(e) => {
                  if (!e.dataTransfer.types.includes(DRAG_TYPE)) return;
                  e.preventDefault();
                  setDragOver(stage);
                }}
                onDragLeave={() => setDragOver((s) => (s === stage ? null : s))}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(null);
                  const id = Number(e.dataTransfer.getData(DRAG_TYPE));
                  if (id) move(id, stage);
                }}
                className={cn(
                  "bg-muted/60 flex min-h-[420px] flex-col rounded-xl p-2 transition-colors",
                  dragOver === stage && "bg-brand-green/10 ring-brand-green/40 ring-2",
                )}
              >
                <div className="flex items-center gap-2 px-2 pt-1 pb-3">
                  <span className={cn("size-2 rounded-full", STAGE_TONE[stage])} />
                  <span className="text-sm font-semibold">{REQUEST_STATUS_LABELS[stage]}</span>
                  <span className="text-muted-foreground ml-auto text-xs font-semibold">{column.length}</span>
                </div>
                <div className="flex flex-col gap-2">
                  {column.map((lead) => (
                    <LeadCard key={lead.id} lead={lead} onOpen={() => onOpen(lead.id)} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function LeadCard({ lead, onOpen }: { lead: Lead; onOpen: () => void }) {
  const overdue = lead.overdueTasks > 0;
  return (
    <button
      type="button"
      draggable
      data-lead={lead.id}
      onDragStart={(e) => {
        e.dataTransfer.setData(DRAG_TYPE, String(lead.id));
        e.dataTransfer.effectAllowed = "move";
      }}
      onClick={onOpen}
      className="border-border bg-card hover:border-brand-green/50 cursor-grab rounded-lg border p-3 text-left shadow-sm transition-colors active:cursor-grabbing"
    >
      <div className="text-muted-foreground text-[11px] font-semibold tracking-wide uppercase">
        {KIND_LABELS[lead.kind] ?? lead.kind}
      </div>
      <div className="mt-1 line-clamp-1 text-sm font-semibold">{lead.name}</div>
      {lead.phone ? (
        <div className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
          <Phone className="size-3" /> {lead.phone}
        </div>
      ) : null}
      <p className="text-muted-foreground mt-1.5 line-clamp-2 text-xs leading-snug">{lead.message}</p>

      <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
        {lead.assigneeName ? (
          <span className="bg-accent rounded-full px-2 py-0.5 text-[11px] font-medium">{lead.assigneeName}</span>
        ) : (
          <span className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-semibold text-red-700 dark:bg-red-950 dark:text-red-300">
            <UserX className="size-3" /> Не назначен
          </span>
        )}
        {lead.nextDueAt ? (
          <span
            className={cn(
              "flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
              overdue || isPast(parseISO(lead.nextDueAt))
                ? "bg-red-100 font-semibold text-red-700 dark:bg-red-950 dark:text-red-300"
                : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
            )}
          >
            <CalendarClock className="size-3" />
            {overdue ? `Просрочено: ${lead.overdueTasks}` : formatDate(lead.nextDueAt, "dd.MM HH:mm")}
          </span>
        ) : null}
      </div>
      <div className="text-muted-foreground mt-2 text-[11px]">{formatDate(lead.createdAt, "dd.MM.yyyy HH:mm")}</div>
    </button>
  );
}
