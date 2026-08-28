"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowDown, ArrowUp, FileUp, Loader2, Plus, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import {
  createCertificate,
  fetchCertificates,
  fetchPresentations,
  removeCertificate,
  removePresentation,
  reorderCertificates,
  savePresentation,
  updateCertificate,
  type Certificate,
  type Presentation,
  type PresentationsByLang,
} from "@/entities/certificate";
import { queryKeys } from "@/shared/api/query-client";
import { LANGUAGES, type LanguageCode } from "@/shared/constants/languages";
import { uploadFile } from "@/shared/api/upload";
import { Button } from "@/shared/ui/button";
import { Flag } from "@/shared/ui/flag";
import { ImageInput } from "@/shared/ui/image-input";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

const MAX_PRESENTATION_BYTES = 25 * 1024 * 1024; // 25 MB

const emptyDraft = (): Certificate => ({
  id: crypto.randomUUID(),
  title: "",
  issuer: "",
  year: String(new Date().getFullYear()),
  image: "",
});

export function CertificateManager() {
  const queryClient = useQueryClient();
  const { data } = useQuery({ queryKey: queryKeys.certificates(), queryFn: fetchCertificates });
  const certificates = data ?? [];
  const refresh = () => queryClient.invalidateQueries({ queryKey: queryKeys.certificates() });
  const [draft, setDraft] = useState<Certificate>(emptyDraft);

  async function onAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!draft.image) {
      toast.error("Upload a scan or paste an image URL first");
      return;
    }
    try {
      await createCertificate({ ...draft, title: draft.title.trim() || "Certificate" });
      await refresh();
      setDraft(emptyDraft());
      toast.success("Certificate added");
    } catch {
      toast.error("Couldn't save. Check the API connection.");
    }
  }

  async function onSave(certificate: Certificate) {
    try {
      await updateCertificate(certificate);
      await refresh();
    } catch {
      toast.error("Couldn't save. Check the API connection.");
      await refresh(); // drop the optimistic edit
    }
  }

  async function onRemove(id: string) {
    try {
      await removeCertificate(id);
      await refresh();
      toast.success("Certificate removed");
    } catch {
      toast.error("Couldn't delete. Check the API connection.");
    }
  }

  /** Swaps a certificate with its neighbour and persists the new order. */
  async function onMove(id: string, delta: -1 | 1) {
    const index = certificates.findIndex((c) => c.id === id);
    const target = index + delta;
    if (index === -1 || target < 0 || target >= certificates.length) return;
    const next = [...certificates];
    [next[index], next[target]] = [next[target], next[index]];
    queryClient.setQueryData(queryKeys.certificates(), next);
    try {
      await reorderCertificates(next.map((c) => c.id));
    } catch {
      toast.error("Couldn't reorder. Check the API connection.");
    } finally {
      await refresh();
    }
  }

  return (
    <div className="space-y-8">
      <PresentationCard />

      {/* Add form */}
      <section className="border-border bg-card rounded-xl border p-6">
        <h2 className="font-serif text-xl font-semibold">Add a certificate</h2>
        <form onSubmit={onAdd} className="mt-5 grid gap-5 md:grid-cols-[220px_1fr]">
          <div>
            <Label className="mb-2 block">Scan</Label>
            <ImageInput value={draft.image} onChange={(image) => setDraft({ ...draft, image })} />
          </div>
          <div className="grid content-start gap-4">
            <div>
              <Label htmlFor="cert-title" className="mb-2 block">
                Title
              </Label>
              <Input
                id="cert-title"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                placeholder="Certificate of independent valuation"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="cert-issuer" className="mb-2 block">
                  Issued by
                </Label>
                <Input
                  id="cert-issuer"
                  value={draft.issuer}
                  onChange={(e) => setDraft({ ...draft, issuer: e.target.value })}
                  placeholder="Chamber of Commerce KR"
                />
              </div>
              <div>
                <Label htmlFor="cert-year" className="mb-2 block">
                  Year
                </Label>
                <Input
                  id="cert-year"
                  value={draft.year}
                  onChange={(e) => setDraft({ ...draft, year: e.target.value })}
                  placeholder="2024"
                />
              </div>
            </div>
            <Button type="submit" variant="lime" className="justify-self-start">
              <Plus className="size-4" />
              Add certificate
            </Button>
          </div>
        </form>
      </section>

      {/* Existing */}
      <section>
        <h2 className="font-serif text-xl font-semibold">
          On the site{" "}
          <span className="text-muted-foreground text-sm font-normal">({certificates.length})</span>
        </h2>
        {certificates.length === 0 ? (
          <p className="border-border text-muted-foreground mt-4 rounded-xl border border-dashed p-8 text-center text-sm">
            Nothing uploaded yet — certificates you add here appear on /about/certificates.
          </p>
        ) : (
          <ul className="mt-4 grid gap-4 md:grid-cols-2">
            {certificates.map((c, i) => (
              <CertificateRow
                key={c.id}
                certificate={c}
                first={i === 0}
                last={i === certificates.length - 1}
                onSave={onSave}
                onMove={onMove}
                onRemove={onRemove}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

/**
 * One editable row. Fields are edited locally and pushed to the API on blur, so
 * typing a title doesn't fire a request per keystroke.
 */
function CertificateRow({
  certificate,
  first,
  last,
  onSave,
  onMove,
  onRemove,
}: {
  certificate: Certificate;
  first: boolean;
  last: boolean;
  onSave: (certificate: Certificate) => void;
  onMove: (id: string, delta: -1 | 1) => void;
  onRemove: (id: string) => void;
}) {
  const [local, setLocal] = useState(certificate);
  // Re-sync when the server copy changes (reorder, failed save, refetch).
  useEffect(() => setLocal(certificate), [certificate]);

  const commit = () => {
    if (
      local.title === certificate.title &&
      local.issuer === certificate.issuer &&
      local.year === certificate.year
    ) {
      return;
    }
    onSave(local);
  };

  return (
    <li className="border-border bg-card flex gap-4 rounded-xl border p-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={local.image}
        alt=""
        className="bg-muted size-24 shrink-0 rounded-lg object-contain"
      />
      <div className="min-w-0 flex-1 space-y-2">
        <Input
          value={local.title}
          onChange={(e) => setLocal({ ...local, title: e.target.value })}
          onBlur={commit}
          aria-label="Title"
        />
        <div className="grid grid-cols-2 gap-2">
          <Input
            value={local.issuer}
            onChange={(e) => setLocal({ ...local, issuer: e.target.value })}
            onBlur={commit}
            aria-label="Issued by"
          />
          <Input
            value={local.year}
            onChange={(e) => setLocal({ ...local, year: e.target.value })}
            onBlur={commit}
            aria-label="Year"
          />
        </div>
        <div className="flex items-center gap-1">
          <IconButton label="Move up" disabled={first} onClick={() => onMove(local.id, -1)}>
            <ArrowUp className="size-4" />
          </IconButton>
          <IconButton label="Move down" disabled={last} onClick={() => onMove(local.id, 1)}>
            <ArrowDown className="size-4" />
          </IconButton>
          <IconButton
            label="Delete"
            onClick={() => onRemove(local.id)}
            className="hover:text-destructive ml-auto"
          >
            <Trash2 className="size-4" />
          </IconButton>
        </div>
      </div>
    </li>
  );
}

function PresentationCard() {
  const queryClient = useQueryClient();
  const { data } = useQuery({ queryKey: queryKeys.presentations(), queryFn: fetchPresentations });
  const presentations: PresentationsByLang = data ?? {};

  async function onChange(lang: LanguageCode, next: Presentation | null) {
    try {
      if (next) await savePresentation(lang, next);
      else await removePresentation(lang);
      await queryClient.invalidateQueries({ queryKey: queryKeys.presentations() });
    } catch {
      toast.error("Couldn't save. Check the API connection.");
    }
  }

  return (
    <section className="border-border bg-card rounded-xl border p-6">
      <h2 className="font-serif text-xl font-semibold">Company presentation</h2>
      <p className="text-muted-foreground mt-1 text-sm">
        One file per language, offered for download on /about/documents/presentation. A language
        left empty falls back to <code>public/prezentation/presentation-&lt;lang&gt;.pdf</code> (or
        the shared <code>presentation.pdf</code>), and failing that to a PDF generated from that
        language&apos;s site copy.
      </p>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {LANGUAGES.map((language) => (
          <PresentationSlot
            key={language.code}
            language={language}
            presentation={presentations[language.code] ?? null}
            onChange={(next) => onChange(language.code, next)}
          />
        ))}
      </div>
    </section>
  );
}

function PresentationSlot({
  language,
  presentation,
  onChange,
}: {
  language: (typeof LANGUAGES)[number];
  presentation: Presentation | null;
  onChange: (next: Presentation | null) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState(presentation?.url ?? "");
  useEffect(() => setUrl(presentation?.url ?? ""), [presentation?.url]);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > MAX_PRESENTATION_BYTES) {
      toast.error("File is too large (max 25 MB)");
      return;
    }
    setUploading(true);
    try {
      const uploadedUrl = await uploadFile(file);
      onChange({ url: uploadedUrl, name: file.name });
      toast.success(`${language.label} presentation uploaded`);
    } catch {
      toast.error("Upload failed. Check the API connection.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="border-border rounded-lg border p-4">
      <div className="mb-3 flex items-center gap-2">
        <Flag code={language.code} />
        <span className="text-sm font-semibold">{language.label}</span>
        {presentation?.url ? null : (
          <span className="text-muted-foreground ml-auto text-xs">generated PDF</span>
        )}
      </div>

      <input
        ref={ref}
        type="file"
        accept=".pdf,.ppt,.pptx,application/pdf"
        onChange={onFile}
        className="hidden"
      />
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => ref.current?.click()}
        >
          {uploading ? <Loader2 className="size-4 animate-spin" /> : <FileUp className="size-4" />}
          {uploading ? "Uploading…" : presentation?.url ? "Replace" : "Upload file"}
        </Button>

        {presentation?.url ? (
          <span className="bg-muted flex min-w-0 items-center gap-2 rounded-full px-3 py-1.5 text-xs">
            <span className="max-w-[180px] truncate">{presentation.name || presentation.url}</span>
            <button
              type="button"
              aria-label={`Remove ${language.label} presentation`}
              onClick={() => onChange(null)}
              className="text-muted-foreground hover:text-destructive shrink-0"
            >
              <X className="size-3.5" />
            </button>
          </span>
        ) : null}
      </div>

      <Input
        className="mt-2"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onBlur={() => {
          const next = url.trim();
          if (next === (presentation?.url ?? "")) return;
          onChange(
            next
              ? { url: next, name: presentation?.name ?? `presentation-${language.code}.pdf` }
              : null,
          );
        }}
        placeholder="…or paste a link"
      />
    </div>
  );
}

function IconButton({
  label,
  onClick,
  disabled,
  className,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className={`border-border text-muted-foreground hover:bg-accent grid size-8 place-items-center rounded-md border transition-colors disabled:opacity-40 ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
