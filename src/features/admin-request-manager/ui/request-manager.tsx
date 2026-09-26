"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteRequest, listRequests, updateRequestStatus } from "@/entities/request";
import { queryKeys } from "@/shared/api/query-client";
import {
  REQUEST_STATUSES,
  REQUEST_STATUS_LABELS,
  type RequestStatus,
} from "@/shared/constants/statuses";
import { Badge } from "@/shared/ui/badge";
import { Loader } from "@/shared/ui/loader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { formatDate } from "@/shared/lib/format-date";

const statusVariant: Record<RequestStatus, "lime" | "amber" | "muted"> = {
  new: "lime",
  "in-progress": "amber",
  meeting: "amber",
  contract: "amber",
  won: "muted",
  lost: "muted",
};

export function RequestManager() {
  const queryClient = useQueryClient();
  const { data: requests, isLoading } = useQuery({
    queryKey: queryKeys.requests(),
    queryFn: listRequests,
  });

  const refresh = () => queryClient.invalidateQueries({ queryKey: queryKeys.requests() });

  async function onStatus(id: number | string, status: RequestStatus) {
    await updateRequestStatus(id, status);
    refresh();
  }

  async function onDelete(id: number | string) {
    await deleteRequest(id);
    toast.message("Request deleted");
    refresh();
  }

  if (isLoading || !requests) return <Loader label="Loading requests…" />;
  if (requests.length === 0)
    return (
      <p className="border-border text-muted-foreground rounded-lg border border-dashed p-10 text-center">
        No requests yet. Submissions from the contact form will appear here.
      </p>
    );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>From</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Received</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((r) => (
          <TableRow key={r.id}>
            <TableCell>
              <div className="font-medium">{r.name}</div>
              <div className="text-muted-foreground text-xs">{r.email}</div>
            </TableCell>
            <TableCell>
              <Badge variant="outline">{r.kind}</Badge>
            </TableCell>
            <TableCell className="max-w-xs">
              <p className="text-muted-foreground line-clamp-2 text-sm">{r.message}</p>
            </TableCell>
            <TableCell className="text-muted-foreground text-sm whitespace-nowrap">
              {formatDate(r.createdAt, "d MMM, HH:mm")}
            </TableCell>
            <TableCell>
              <Badge variant={statusVariant[r.status]}>{REQUEST_STATUS_LABELS[r.status]}</Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center justify-end gap-2">
                <Select value={r.status} onValueChange={(v) => onStatus(r.id!, v as RequestStatus)}>
                  <SelectTrigger className="h-9 w-[140px] text-xs">
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
                <button
                  type="button"
                  aria-label="Delete request"
                  onClick={() => onDelete(r.id!)}
                  className="border-border text-muted-foreground hover:bg-destructive hover:text-destructive-foreground grid size-9 place-items-center rounded-md border transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
