"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { uploadImage } from "@/shared/api/upload";
import { Button } from "./button";
import { Input } from "./input";
import { cn } from "@/shared/lib/cn";

const MAX_BYTES = 3 * 1024 * 1024; // 3 MB — kept small since it persists to localStorage

export function ImageInput({
  value,
  onChange,
  rounded,
  className,
}: {
  value: string;
  onChange: (next: string) => void;
  rounded?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    if (file.size > MAX_BYTES) {
      toast.error("Image is too large (max 3 MB)");
      return;
    }
    setUploading(true);
    try {
      const url = await uploadImage(file);
      onChange(url);
    } catch {
      toast.error("Upload failed. Check the API connection.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "border-border bg-muted text-muted-foreground relative grid size-16 shrink-0 place-items-center overflow-hidden border",
            rounded ? "rounded-full" : "rounded-md",
          )}
        >
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="size-full object-cover" />
          ) : (
            <ImagePlus className="size-5" />
          )}
        </div>
        <div className="flex flex-col items-start gap-1.5">
          <input ref={ref} type="file" accept="image/*" onChange={onFile} className="hidden" />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading}
            onClick={() => ref.current?.click()}
          >
            {uploading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Upload className="size-4" />
            )}
            {uploading ? "Uploading…" : "Upload image"}
          </Button>
          {value ? (
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-muted-foreground hover:text-destructive flex items-center gap-1 text-xs"
            >
              <X className="size-3" />
              Remove
            </button>
          ) : null}
        </div>
      </div>
      <Input
        value={value.startsWith("data:") ? "" : value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="…or paste an image URL"
      />
    </div>
  );
}
