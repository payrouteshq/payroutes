"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Label } from "@payroutes/shared-ui";
import { GithubIcon, GoogleIcon, PayroutesLogo } from "@payroutes/shared-ui/icons";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { ModeToggle } from "../_mode-toggle";

const signUpSchema = z.object({
  email: z.email("Enter a valid work email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", password: "" },
  });

  // ponytail: no auth backend yet — wire the create-account action here when it lands.
  const onSubmit = form.handleSubmit((data) => {
    console.log("sign up", data);
  });

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <ModeToggle />

      <div className="border-border bg-elevated w-full max-w-xl rounded-3xl border p-8 sm:p-10">
        <div className="flex items-center gap-3">
          <PayroutesLogo className="text-primary size-8" />
          <span className="text-foreground text-xl font-medium tracking-wide">PAYROUTES</span>
        </div>

        <h1 className="text-foreground mt-6 text-3xl font-medium tracking-tight">Create your account</h1>
        <p className="text-muted-foreground mt-2 text-sm leading-normal">
          Route every payment to the right provider. Free in test mode, no card needed.
        </p>

        <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
          <Controller
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  Work email
                </Label>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  aria-invalid={!!fieldState.error}
                  className="bg-card dark:bg-background! h-11"
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
                <Label htmlFor="password" className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  Password
                </Label>
                <Input
                  {...field}
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="••••••••••"
                  aria-invalid={!!fieldState.error}
                  className="bg-card dark:bg-background! h-11"
                />
                {fieldState.error && <p className="text-destructive text-sm">{fieldState.error.message}</p>}
              </div>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="h-11 w-full bg-linear-to-r! font-semibold"
          >
            Create account
          </Button>

          <div className="flex items-center gap-4">
            <span className="bg-border h-px flex-1" />
            <span className="text-muted-foreground text-xs font-medium">or</span>
            <span className="bg-border h-px flex-1" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => console.log("google")}
              className="border-border bg-card text-primary hover:bg-foreground/5 h-11 w-full gap-2.5"
            >
              <GoogleIcon className="size-5" />
              Continue with Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => console.log("github")}
              className="border-border bg-card text-primary hover:bg-foreground/5 h-11 w-full gap-2.5"
            >
              <GithubIcon className="text-foreground size-5" />
              Continue with GitHub
            </Button>
          </div>

          <p className="text-muted-foreground text-sm">
            Social login is user auth only. Providers always connect with API keys, never OAuth.
          </p>
        </form>
      </div>
    </div>
  );
}
