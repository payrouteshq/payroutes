"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, Input, Label, cn } from "@payroutes/shared-ui";
import { ArrowLeft, Clock, InfoCircle, MailCheck } from "@payroutes/shared-ui/icons";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { AuthLayout } from "../_shared";

const resetSchema = z.object({
  email: z.email("Enter a valid work email"),
});

type ResetFormData = z.infer<typeof resetSchema>;

export default function ResetPassword() {
  const [sentTo, setSentTo] = React.useState<string | null>(null);

  const form = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
    defaultValues: { email: "" },
  });

  // ponytail: no auth backend yet — wire the send-reset-link action here when it lands.
  const onSubmit = form.handleSubmit((data) => {
    setSentTo(data.email);
  });

  if (sentTo) {
    return <CheckEmail email={sentTo} onChangeAddress={() => setSentTo(null)} />;
  }

  return (
    <AuthLayout
      title="Reset your password"
      headline={"Locked out is fine. Losing money is not."}
      description={
        "Resets never touch live keys or routing rules. Your workspace keeps processing while you get back in."
      }
      bullets={[]}
      topSlot={
        <Link
          href="/signin"
          className="text-primary inline-flex items-center gap-2 text-sm font-medium hover:underline"
        >
          <ArrowLeft className="size-4" />
          Back to sign in
        </Link>
      }
      alternateLink={
        <p>Enter the email you use for PayRoutes. We&apos;ll send a link that stays valid for 30 minutes.</p>
      }
      onSubmit={onSubmit}
      footerNote=""
    >
      <Controller
        control={form.control}
        name="email"
        render={({ field, fieldState }) => (
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-foreground text-sm font-medium">
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

      <Button
        type="submit"
        disabled={form.formState.isSubmitting}
        className="h-11 w-full bg-linear-to-r! font-semibold"
      >
        Send reset link
      </Button>
    </AuthLayout>
  );
}

const NEXT_STEPS = [
  "Open the link and choose a new password",
  "Confirm with your two-factor code",
  "Other sessions sign out automatically",
];

function CheckEmail({ email, onChangeAddress }: { email: string; onChangeAddress: () => void }) {
  const [secondsLeft, setSecondsLeft] = React.useState(42);

  React.useEffect(() => {
    const timer = setInterval(() => setSecondsLeft((s) => (s <= 0 ? 0 : s - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  const canResend = secondsLeft <= 0;
  const countdown = `${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, "0")}`;

  // ponytail: no auth backend yet — resend just restarts the timer until the action lands.
  const handleResend = () => setSecondsLeft(42);

  return (
    <AuthLayout
      title="Check your email"
      headline={"Locked out is fine. Losing money is not."}
      description={
        "Resets never touch live keys or routing rules. Your workspace keeps processing while you get back in."
      }
      bullets={[]}
      topSlot={
        <span className="bg-accent text-primary flex size-11 items-center justify-center rounded-xl">
          <MailCheck className="size-5" />
        </span>
      }
      alternateLink={
        <p>
          We sent a reset link to <span className="text-foreground font-mono">{email}</span>. It expires in 30 minutes
          and can only be used once.
        </p>
      }
      onSubmit={(e) => e.preventDefault()}
      footerNote={
        <span className="flex items-center justify-between">
          <Link href="/signin" className="text-primary font-medium hover:underline">
            Back to sign in
          </Link>
          <span className="text-muted-foreground">
            Wrong address?{" "}
            <button type="button" onClick={onChangeAddress} className="text-primary font-medium hover:underline">
              Change it
            </button>
          </span>
        </span>
      }
    >
      <div className="border-border bg-card rounded-xl border p-5">
        <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">What happens next</p>
        <ol className="mt-4 space-y-3.5">
          {NEXT_STEPS.map((step, i) => (
            <li key={step} className="flex items-center gap-3">
              <span className="bg-accent text-primary flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
                {i + 1}
              </span>
              <span className="text-foreground text-sm">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="border-border bg-card flex items-center justify-between rounded-lg border px-4 py-3">
        <span className="text-muted-foreground flex items-center gap-2.5 text-sm">
          <Clock className="size-4 shrink-0" />
          {canResend ? (
            "Didn't get the email?"
          ) : (
            <span>
              Resend link in <span className="text-foreground font-mono">{countdown}</span>
            </span>
          )}
        </span>
        <button
          type="button"
          disabled={!canResend}
          onClick={handleResend}
          className={cn(
            "text-sm font-medium",
            canResend ? "text-primary hover:underline" : "text-muted-foreground cursor-not-allowed"
          )}
        >
          Resend
        </button>
      </div>
    </AuthLayout>
  );
}
