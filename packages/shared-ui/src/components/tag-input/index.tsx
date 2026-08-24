import { useId, useState, type ComponentProps, type KeyboardEvent, type ReactNode } from "react"

import { CloseX, Plus } from "../../icons"
import { type MixinProps, splitProps } from "../../lib/mixin"
import { cn } from "../../cn"
import { Badge } from "../../ui/badge"
import { Input } from "../../ui/input"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "../../ui/input-group"
import { Label } from "../../ui/label"

type InputMixin = Omit<ComponentProps<typeof Input>, "value" | "onChange"> & {
  value?: string
  onChange?: (value: string) => void
}

export interface TagProps extends Omit<ComponentProps<typeof Badge>, "children"> {
  disabled?: boolean
  onRemove?: () => void
  children: ReactNode
}

function Tag({ disabled, onRemove, className, children, ...props }: TagProps) {
  return (
    <Badge
      data-slot="tag"
      variant="secondary"
      className={cn(
        "h-6 gap-1 rounded-md bg-secondary px-2 pr-1 text-xs font-medium text-foreground",
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
    </Badge>
  )
}

export interface TagInputProps
  extends MixinProps<"input", InputMixin>,
    MixinProps<"tag", Omit<ComponentProps<typeof Badge>, "children">>,
    MixinProps<"label", Omit<ComponentProps<typeof Label>, "children">>,
    MixinProps<"error", Omit<ComponentProps<"p">, "children">>,
    MixinProps<"helpText", Omit<ComponentProps<"p">, "children">> {
  id?: string
  value?: string[]
  onChange?: (value: string[]) => void
  placeholder?: string
  label?: ReactNode
  error?: ReactNode
  helpText?: ReactNode
  disabled?: boolean
  className?: string
  "data-state"?: "focus"
}

function TagInput({
  id,
  className,
  value,
  onChange,
  placeholder = "Add values...",
  label,
  error,
  helpText,
  disabled = false,
  "data-state": dataState,
  ...restProps
}: TagInputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const { input, tag, label: labelProps, error: errorProps, helpText: helpTextProps } = splitProps(
    restProps,
    "input",
    "tag",
    "label",
    "error",
    "helpText"
  )

  const { value: pendingValue, onChange: onPendingChange, ...inputRest } = input
  const isControlled = value !== undefined
  const [internalTags, setInternalTags] = useState<string[]>([])
  const [internalPending, setInternalPending] = useState("")
  const tags = isControlled ? value : internalTags
  const pending = pendingValue !== undefined ? pendingValue : internalPending

  const setTags = (next: string[]) => {
    if (!isControlled) setInternalTags(next)
    onChange?.(next)
  }

  const setPending = (next: string) => {
    if (onPendingChange) onPendingChange(next)
    else setInternalPending(next)
  }

  const addPending = () => {
    const next = pending.trim()
    if (!next) return
    setTags(Array.from(new Set([...tags, next])))
    setPending("")
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault()
      addPending()
    } else if (event.key === "Backspace" && !pending && tags.length > 0) {
      setTags(tags.slice(0, -1))
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {label ? (
        <Label htmlFor={inputId} {...labelProps}>
          {label}
        </Label>
      ) : null}
      {helpText ? (
        <p {...helpTextProps} className={cn("text-sm text-muted-foreground", helpTextProps.className)}>
          {helpText}
        </p>
      ) : null}

      <InputGroup
        data-slot="tag-input"
        data-state={dataState}
        data-disabled={disabled || undefined}
        className={cn(
          "h-auto min-h-9 flex-wrap gap-1.5 py-1.5 pl-2 pr-1.5",
          "has-[:focus-visible]:ring-0 has-[:focus-visible]:border-primary",
          "data-[state=focus]:ring-0 data-[state=focus]:border-primary",
          className
        )}
      >
        {tags.map((item) => (
          <Tag
            key={item}
            disabled={disabled}
            onRemove={disabled ? undefined : () => setTags(tags.filter((tagItem) => tagItem !== item))}
            {...tag}
            className={cn(tag.className)}
          >
            {item}
          </Tag>
        ))}

        <InputGroupInput
          {...inputRest}
          id={inputId}
          disabled={disabled}
          value={pending}
          placeholder={tags.length === 0 ? placeholder : ""}
          aria-invalid={Boolean(error) || undefined}
          className={cn("h-6 min-w-16 flex-1 px-1", input.className)}
          onChange={(event) => setPending(event.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addPending}
        />

        {disabled ? null : (
          <InputGroupAddon align="inline-end" className="pr-1">
            <InputGroupButton
              type="button"
              size="icon-xs"
              aria-label="Add value"
              className="text-muted-foreground"
              onClick={(event) => {
                if (pending.trim()) addPending()
                else
                  event.currentTarget
                    .closest("[data-slot=input-group]")
                    ?.querySelector("input")
                    ?.focus()
              }}
            >
              <Plus className="size-4" />
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>

      {error ? (
        <p {...errorProps} className={cn("text-sm text-error", errorProps.className)} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

export { Tag, TagInput }
