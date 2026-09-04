"use client";

import * as React from "react";

import { Button, ToastCard } from "@payroutes/shared-ui";
import { Exclamation, GoogleIcon, PayroutesLogo } from "@payroutes/shared-ui/icons";
import Link from "next/link";

import { ModeToggle } from "./_mode-toggle";



export interface AuthError {
  title: string;
  description?: string;
}

interface AuthLayoutProps {
  title: string;
  headline?: React.ReactNode;
  description?: React.ReactNode;
  bullets?: string[];
  topSlot?: React.ReactNode;
  alternateLink?: React.ReactNode;
  error?: AuthError | null;
  onDismissError?: () => void;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  googleConfig?: { onClick: () => void; label?: string };
  footerNote?: React.ReactNode;
}

export function AuthLayout({
  title,
  headline = "Every payment takes the cheapest road that works.",
  description = "Sign in to route volume across Stripe, Adyen, and Stellar, watch decisions land in real time, and retry the ones that don't.",
  bullets = ["99.99% routing uptime across 14 providers", "SOC 2 Type II · PCI DSS Level 1"],
  topSlot,
  alternateLink,
  error,
  onDismissError,
  onSubmit,
  children,
  googleConfig,
  footerNote = "Protected by two-factor authentication. New devices need a code before they reach live data.",
}: AuthLayoutProps) {
  return (
    <div className="bg-card min-h-screen">
      <ModeToggle />
      <div className="grid min-h-screen md:grid-cols-2">
        {/* Left — brand panel */}
        <div className="from-accent/40 to-card flex flex-col justify-between bg-gradient-to-br p-10 lg:p-14">
          <div className="flex items-center gap-3.5">
    
              <PayroutesLogo className="text-primary size-10" />
         
            <span className="text-foreground text-2xl font-medium tracking-wide">PAYROUTES</span>
          </div>

          <div className="my-10 max-w-md">
            <h1 className="text-foreground text-4xl leading-[1.1] font-medium  tracking-tight lg:text-5xl">
              {headline}
            </h1>
            <p className="text-muted-foreground mt-6 font-normal text-base leading-normal">{description}</p>

            {bullets.length > 0 && (
              <ul className="mt-8 space-y-3">
                {bullets.map((text) => (
                  <li key={text} className="text-foreground flex items-center gap-3">
                    <CheckBadge />
                    {text}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} PayRoutes ·{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms
            </Link>{" "}
            ·{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy
            </Link>
          </p>
        </div>

        {/* Right — form panel */}
        <div className="bg-subtle flex flex-col justify-center p-10 lg:p-10">
          <div className="mx-auto w-full max-w-lg">
            {topSlot && <div className="mb-5">{topSlot}</div>}
            <h2 className="text-foreground text-3xl font-medium tracking-tight">{title}</h2>
            {alternateLink && <div className="text-muted-foreground mt-2">{alternateLink}</div>}

            {error && (
              <ToastCard
                type="error"
                title={error.title}
                description={error.description}
                onClose={onDismissError}
                className="mt-6"
                icon={<Exclamation />}
              />
            )}

            <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
              {children}

              {googleConfig && (
                <>
                  <div className="flex items-center gap-4">
                    <span className="bg-border h-px flex-1" />
                    <span className="text-muted-foreground text-xs font-medium">OR</span>
                    <span className="bg-border h-px flex-1" />
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={googleConfig.onClick}
                    className="border-border bg-card text-primary hover:bg-foreground/5 h-11 w-full gap-2.5"
                  >
                    <GoogleIcon className="size-5" />
                    {googleConfig.label ?? "Continue with Google"}
                  </Button>
                </>
              )}

              {footerNote && <p className="text-muted-foreground text-sm">{footerNote}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckBadge() {
  return (
    <span className="bg-accent flex size-5 shrink-0 items-center justify-center rounded-full">
      <svg viewBox="0 0 24 24" fill="none" className="text-primary size-3">
        <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}



