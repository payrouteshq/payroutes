import type { ComponentProps } from "react"

import { CloseX, Search } from "../../icons"
import { cn } from "../../cn"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../../ui/input-group"

type SearchFieldProps = Omit<
  ComponentProps<typeof InputGroupInput>,
  "type" | "className" | "data-state"
> & {
  className?: string
  "data-state"?: "hover" | "focus"
}

function SearchField({
  className,
  disabled,
  placeholder = "Search providers",
  "data-state": dataState,
  ...props
}: SearchFieldProps) {
  return (
    <InputGroup
      data-state={dataState}
      className={cn(
        "h-11 rounded-full pr-1.5 hover:border-ring has-[:focus-visible]:ring-0 data-[state=hover]:border-ring",
        className
      )}
    >
      <InputGroupAddon className="pl-1.5">
        <span
          className={cn(
            "flex size-8 items-center justify-center rounded-full bg-secondary text-primary",
            "group-has-[:focus-visible]/input-group:bg-primary group-has-[:focus-visible]/input-group:text-primary-foreground",
            "group-data-[state=focus]/input-group:bg-primary group-data-[state=focus]/input-group:text-primary-foreground",
            "group-has-[input:not(:placeholder-shown)]/input-group:bg-primary group-has-[input:not(:placeholder-shown)]/input-group:text-primary-foreground",
            "group-has-[:disabled]/input-group:bg-popover group-has-[:disabled]/input-group:text-disabled-foreground"
          )}
        >
          <Search className="size-4" />
        </span>
      </InputGroupAddon>
      <InputGroupInput
        type="search"
        disabled={disabled}
        placeholder={placeholder}
        className="[&::-webkit-search-cancel-button]:hidden"
        {...props}
      />
      <InputGroupAddon
        align="inline-end"
        className="pr-1 group-has-[:disabled]/input-group:hidden group-has-[input:placeholder-shown]/input-group:hidden"
      >
        <InputGroupButton
          aria-label="Clear search"
          size="icon-xs"
          onClick={(event) => {
            const input = event.currentTarget
              .closest("[data-slot=input-group]")
              ?.querySelector("input")
            if (!(input instanceof HTMLInputElement)) return
            // ponytail: native setter so React's value tracker still fires onChange
            Object.getOwnPropertyDescriptor(
              HTMLInputElement.prototype,
              "value"
            )?.set?.call(input, "")
            input.dispatchEvent(new Event("input", { bubbles: true }))
            input.focus()
          }}
        >
          <CloseX className="size-3.5" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}

export { SearchField }
export type { SearchFieldProps }
