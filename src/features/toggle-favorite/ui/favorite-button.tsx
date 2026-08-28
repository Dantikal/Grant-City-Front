"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { toggleFavorite, useIsFavorite } from "../model/use-favorites";
import { cn } from "@/shared/lib/cn";

export function FavoriteButton({
  propertyId,
  title,
  className,
}: {
  propertyId: string;
  title?: string;
  className?: string;
}) {
  const isFavorite = useIsFavorite(propertyId);

  async function onClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const added = await toggleFavorite(propertyId);
    toast[added ? "success" : "message"](
      added ? "Saved to favorites" : "Removed from favorites",
      title ? { description: title } : undefined,
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.85 }}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "Remove from favorites" : "Save to favorites"}
      className={cn(
        "bg-background/90 text-foreground hover:bg-background grid size-9 place-items-center rounded-full shadow-sm backdrop-blur transition-colors",
        className,
      )}
    >
      <Heart
        className={cn(
          "size-4 transition-colors",
          isFavorite ? "fill-brand-amber text-brand-amber" : "text-foreground",
        )}
      />
    </motion.button>
  );
}
