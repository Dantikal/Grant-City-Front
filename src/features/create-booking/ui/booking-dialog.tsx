"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarDays, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { bookingSchema, createBooking, type BookingFormValues } from "@/entities/booking";
import { Button, type ButtonProps } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Label } from "@/shared/ui/label";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "@/shared/ui/modal";

export function BookingDialog({
  propertyId,
  propertyTitle,
  variant = "lime",
}: {
  propertyId: string;
  propertyTitle: string;
  variant?: ButtonProps["variant"];
}) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { propertyId, name: "", email: "", phone: "", date: "", message: "" },
  });

  async function onSubmit(values: BookingFormValues) {
    await createBooking(values);
    toast.success("Viewing requested", {
      description: `We'll confirm a time for ${propertyTitle}.`,
    });
    reset({ propertyId, name: "", email: "", phone: "", date: "", message: "" });
    setOpen(false);
  }

  return (
    <Modal open={open} onOpenChange={setOpen}>
      <ModalTrigger asChild>
        <Button variant={variant} size="lg">
          <CalendarDays className="size-4" />
          Book a viewing
        </Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Book a viewing</ModalTitle>
          <ModalDescription>{propertyTitle}</ModalDescription>
        </ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Row label="Name" error={errors.name?.message}>
              <Input {...register("name")} placeholder="Your name" />
            </Row>
            <Row label="Email" error={errors.email?.message}>
              <Input type="email" {...register("email")} placeholder="you@example.com" />
            </Row>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Row label="Phone" error={errors.phone?.message}>
              <Input {...register("phone")} placeholder="(503) 555-0142" />
            </Row>
            <Row label="Preferred date" error={errors.date?.message}>
              <Input type="date" {...register("date")} />
            </Row>
          </div>
          <Row label="Notes (optional)" error={errors.message?.message}>
            <Textarea
              {...register("message")}
              rows={3}
              placeholder="Any times that suit you best?"
            />
          </Row>
          <Button type="submit" variant="lime" size="lg" disabled={isSubmitting} className="w-full">
            {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
            Request viewing
          </Button>
        </form>
      </ModalContent>
    </Modal>
  );
}

function Row({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error ? <p className="text-destructive text-xs">{error}</p> : null}
    </div>
  );
}
