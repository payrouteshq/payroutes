import * as React from "react";

import { cn } from "../../cn";
import { Check } from "../../icons";

export type WizardStepStatus = "complete" | "current" | "upcoming";

export interface WizardStepProps extends React.ComponentProps<"div"> {
  status?: WizardStepStatus;
  step: number;
  label?: React.ReactNode;
}

function WizardStep({ status = "upcoming", step, label, className, ...props }: WizardStepProps) {
  return (
    <div
      data-slot="wizard-step"
      data-status={status}
      role="listitem"
      aria-current={status === "current" ? "step" : undefined}
      className={cn("grid shrink-0 grid-cols-[24px_auto] items-center gap-x-2", className)}
      {...props}
    >
      <span
        className={cn(
          "col-start-1 row-start-1 flex size-6 items-center justify-center overflow-hidden rounded-full border border-solid text-[11px] leading-none",
          status === "complete" && "border-primary bg-primary text-primary-foreground",
          status === "current" && "border-primary bg-background text-primary font-medium",
          status === "upcoming" && "border-border bg-background"
        )}
      >
        {status === "complete" ? (
          <Check className="size-3.5" width={14} height={14} />
        ) : status === "current" ? (
          step
        ) : null}
      </span>
      {label ? (
        <span
          className={cn(
            "col-start-2 row-start-1 text-sm leading-none whitespace-nowrap",
            status === "complete" && "text-primary",
            status === "current" && "text-foreground font-semibold",
            status === "upcoming" && "text-muted-foreground"
          )}
        >
          {label}
        </span>
      ) : null}
    </div>
  );
}

export interface WizardStepperProps extends React.ComponentProps<"div"> {
  steps: React.ReactNode[];
  current?: number;
}

function WizardStepper({ steps, current = 0, className, ...props }: WizardStepperProps) {
  return (
    <div data-slot="wizard-stepper" role="list" className={cn("flex w-full items-center gap-4", className)} {...props}>
      {steps.map((label, index) => {
        const status: WizardStepStatus = index < current ? "complete" : index === current ? "current" : "upcoming";

        return (
          <React.Fragment key={index}>
            <WizardStep step={index + 1} status={status} label={label} />
            {index < steps.length - 1 ? (
              <span
                aria-hidden="true"
                className={cn("h-px min-w-4 flex-1", status === "complete" ? "bg-primary" : "bg-border")}
              />
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export { WizardStep, WizardStepper };
