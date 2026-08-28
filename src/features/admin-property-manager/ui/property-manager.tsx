"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  PropertyBadge,
  fetchProperties,
  createProperty,
  updateProperty,
  removeProperty,
  type Property,
} from "@/entities/property";
import { fetchAgents } from "@/entities/agent";
import { queryKeys } from "@/shared/api/query-client";
import {
  LISTING_TYPES,
  LISTING_TYPE_LABELS,
  PROPERTY_CATEGORIES,
  PROPERTY_CATEGORY_LABELS,
  PROPERTY_KINDS,
  PROPERTY_KIND_LABELS,
  type ListingType,
  type PropertyCategory,
  type PropertyKind,
} from "@/shared/constants/property-types";
import {
  PROPERTY_STATUSES,
  PROPERTY_STATUS_LABELS,
  type PropertyStatus,
} from "@/shared/constants/statuses";
import { formatPrice } from "@/shared/lib/format-price";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { ImageInput } from "@/shared/ui/image-input";
import { Modal, ModalContent, ModalHeader, ModalTitle } from "@/shared/ui/modal";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80";

type Draft = {
  id?: string;
  title: string;
  area: string;
  city: string;
  price: string;
  category: PropertyCategory;
  listingType: ListingType;
  kind: PropertyKind;
  status: PropertyStatus;
  beds: string;
  baths: string;
  sqft: string;
  agentId: string;
  image: string;
};

const blank = (agentId: string): Draft => ({
  title: "",
  area: "",
  city: "Bishkek",
  price: "",
  category: "complex",
  listingType: "buy",
  kind: "house",
  status: "for-sale",
  beds: "3",
  baths: "2",
  sqft: "1800",
  agentId,
  image: "",
});

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || `home-${Date.now()}`;

