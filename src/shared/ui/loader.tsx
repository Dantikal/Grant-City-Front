import { Loader2 } from "lucide-react";
import { cn } from "@/shared/lib/cn";

export function Loader({ className, label }: { className?: string; label?: string }) {
  return (
    <div
      className={cn(
        "text-muted-foreground flex items-center justify-center gap-3 py-10",
        className,
      )}
    >
      <Loader2 className="size-5 animate-spin" />
      {label ? <span className="text-sm">{label}</span> : null}
    </div>
  );
}
