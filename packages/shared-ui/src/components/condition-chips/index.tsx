import type { ComponentProps, ReactNode } from "react"

import { Plus } from "../../icons"
import { type MixinProps, splitProps } from "../../lib/mixin"
import { cn } from "../../cn"

export interface ConditionChipsProps
  extends MixinProps<"container", ComponentProps<"div">> {
  children?: ReactNode
}

function ConditionChipsRoot({ children, ...mixProps }: ConditionChipsProps) {
  const { container } = splitProps(mixProps, "container")

  return (
    <div
      data-slot="condition-chips"
      {...container}
      className={cn("flex flex-wrap items-center gap-2", container.className)}
    >
      {children}
    </div>
  )
}

function ConditionChipsKeyword({
  className,
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="condition-chips-keyword"
      className={cn(
        "inline-flex h-7 shrink-0 items-center rounded-md bg-primary px-2.5 text-xs font-semibold uppercase text-primary-foreground outline-none select-none",
        "focus-visible:ring-3 focus-visible:ring-ring/50",
        "disabled:pointer-events-none disabled:bg-disabled disabled:text-disabled-foreground",
        className
      )}
      {...props}
    />
  )
}

function ConditionChipsChip({
  className,
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="condition-chips-chip"
      className={cn(
        "inline-flex h-7 shrink-0 items-center rounded-md border border-input bg-background px-2.5 font-mono text-sm whitespace-nowrap text-foreground outline-none",
        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
        "disabled:pointer-events-none disabled:border-transparent disabled:bg-disabled disabled:text-disabled-foreground",
        className
      )}
      {...props}
    />
  )
}

function ConditionChipsAdd({
  className,
  children = "condition",
  ...props
}: ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="condition-chips-add"
      aria-label="Add condition"
      className={cn(
        "inline-flex h-7 shrink-0 items-center gap-1 rounded-md border border-dashed border-primary px-2.5 text-sm whitespace-nowrap text-primary outline-none",
        "focus-visible:ring-3 focus-visible:ring-ring/50",
        "disabled:pointer-events-none disabled:border-disabled-foreground disabled:text-disabled-foreground",
        className
      )}
      {...props}
    >
      <Plus className="size-3.5" />
      {children}
    </button>
  )
}

const ConditionChips = Object.assign(ConditionChipsRoot, {
  Keyword: ConditionChipsKeyword,
  Chip: ConditionChipsChip,
  Add: ConditionChipsAdd,
})

export { ConditionChips }
