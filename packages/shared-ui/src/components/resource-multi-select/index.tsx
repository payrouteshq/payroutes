import type { ComponentProps, ReactNode } from "react"

import { CloseX, Cube } from "../../icons"
import { type MixinProps, splitProps } from "../../lib/mixin"
import { cn } from "../../cn"
import { Checkbox } from "../../ui/checkbox"

export interface ResourceMultiSelectProps
  extends MixinProps<"container", ComponentProps<"div">>,
    ComponentProps<"div"> {}

function ResourceMultiSelectRoot({
  children,
  className,
  ...mixProps
}: ResourceMultiSelectProps) {
  const { container, rest } = splitProps(mixProps, "container")

  return (
    <div
      data-slot="resource-multi-select"
      {...rest}
      {...container}
      className={cn(
        "w-full overflow-hidden rounded-lg border-2 border-ring bg-card",
        className,
        container.className
      )}
    >
      {children}
    </div>
  )
}

function ResourceMultiSelectTags({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="resource-multi-select-tags"
      className={cn("flex flex-wrap gap-2 border-b border-border p-3", className)}
      {...props}
    />
  )
}

function ResourceMultiSelectTag({
  className,
  children,
  disabled,
  onRemove,
  ...props
}: ComponentProps<"span"> & {
  disabled?: boolean
  onRemove?: () => void
}) {
  return (
    <span
      data-slot="resource-multi-select-tag"
      className={cn(
        "inline-flex h-6 items-center gap-1 rounded-md bg-secondary px-2 pr-1 text-xs font-medium text-foreground",
        disabled && "bg-disabled text-disabled-foreground",
        className
      )}
      {...props}
    >
      {children}
      <button
        type="button"
        aria-label="Remove"
        disabled={disabled || !onRemove}
        className="inline-flex size-3.5 items-center justify-center text-current outline-none disabled:pointer-events-none"
        onClick={(event) => {
          event.stopPropagation()
          onRemove?.()
        }}
      >
        <CloseX className="size-3" />
      </button>
    </span>
  )
}

export interface ResourceMultiSelectRowProps
  extends Omit<ComponentProps<"label">, "onChange">,
    MixinProps<"checkbox", ComponentProps<typeof Checkbox>> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  icon?: ReactNode
  disabled?: boolean
}

function ResourceMultiSelectRow({
  checked = false,
  onCheckedChange,
  icon,
  disabled,
  className,
  children,
  ...mixProps
}: ResourceMultiSelectRowProps) {
  const { checkbox, rest } = splitProps(mixProps, "checkbox")

  return (
    <label
      data-slot="resource-multi-select-row"
      data-state={checked ? "checked" : undefined}
      className={cn(
        "flex w-full items-center gap-3 border-b border-border px-3 py-2.5 text-sm last:border-b-0",
        "hover:bg-subtle data-[state=checked]:bg-subtle",
        disabled && "pointer-events-none bg-disabled text-disabled-foreground",
        className
      )}
      {...rest}
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
        {icon ?? <Cube className="size-4" />}
      </span>
      <span className="min-w-0 flex-1 truncate">{children}</span>
      <Checkbox
        checked={checked}
        disabled={disabled}
        onCheckedChange={(value) => onCheckedChange?.(value === true)}
        {...checkbox}
        className={cn(checkbox.className)}
      />
    </label>
  )
}

const ResourceMultiSelect = Object.assign(ResourceMultiSelectRoot, {
  Tags: ResourceMultiSelectTags,
  Tag: ResourceMultiSelectTag,
  Row: ResourceMultiSelectRow,
})

export { ResourceMultiSelect }
