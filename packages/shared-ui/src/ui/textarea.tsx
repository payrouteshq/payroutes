import type { ComponentProps } from "react"

import { cn } from "../cn"

type TextareaProps = ComponentProps<"textarea"> & {
  "data-state"?: "focus"
}

function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-lg border border-input bg-transparent px-2.5 py-2 text-base text-foreground transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 data-[state=focus]:border-ring data-[state=focus]:ring-3 data-[state=focus]:ring-ring/50 disabled:cursor-not-allowed disabled:border-transparent disabled:bg-disabled disabled:text-disabled-foreground disabled:placeholder:text-disabled-foreground aria-invalid:border-error aria-invalid:ring-0 aria-invalid:shadow-ring-error md:text-sm dark:bg-input/30 dark:disabled:bg-disabled",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
export type { TextareaProps }
