"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, FileImage } from "lucide-react";
import { CertificateCard, fetchCertificates } from "@/entities/certificate";
import { queryKeys } from "@/shared/api/query-client";
import { useTranslation } from "@/shared/i18n";
import { Loader } from "@/shared/ui/loader";
import { Modal, ModalContent } from "@/shared/ui/modal";
import { RevealGroup, RevealItem } from "@/shared/ui/reveal";

export function CertificatesGallery() {
  const { t } = useTranslation();
  const { data, isPending } = useQuery({
    queryKey: queryKeys.certificates(),
    queryFn: fetchCertificates,
  });
  const certificates = data ?? [];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const step = (delta: number) =>
    setOpenIndex((i) => (i === null ? i : (i + delta + certificates.length) % certificates.length));

  if (isPending) {
    return (
      <div className="grid place-items-center py-24">
        <Loader />
      </div>
    );
  }

  if (certificates.length === 0) {
    return (
      <div className="border-border grid place-items-center gap-3 rounded-xl border border-dashed py-24 text-center">
        <FileImage className="text-muted-foreground size-8" />
        <p className="m-0 font-serif text-2xl">{t("certs.empty")}</p>
        <p className="text-muted-foreground m-0 max-w-sm text-sm">{t("certs.emptySub")}</p>
      </div>
    );
  }

  const active = openIndex === null ? null : certificates[openIndex];

  return (
    <>
      <RevealGroup className="grid grid-cols-4 gap-7 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {certificates.map((c, i) => (
          <RevealItem key={c.id}>
            <CertificateCard certificate={c} onOpen={() => setOpenIndex(i)} />
          </RevealItem>
        ))}
      </RevealGroup>

      <Modal open={openIndex !== null} onOpenChange={(open) => !open && setOpenIndex(null)}>
        <ModalContent
          className="max-w-3xl"
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") step(1);
            if (e.key === "ArrowLeft") step(-1);
          }}
        >
          {active ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.image}
                alt={active.title}
                className="max-h-[70vh] w-full rounded-lg object-contain"
              />
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="m-0 font-serif text-xl font-semibold">{active.title}</h2>
                  {active.issuer || active.year ? (
                    <p className="text-muted-foreground m-0 mt-1 text-sm">
                      {[active.issuer, active.year].filter(Boolean).join(" · ")}
                    </p>
                  ) : null}
                </div>
                {certificates.length > 1 ? (
                  <div className="flex shrink-0 items-center gap-2">
                    <NavButton label={t("certs.prev")} onClick={() => step(-1)}>
                      <ChevronLeft className="size-4" />
                    </NavButton>
                    <span className="text-muted-foreground text-sm tabular-nums">
                      {(openIndex ?? 0) + 1} / {certificates.length}
                    </span>
                    <NavButton label={t("certs.next")} onClick={() => step(1)}>
                      <ChevronRight className="size-4" />
                    </NavButton>
                  </div>
                ) : null}
              </div>
            </>
          ) : null}
        </ModalContent>
      </Modal>
    </>
  );
}

function NavButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="border-border hover:bg-accent grid size-9 place-items-center rounded-full border transition-colors"
    >
      {children}
    </button>
  );
}
