import { cn } from "@/shared/lib/cn";

export function PropertySkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("border-border bg-card overflow-hidden rounded-lg border", className)}>
      <div className="bg-muted h-60 animate-pulse" />
      <div className="space-y-3 p-[22px]">
        <div className="flex justify-between gap-3">
          <div className="bg-muted h-6 w-2/3 animate-pulse rounded" />
          <div className="bg-muted h-6 w-20 animate-pulse rounded" />
        </div>
        <div className="bg-muted h-4 w-1/2 animate-pulse rounded" />
        <div className="bg-muted h-4 w-full animate-pulse rounded" />
      </div>
    </div>
  );
}

export function PropertyGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-3 gap-[30px] max-lg:grid-cols-2 max-sm:grid-cols-1">
      {Array.from({ length: count }).map((_, i) => (
        <PropertySkeleton key={i} />
      ))}
    </div>
  );
}
