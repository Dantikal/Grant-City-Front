"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { Property } from "@/entities/property";
import type { Agent } from "@/entities/agent";
import { formatPrice } from "@/shared/lib/format-price";
import { useTranslation } from "@/shared/i18n";
import { Button, type ButtonProps } from "@/shared/ui/button";

export function DownloadBrochureButton({
  property,
  agent,
  variant = "outline",
}: {
  property: Property;
  agent?: Agent;
  variant?: ButtonProps["variant"];
}) {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  async function onClick() {
    setLoading(true);
    try {
      // Lazy-load @react-pdf so it stays out of the initial bundle.
      const { generateBrochure } = await import("@/shared/lib/pdf-generator");
      const descKey = `prop.${property.id}.desc`;
      const descVal = t(descKey);
      const featKey = `prop.${property.id}.features`;
      const featVal = t(featKey);
      const blob = await generateBrochure({
        title: property.title,
        location: `${property.area}, ${property.city}`,
        price: formatPrice(property.price, property.rentPeriod),
        beds: property.beds,
        baths: property.baths,
        sqft: property.sqft,
        description: descVal === descKey ? property.description : descVal,
        features: featVal === featKey ? property.features : featVal.split(" | "),
        image: property.images[0],
        agent: agent ? { name: agent.name, phone: agent.phone, email: agent.email } : undefined,
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${property.slug}-brochure.pdf`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success("Brochure downloaded");
    } catch {
      toast.error("Couldn't generate the brochure. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button variant={variant} size="lg" onClick={onClick} disabled={loading}>
      {loading ? <Loader2 className="size-4 animate-spin" /> : <Download className="size-4" />}
      Download brochure
    </Button>
  );
}
