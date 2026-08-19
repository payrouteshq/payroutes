import type { ComponentProps } from "react"

import { CloseX } from "../../icons"
import { type MixinProps, splitProps } from "../../lib/mixin"
import { cn } from "../../cn"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select"

const DEFAULT_OPERATORS = [
  { value: "is", label: "is" },
  { value: "is_not", label: "is not" },
  { value: "contains", label: "contains" },
] as const

export interface RuleBuilderConditionRowProps<T>
  extends MixinProps<"container", ComponentProps<"div">>,
    MixinProps<"trigger", Omit<ComponentProps<typeof SelectTrigger>, "children">>,
    MixinProps<"content", Omit<ComponentProps<typeof SelectContent>, "children">>,
    MixinProps<"key", Omit<ComponentProps<typeof Input>, "value" | "onChange">>,
    MixinProps<
      "operatorTrigger",
      Omit<ComponentProps<typeof SelectTrigger>, "children">
    >,
    MixinProps<
      "operatorContent",
      Omit<ComponentProps<typeof SelectContent>, "children">
    >,
    MixinProps<"input", Omit<ComponentProps<typeof Input>, "value" | "onChange">>,
    MixinProps<"remove", Omit<ComponentProps<typeof Button>, "children">> {
  resource: T | null
  onResourceChange: (value: T | null) => void
  resources: T[]
  getItemValue: (item: T) => string
  getItemTitle: (item: T) => string
  fieldKey: string
  onFieldKeyChange: (value: string) => void
  operator: string | null
  onOperatorChange: (value: string | null) => void
  operators?: { value: string; label: string }[]
  value: string
  onValueChange: (value: string) => void
  onRemove?: () => void
  disabled?: boolean
  placeholder?: string
}

function RuleBuilderConditionRow<T>({
  resource,
  onResourceChange,
  resources,
  getItemValue,
  getItemTitle,
  fieldKey,
  onFieldKeyChange,
  operator,
  onOperatorChange,
  operators = [...DEFAULT_OPERATORS],
  value,
  onValueChange,
  onRemove,
  disabled = false,
  placeholder = "Select field",
  ...mixProps
}: RuleBuilderConditionRowProps<T>) {
  const {
    container,
    trigger,
    content,
    key: keyProps,
    operatorTrigger,
    operatorContent,
    input,
    remove,
  } = splitProps(
    mixProps,
    "container",
    "trigger",
    "content",
    "key",
    "operatorTrigger",
    "operatorContent",
    "input",
    "remove"
  )

  return (
    <div
      data-slot="rule-builder-condition-row"
      {...container}
      className={cn("flex items-center gap-2", container.className)}
    >
      <div className="flex min-w-0 items-center gap-1">
        <Select
          value={resource ? getItemValue(resource) : null}
          onValueChange={(next) =>
            onResourceChange(
              resources.find((item) => getItemValue(item) === next) ?? null
            )
          }
          disabled={disabled}
        >
          <SelectTrigger
            {...trigger}
            className={cn("w-fit font-mono", trigger.className)}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent {...content}>
            {resources.map((item) => (
              <SelectItem key={getItemValue(item)} value={getItemValue(item)}>
                {getItemTitle(item)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="select-none text-muted-foreground">.</span>
        <Input
          {...keyProps}
          disabled={disabled}
          aria-label="Key"
          value={fieldKey}
          onChange={(event) => onFieldKeyChange(event.target.value)}
          className={cn("h-9 w-28 font-mono md:text-sm", keyProps.className)}
        />
      </div>

      <Select
        value={operator}
        onValueChange={onOperatorChange}
        disabled={disabled}
      >
        <SelectTrigger
          {...operatorTrigger}
          className={cn("w-fit", operatorTrigger.className)}
        >
          <SelectValue placeholder="is" />
        </SelectTrigger>
        <SelectContent {...operatorContent}>
          {operators.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        {...input}
        disabled={disabled}
        aria-label="Value"
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        className={cn("h-9 w-36 md:text-sm", input.className)}
      />

      {onRemove ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          aria-label="Remove condition"
          disabled={disabled}
          {...remove}
          className={cn("shrink-0 text-muted-foreground", remove.className)}
          onClick={(event) => {
            remove.onClick?.(event)
            onRemove()
          }}
        >
          <CloseX className="size-4" />
        </Button>
      ) : null}
    </div>
  )
}

export { RuleBuilderConditionRow }
