import { Children, type ComponentProps, type ReactNode, createContext, useContext, useRef, useState } from "react";

import { cn } from "../../cn";
import { CloseX, CornerDownLeft, Search } from "../../icons";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "../../ui/input-group";
import { Popover, PopoverContent } from "../../ui/popover";

const SearchFieldClose = createContext<() => void>(() => {});

type SearchFieldProps = Omit<ComponentProps<typeof InputGroupInput>, "type" | "className" | "data-state"> & {
  className?: string;
  "data-state"?: "hover" | "focus";
  children?: ReactNode;
  empty?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
};

function SearchField({
  className,
  disabled,
  placeholder = "Search providers",
  "data-state": dataState,
  children,
  empty = "No results found",
  open,
  defaultOpen = false,
  onOpenChange,
  onChange,
  onFocus,
  ...props
}: SearchFieldProps) {
  const isControlled = open !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [anchor, setAnchor] = useState<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resolvedOpen = isControlled ? open : internalOpen;
  const setOpen = (next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };
  const close = () => {
    setOpen(false);
  };

  const field = (
    <InputGroup
      data-state={dataState}
      className={cn(
        "hover:border-ring data-[state=hover]:border-ring h-11 rounded-full pr-1.5 has-[:focus-visible]:ring-0",
        className
      )}
    >
      <InputGroupAddon className="pl-1.5">
        <span
          className={cn(
            "bg-secondary text-primary flex size-8 items-center justify-center rounded-full",
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
        ref={inputRef}
        type="search"
        disabled={disabled}
        placeholder={placeholder}
        className="[&::-webkit-search-cancel-button]:hidden"
        {...props}
        onFocus={onFocus}
        onChange={(event) => {
          onChange?.(event);
          if (disabled) return;
          setOpen(event.currentTarget.value.trim().length > 0);
        }}
      />
      <InputGroupAddon
        align="inline-end"
        className="pr-1 group-has-[:disabled]/input-group:hidden group-has-[input:placeholder-shown]/input-group:hidden"
      >
        <InputGroupButton
          aria-label="Clear search"
          size="icon-xs"
          onClick={(event) => {
            const input = event.currentTarget.closest("[data-slot=input-group]")?.querySelector("input");
            if (!(input instanceof HTMLInputElement)) return;
            Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set?.call(input, "");
            input.dispatchEvent(new Event("input", { bubbles: true }));
            input.focus();
          }}
        >
          <CloseX className="size-3.5" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );

  if (children === undefined) return field;

  return (
    <SearchFieldClose.Provider value={close}>
      <Popover open={resolvedOpen} onOpenChange={setOpen}>
        <div ref={setAnchor} className="w-full">
          {field}
        </div>
        <PopoverContent
          align="start"
          side="bottom"
          anchor={anchor ?? undefined}
          initialFocus={false}
          finalFocus={false}
          className="border-ring w-(--anchor-width) min-w-72 overflow-hidden border-2 p-1"
        >
          <div className="max-h-80 overflow-y-auto">
            {Children.count(children) > 0 ? (
              children
            ) : (
              <p className="text-muted-foreground px-3 py-4 text-center text-xs">{empty}</p>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </SearchFieldClose.Provider>
  );
}

function SearchFieldResult({
  selected,
  onSelect,
  className,
  children,
  onClick,
  onMouseDown,
  ...props
}: ComponentProps<"button"> & {
  selected?: boolean;
  onSelect?: () => void;
}) {
  const close = useContext(SearchFieldClose);

  return (
    <button
      type="button"
      data-slot="search-field-result"
      data-selected={selected || undefined}
      className={cn("group/item w-full cursor-pointer border-0 bg-transparent p-0 text-left outline-none", className)}
      {...props}
      onMouseDown={(event) => {
        event.preventDefault();
        onMouseDown?.(event);
      }}
      onClick={(event) => {
        onClick?.(event);
        onSelect?.();
        close();
      }}
    >
      <span
        className={cn(
          "group/row text-foreground relative flex w-full items-center justify-between overflow-hidden rounded-md py-2.5 pr-3 pl-3.5 text-sm",
          "before:bg-primary before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:opacity-0 before:content-['']",
          "hover:bg-accent hover:before:opacity-100",
          "group-hover/item:bg-accent group-hover/item:before:opacity-100",
          "group-focus-visible/item:bg-accent group-focus-visible/item:before:opacity-100",
          selected && "bg-accent before:opacity-100"
        )}
      >
        <span className="min-w-0 truncate">{children}</span>
        <CornerDownLeft
          className={cn(
            "text-primary size-4 shrink-0 opacity-0",
            "group-hover/item:opacity-100 group-hover/row:opacity-100 group-focus-visible/item:opacity-100",
            selected && "opacity-100"
          )}
        />
      </span>
    </button>
  );
}

export { SearchField, SearchFieldResult };
export type { SearchFieldProps };
