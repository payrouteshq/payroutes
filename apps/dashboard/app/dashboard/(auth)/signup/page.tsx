"use client";

import * as React from "react";

import { Button, Checkbox, Input, Label } from "@payroutes/shared-ui";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { type AuthError, AuthLayout } from "../_shared";

const signInSchema = z.object({
  email: z.email("Enter a valid work email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberDevice: z.boolean(),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignUp() {
  const [authError, setAuthError] = React.useState<AuthError | null>(null);

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "", rememberDevice: true },
  });

  const onSubmit = form.handleSubmit(() => {
    setAuthError({
      title: "That email and password don't match",
      description: "3 attempts left before this account locks for 15 minutes.",
    });
  });

  return (
    <AuthLayout
      title="Sign in to PayRoutes"
      onSubmit={onSubmit}
      onDismissError={() => setAuthError(null)}
      error={authError}
      googleConfig={{ onClick: () => console.log("google") }}
      alternateLink={
        <p>
          No account yet?{" "}
          <Link href="/signup" className="text-primary font-medium hover:underline">
            Create a workspace
          </Link>
        </p>
      }
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

      <Controller
        control={form.control}
        name="password"
        render={({ field, fieldState }) => (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-foreground font-medium text-sm">
                Password
              </Label>
              <Link href="/reset-password" className="text-primary text-sm font-medium hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input
              {...field}
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              aria-invalid={!!fieldState.error}
              className="bg-card h-11"
            />
            {fieldState.error && <p className="text-destructive text-sm">{fieldState.error.message}</p>}
          </div>
        )}
      />

      <Controller
        control={form.control}
        name="rememberDevice"
        render={({ field }) => (
          <Label className="text-foreground gap-2.5 font-normal text-sm">
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
            Remember this device for 30 days
          </Label>
        )}
      />

      <Button type="submit" disabled={form.formState.isSubmitting} className="bg-linear-to-r! h-11 w-full font-semibold">
        Continue
      </Button>
    </AuthLayout>
  );
}