export function PropertyManager() {
  const queryClient = useQueryClient();
  const { data } = useQuery({ queryKey: queryKeys.properties(), queryFn: () => fetchProperties() });
  const { data: agentData } = useQuery({ queryKey: queryKeys.agents(), queryFn: fetchAgents });
  const properties = data ?? [];
  const agents = agentData ?? [];
  const refresh = () => queryClient.invalidateQueries({ queryKey: queryKeys.properties() });
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>(blank(agents[0]?.id ?? ""));

  function openNew() {
    setEditingId(null);
    setDraft(blank(agents[0]?.id ?? ""));
    setOpen(true);
  }

  function openEdit(p: Property) {
    setEditingId(p.id);
    setDraft({
      id: p.id,
      title: p.title,
      area: p.area,
      city: p.city,
      price: String(p.price),
      category: p.category,
      listingType: p.listingType,
      kind: p.kind,
      status: p.status,
      beds: String(p.beds),
      baths: String(p.baths),
      sqft: String(p.sqft),
      agentId: p.agentId,
      image: p.images[0] ?? "",
    });
    setOpen(true);
  }

  async function save() {
    if (!draft.title.trim() || !draft.area.trim()) {
      toast.error("Title and neighborhood are required");
      return;
    }
    const existing = editingId ? properties.find((p) => p.id === editingId) : undefined;
    const property: Property = {
      id: existing?.id ?? `prop-${Date.now()}`,
      slug: existing?.slug ?? slugify(draft.title),
      title: draft.title.trim(),
      area: draft.area.trim(),
      city: draft.city.trim() || "Bishkek",
      price: Number(draft.price) || 0,
      rentPeriod: draft.listingType === "rent" ? "month" : null,
      category: draft.category,
      listingType: draft.listingType,
      kind: draft.kind,
      status: draft.status,
      beds: Number(draft.beds) || 0,
      baths: Number(draft.baths) || 0,
      sqft: Number(draft.sqft) || 0,
      images: draft.image
        ? [draft.image, ...(existing?.images.slice(1) ?? [])]
        : (existing?.images ?? [FALLBACK_IMG]),
      description: existing?.description ?? "",
      features: existing?.features ?? [],
      agentId: draft.agentId || agents[0]?.id || "",
      coordinates: existing?.coordinates ?? { lat: 42.8746, lng: 74.5698 },
      featured: existing?.featured ?? false,
      createdAt: existing?.createdAt ?? new Date().toISOString().slice(0, 10),
    };
    try {
      if (editingId) await updateProperty(property);
      else await createProperty(property);
      refresh();
      toast.success(editingId ? "Property updated" : "Property added");
      setOpen(false);
    } catch {
      toast.error("Couldn't save. Check the API connection.");
    }
  }

  async function remove(p: Property) {
    try {
      await removeProperty(p.id);
      refresh();
      toast.message("Property deleted", { description: p.title });
    } catch {
      toast.error("Couldn't delete. Check the API connection.");
    }
  }

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setDraft((d) => ({ ...d, [k]: v }));

  return (
    <>
      <div className="mb-4 flex justify-end">
        <Button variant="lime" size="sm" onClick={openNew}>
          <Plus className="size-4" />
          Add property
        </Button>
      </div>

      <div className="border-border bg-card rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Listing</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <div className="font-medium">{p.title}</div>
                  <div className="text-muted-foreground text-xs">
                    {p.area}, {p.city}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground text-sm">
                  {LISTING_TYPE_LABELS[p.listingType]}
                </TableCell>
                <TableCell className="font-semibold">
                  {formatPrice(p.price, p.rentPeriod)}
                </TableCell>
                <TableCell>
                  <PropertyBadge status={p.status} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <IconBtn label="Edit" onClick={() => openEdit(p)}>
                      <Pencil className="size-4" />
                    </IconBtn>
                    <IconBtn label="Delete" danger onClick={() => remove(p)}>
                      <Trash2 className="size-4" />
                    </IconBtn>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <ModalHeader>
            <ModalTitle>{editingId ? "Edit property" : "Add property"}</ModalTitle>
          </ModalHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Title" className="sm:col-span-2">
              <Input value={draft.title} onChange={(e) => set("title", e.target.value)} />
            </Field>
            <Field label="Neighborhood">
              <Input value={draft.area} onChange={(e) => set("area", e.target.value)} />
            </Field>
            <Field label="City">
              <Input value={draft.city} onChange={(e) => set("city", e.target.value)} />
            </Field>
            <Field label="Price (USD)">
              <Input
                type="number"
                value={draft.price}
                onChange={(e) => set("price", e.target.value)}
              />
            </Field>
            <Field label="Category">
              <Picker
                value={draft.category}
                onChange={(v) => set("category", v as PropertyCategory)}
                options={PROPERTY_CATEGORIES.map((c) => ({
                  value: c,
                  label: PROPERTY_CATEGORY_LABELS[c],
                }))}
              />
            </Field>
            <Field label="Listing type">
              <Picker
                value={draft.listingType}
                onChange={(v) => set("listingType", v as ListingType)}
                options={LISTING_TYPES.map((lt) => ({ value: lt, label: LISTING_TYPE_LABELS[lt] }))}
              />
            </Field>
            <Field label="Home type">
              <Picker
                value={draft.kind}
                onChange={(v) => set("kind", v as PropertyKind)}
                options={PROPERTY_KINDS.map((k) => ({ value: k, label: PROPERTY_KIND_LABELS[k] }))}
              />
            </Field>
            <Field label="Status">
              <Picker
                value={draft.status}
                onChange={(v) => set("status", v as PropertyStatus)}
                options={PROPERTY_STATUSES.map((s) => ({
                  value: s,
                  label: PROPERTY_STATUS_LABELS[s],
                }))}
              />
            </Field>
            <Field label="Beds">
              <Input
                type="number"
                value={draft.beds}
                onChange={(e) => set("beds", e.target.value)}
              />
            </Field>
            <Field label="Baths">
              <Input
                type="number"
                value={draft.baths}
                onChange={(e) => set("baths", e.target.value)}
              />
            </Field>
            <Field label="Sqft">
              <Input
                type="number"
                value={draft.sqft}
                onChange={(e) => set("sqft", e.target.value)}
              />
            </Field>
            <Field label="Agent">
              <Picker
                value={draft.agentId}
                onChange={(v) => set("agentId", v)}
                options={agents.map((a) => ({ value: a.id, label: a.name }))}
              />
            </Field>
            <Field label="Image" className="sm:col-span-2">
              <ImageInput value={draft.image} onChange={(v) => set("image", v)} />
            </Field>
          </div>
          <div className="mt-2 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="lime" onClick={save}>
              {editingId ? "Save changes" : "Add property"}
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </>
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

function Picker({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((o) => (
          <SelectItem key={o.value} value={o.value}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function IconBtn({
  label,
  danger,
  onClick,
  children,
}: {
  label: string;
  danger?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`border-border text-muted-foreground grid size-9 place-items-center rounded-md border transition-colors ${
        danger ? "hover:bg-destructive hover:text-destructive-foreground" : "hover:bg-accent"
      }`}
    >
      {children}
    </button>
  );
}
