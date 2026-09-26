"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  REQUEST_KINDS,
  createRequest,
  requestSchema,
  type RequestFormValues,
  type RequestContext,
  type RequestKind,
} from "@/entities/request";
import { useTranslation } from "@/shared/i18n";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Label } from "@/shared/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { cn } from "@/shared/lib/cn";

export function RequestForm({
  defaultKind = "general",
  context,
  onSuccess,
  className,
}: {
  defaultKind?: RequestKind;
  context?: RequestContext;
  onSuccess?: () => void;
  className?: string;
}) {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: { name: "", email: "", phone: "", kind: defaultKind, message: "" },
  });

  async function onSubmit(values: RequestFormValues) {
    try {
      await createRequest(values, context);
    } catch {
      toast.error(t("form.failed"));
      return;
    }
    toast.success(t("form.sent"), { description: t("form.sentText") });
    reset({ name: "", email: "", phone: "", kind: defaultKind, message: "" });
    onSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-4", className)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("form.name")} error={errors.name?.message}>
          <Input {...register("name")} placeholder={t("form.namePh")} />
        </Field>
        <Field label={t("form.email")} error={errors.email?.message}>
          <Input type="email" {...register("email")} placeholder="you@example.com" />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("form.phone")} error={errors.phone?.message}>
          <Input {...register("phone")} placeholder="(503) 555-0142" />
        </Field>
        <Field label={t("form.interested")} error={errors.kind?.message}>
          <Controller
            control={control}
            name="kind"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {REQUEST_KINDS.map((k) => (
                    <SelectItem key={k} value={k}>
                      {t(`form.kind.${k}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
      </div>
      <Field label={t("form.message")} error={errors.message?.message}>
        <Textarea {...register("message")} rows={4} placeholder={t("form.messagePh")} />
      </Field>
      <Button
        type="submit"
        variant="lime"
        size="lg"
        disabled={isSubmitting}
        className="w-full sm:w-auto"
      >
        {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : null}
        {t("form.send")}
      </Button>
    </form>
  );
}

function Field({
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
