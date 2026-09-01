import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../cn";
import { Plus } from "../../icons";
import { type MixinProps, splitProps } from "../../lib/mixin";

export interface ConditionChipsProps extends MixinProps<"container", ComponentProps<"div">> {
  children?: ReactNode;
}

function ConditionChipsRoot({ children, ...mixProps }: ConditionChipsProps) {
  const { container } = splitProps(mixProps, "container");

  return (
    <div
      data-slot="condition-chips"
      {...container}
      className={cn("flex flex-wrap items-center gap-2", container.className)}
    >
      {children}
    </div>
  );
}

function ConditionChipsKeyword({ className, ...props }: ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="condition-chips-keyword"
      className={cn(
        "bg-primary text-primary-foreground inline-flex h-7 shrink-0 items-center rounded-md px-2.5 text-xs font-semibold uppercase outline-none select-none",
        "focus-visible:ring-ring/50 focus-visible:ring-3",
        "disabled:bg-disabled disabled:text-disabled-foreground disabled:pointer-events-none",
        className
      )}
      {...props}
    />
  );
}

function ConditionChipsChip({ className, ...props }: ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="condition-chips-chip"
      className={cn(
        "border-input bg-background text-foreground inline-flex h-7 shrink-0 items-center rounded-md border px-2.5 font-mono text-sm whitespace-nowrap outline-none",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3",
        "disabled:bg-disabled disabled:text-disabled-foreground disabled:pointer-events-none disabled:border-transparent",
        className
      )}
      {...props}
    />
  );
}

function ConditionChipsAdd({ className, children = "condition", ...props }: ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="condition-chips-add"
      aria-label="Add condition"
      className={cn(
        "border-primary text-primary inline-flex h-7 shrink-0 items-center gap-1 rounded-md border border-dashed px-2.5 text-sm whitespace-nowrap outline-none",
        "focus-visible:ring-ring/50 focus-visible:ring-3",
        "disabled:border-disabled-foreground disabled:text-disabled-foreground disabled:pointer-events-none",
        className
      )}
      {...props}
    >
      <Plus className="size-3.5" />
      {children}
    </button>
  );
}

const ConditionChips = Object.assign(ConditionChipsRoot, {
  Keyword: ConditionChipsKeyword,
  Chip: ConditionChipsChip,
  Add: ConditionChipsAdd,
});

export { ConditionChips };
