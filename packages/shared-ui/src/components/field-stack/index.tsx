import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../cn";

export interface FieldStackProps extends ComponentProps<"div"> {
  children: ReactNode;
}

function FieldStack({ children, className, ...props }: FieldStackProps) {
  return (
    <div data-slot="field-stack" className={cn("flex flex-col gap-2", className)} {...props}>
      {children}
    </div>
  );
}

export interface EmbeddedFieldRowProps extends ComponentProps<"div"> {
  when: boolean;
  children: ReactNode;
  layout?: "inline" | "stack";
  connectorClassName?: string;
}

function EmbeddedFieldRowRoot({
  when,
  children,
  layout = "inline",
  className,
  connectorClassName,
  ...props
}: EmbeddedFieldRowProps) {
  if (!when) return null;

  return (
    <div
      data-slot="embedded-field-row"
      data-layout={layout}
      className={cn(
        "animate-in fade-in slide-in-from-top-1 relative ml-3 pl-5",
        layout === "inline" ? "flex items-center gap-2" : "flex flex-col gap-2",
        className
      )}
      {...props}
    >
      <div
        aria-hidden
        className={cn(
          "border-border pointer-events-none absolute top-0 left-0 w-4 rounded-bl border-b border-l",
          layout === "inline" ? "h-1/2" : "bottom-0",
          connectorClassName
        )}
      />
      {children}
    </div>
  );
}

function EmbeddedFieldRowLabel({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="embedded-field-row-label"
      className={cn("text-muted-foreground shrink-0 text-sm font-medium", className)}
      {...props}
    />
  );
}

function EmbeddedFieldRowSuffix({ className, ...props }: ComponentProps<"span">) {
  return (
    <span data-slot="embedded-field-row-suffix" className={cn("text-muted-foreground text-sm", className)} {...props} />
  );
}

const EmbeddedFieldRow = Object.assign(EmbeddedFieldRowRoot, {
  Label: EmbeddedFieldRowLabel,
  Suffix: EmbeddedFieldRowSuffix,
});

export { FieldStack, EmbeddedFieldRow };
