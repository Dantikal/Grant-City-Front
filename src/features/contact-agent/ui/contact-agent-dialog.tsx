"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { RequestForm } from "@/features/create-request";
import { Button, type ButtonProps } from "@/shared/ui/button";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/shared/ui/modal";

export function ContactAgentDialog({
  agentName,
  triggerLabel = "Contact agent",
  variant = "default",
}: {
  agentName?: string;
  triggerLabel?: string;
  variant?: ButtonProps["variant"];
}) {
  const [open, setOpen] = useState(false);

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button variant={variant}>
          <Mail className="size-4" />
          {triggerLabel}
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{agentName ? `Message ${agentName}` : "Get in touch"}</ModalTitle>
          <ModalDescription>
            Tell us a little about what you&apos;re looking for and we&apos;ll be in touch within a
            day.
          </ModalDescription>
        </ModalHeader>
        <RequestForm defaultKind="general" onSuccess={() => setOpen(false)} />
      </ModalContent>
    </Modal>
  );
}
