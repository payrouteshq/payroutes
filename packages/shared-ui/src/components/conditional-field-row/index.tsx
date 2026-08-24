import { useState, type ComponentProps, type ReactNode } from "react"

import { cn } from "../../cn"
import { Label } from "../../ui/label"
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs"
import { EmbeddedFieldRow } from "../field-stack"

export interface ConditionalFieldRowOption {
  value: string
  label: ReactNode
}

export interface ConditionalFieldRowProps extends Omit<ComponentProps<"div">, "children"> {
  label?: ReactNode
  options: ConditionalFieldRowOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string | null) => void
  when?: string
  children?: ReactNode
}

function ConditionalFieldRow({
  label,
  options,
  value,
  defaultValue,
  onValueChange,
  when,
  children,
  className,
  ...props
}: ConditionalFieldRowProps) {
  const isControlled = value !== undefined
  const [internal, setInternal] = useState(defaultValue ?? options[0]?.value ?? "")
  const selected = isControlled ? value : internal
  const showNested = Boolean(children) && (when ? selected === when : false)

  return (
    <div
      data-slot="conditional-field-row"
      className={cn("flex w-full flex-col gap-2", className)}
      {...props}
    >
      {label ? (
        <Label className="text-muted-foreground">{label}</Label>
      ) : null}

      <Tabs
        value={selected}
        onValueChange={(next) => {
          if (!isControlled) setInternal(String(next ?? ""))
          onValueChange?.(next == null ? null : String(next))
        }}
      >
        <TabsList>
          {options.map((option) => (
            <TabsTrigger key={option.value} value={option.value}>
              {option.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <EmbeddedFieldRow
        when={showNested}
        layout="stack"
        className="[&>[aria-hidden]]:border-ring"
      >
        {children}
      </EmbeddedFieldRow>
    </div>
  )
}

export { ConditionalFieldRow }
