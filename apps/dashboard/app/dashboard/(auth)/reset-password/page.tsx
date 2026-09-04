"use client";

import * as React from "react";

import { Button, Callout, Input, Label } from "@payroutes/shared-ui";
import { ArrowLeft, InfoCircle } from "@payroutes/shared-ui/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { AuthLayout } from "../_shared";

const resetSchema = z.object({
  email: z.email("Enter a valid work email"),
});

type ResetFormData = z.infer<typeof resetSchema>;

export default function ResetPassword() {
  const form = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
    defaultValues: { email: "" },
  });

  // ponytail: no auth backend yet — wire the send-reset-link action here when it lands.
  const onSubmit = form.handleSubmit((data) => {
    console.log("reset password", data);
  });

  return (
    <AuthLayout
      title="Reset your password"
      headline="Locked out is fine. Losing money is not."
      description="Resets never touch live keys or routing rules. Your workspace keeps processing while you get back in."
      bullets={[]}
      backLink={
        <Link
          href="/signup"
          className="text-primary inline-flex items-center gap-2 text-sm font-medium hover:underline"
        >
          <ArrowLeft className="size-4" />
          Back to sign in
        </Link>
      }
      alternateLink={<p>Enter the email you use for PayRoutes. We&apos;ll send a link that stays valid for 30 minutes.</p>}
      onSubmit={onSubmit}
      footerNote=""
    >
      <Controller
        control={form.control}
        name="email"
        render={({ field, fieldState }) => (
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-foreground font-medium text-sm">
              Work email
            </Label>
            <Input
              {...field}
              id="email"
              type="email"
              autoComplete="email"
              placeholder="name@company.com"
              aria-invalid={!!fieldState.error}
              className="bg-card h-11"
            />
            {fieldState.error && <p className="text-destructive text-sm">{fieldState.error.message}</p>}
          </div>
        )}
      />

      <Callout icon={<InfoCircle />}>
        If your workspace uses SSO, ask an admin instead — password resets are disabled there.
      </Callout>

      <Button type="submit" disabled={form.formState.isSubmitting} className="bg-linear-to-r! h-11 w-full font-semibold">
        Send reset link
      </Button>
    </AuthLayout>
  );
}
