"use client";

import { Badge } from "@/shared/ui/badge";
import { type PropertyStatus } from "@/shared/constants/statuses";
import { useTranslation } from "@/shared/i18n";
import { cn } from "@/shared/lib/cn";

const variantByStatus: Record<PropertyStatus, "default" | "lime" | "amber" | "ink"> = {
  "for-sale": "default",
  "to-let": "lime",
  "new-build": "amber",
  sold: "ink",
};

export function PropertyBadge({
  status,
  className,
}: {
  status: PropertyStatus;
  className?: string;
}) {
  const { t } = useTranslation();
  return (
    <Badge variant={variantByStatus[status]} className={cn(className)}>
      {t(`status.${status}`)}
    </Badge>
  );
}
