"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { fetchAgents, createAgent, updateAgent, removeAgent, type Agent } from "@/entities/agent";
import { queryKeys } from "@/shared/api/query-client";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Label } from "@/shared/ui/label";
import { ImageInput } from "@/shared/ui/image-input";
import { Modal, ModalContent, ModalHeader, ModalTitle } from "@/shared/ui/modal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";

const FALLBACK =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80";

type Draft = {
  name: string;
  role: string;
  email: string;
  phone: string;
  bio: string;
  areas: string;
  specialties: string;
  photo: string;
};

const blank: Draft = {
  name: "",
  role: "Agent",
  email: "",
  phone: "",
  bio: "",
  areas: "",
  specialties: "",
  photo: "",
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || `agent-${Date.now()}`;
const list = (s: string) =>
  s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

export function AgentManager() {
  const queryClient = useQueryClient();
  const { data } = useQuery({ queryKey: queryKeys.agents(), queryFn: fetchAgents });
  const agents = data ?? [];
  const refresh = () => queryClient.invalidateQueries({ queryKey: queryKeys.agents() });
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>(blank);

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setDraft((d) => ({ ...d, [k]: v }));

  function openNew() {
    setEditingId(null);
    setDraft(blank);
    setOpen(true);
  }
  function openEdit(a: Agent) {
    setEditingId(a.id);
    setDraft({
      name: a.name,
      role: a.role,
      email: a.email,
      phone: a.phone,
      bio: a.bio,
      areas: a.areas.join(", "),
      specialties: a.specialties.join(", "),
      photo: a.photo,
    });
    setOpen(true);
  }
  async function save() {
    if (!draft.name.trim()) {
      toast.error("Name is required");
      return;
    }
    const existing = editingId ? agents.find((a) => a.id === editingId) : undefined;
    const agent: Agent = {
      id: existing?.id ?? `agent-${Date.now()}`,
      slug: existing?.slug ?? slugify(draft.name),
      name: draft.name.trim(),
      role: draft.role.trim() || "Agent",
      bio: draft.bio.trim(),
      longBio: existing?.longBio ?? draft.bio.trim(),
      photo: draft.photo.trim() || existing?.photo || FALLBACK,
      email: draft.email.trim(),
      phone: draft.phone.trim(),
      specialties: list(draft.specialties),
      areas: list(draft.areas),
      salesCount: existing?.salesCount ?? 0,
      rating: existing?.rating ?? 4.8,
      since: existing?.since ?? new Date().getFullYear(),
    };
    try {
      if (editingId) await updateAgent(agent);
      else await createAgent(agent);
      refresh();
      toast.success(editingId ? "Agent updated" : "Agent added");
      setOpen(false);
    } catch {
      toast.error("Couldn't save. Check the API connection.");
    }
  }

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Button variant="lime" size="sm" onClick={openNew}>
          <Plus className="size-4" />
          Add agent
        </Button>
      </div>

      <div className="border-border bg-card rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agent</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Areas</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agents.map((a) => (
              <TableRow key={a.id}>
                <TableCell>
                  <div className="font-medium">{a.name}</div>
                  <div className="text-muted-foreground text-xs">{a.email}</div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">{a.role}</TableCell>
                <TableCell className="text-muted-foreground max-w-[200px] truncate text-sm">
                  {a.areas.join(", ")}
                </TableCell>
                <TableCell>
                  <Badge variant="amber">{a.rating.toFixed(1)} ★</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <button
                      type="button"
                      aria-label="Edit"
                      onClick={() => openEdit(a)}
                      className="border-border text-muted-foreground hover:bg-accent grid size-9 place-items-center rounded-md border transition-colors"
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      type="button"
                      aria-label="Delete"
                      onClick={async () => {
                        try {
                          await removeAgent(a.id);
                          refresh();
                          toast.message("Agent deleted", { description: a.name });
                        } catch {
                          toast.error("Couldn't delete. Check the API connection.");
                        }
                      }}
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
      </div>

      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
          <ModalHeader>
            <ModalTitle>{editingId ? "Edit agent" : "Add agent"}</ModalTitle>
          </ModalHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <F label="Name">
              <Input value={draft.name} onChange={(e) => set("name", e.target.value)} />
            </F>
            <F label="Role">
              <Input value={draft.role} onChange={(e) => set("role", e.target.value)} />
            </F>
            <F label="Email">
              <Input value={draft.email} onChange={(e) => set("email", e.target.value)} />
            </F>
            <F label="Phone">
              <Input value={draft.phone} onChange={(e) => set("phone", e.target.value)} />
            </F>
            <F label="Areas (comma-separated)" full>
              <Input value={draft.areas} onChange={(e) => set("areas", e.target.value)} />
            </F>
            <F label="Specialties (comma-separated)" full>
              <Input
                value={draft.specialties}
                onChange={(e) => set("specialties", e.target.value)}
              />
            </F>
            <F label="Photo" full>
              <ImageInput value={draft.photo} onChange={(v) => set("photo", v)} rounded />
            </F>
            <F label="Bio" full>
              <Textarea rows={3} value={draft.bio} onChange={(e) => set("bio", e.target.value)} />
            </F>
          </div>
          <div className="mt-2 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="lime" onClick={save}>
              {editingId ? "Save changes" : "Add agent"}
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}

function F({
  label,
  full,
  children,
}: {
  label: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`space-y-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}
