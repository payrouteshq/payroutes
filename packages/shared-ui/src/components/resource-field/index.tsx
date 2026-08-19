import {
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react"

import { ChevronDown, ChevronsUpDown, CornerDownLeft, Search } from "../../icons"
import { type MixinProps, splitProps } from "../../lib/mixin"
import { cn } from "../../cn"
import { Input } from "../../ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../../ui/input-group"
import { Label } from "../../ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"
import { Spinner } from "../spinner"

export interface ResourceFieldProps<T>
  extends   MixinProps<"container", ComponentProps<"div">>,
    MixinProps<"popover", ComponentProps<typeof PopoverContent>>,
    MixinProps<"label", Omit<ComponentProps<typeof Label>, "children">>,
    MixinProps<"error", Omit<ComponentProps<"p">, "children">> {
  value: T | null
  onChange: (val: T | null) => void
  items: T[]
  getItemTitle: (item: T) => string
  getItemGroup?: (item: T) => string
  renderSearchItem: (item: T, isSelected: boolean) => ReactNode
  renderSummary?: (item: T) => ReactNode
  searchFilter: (item: T, query: string) => boolean
  renderActions?: ReactNode
  recentLabel?: string
  label?: ReactNode
  error?: ReactNode
  placeholder?: string
  isLoading?: boolean
  defaultOpen?: boolean
}

function ResourceFieldItem({
  selected,
  className,
  children,
  ...props
}: ComponentProps<"div"> & { selected?: boolean }) {
  return (
    <div
      data-slot="resource-field-item"
      data-selected={selected || undefined}
      className={cn(
        "group/row relative flex w-full items-center justify-between overflow-hidden rounded-md py-2.5 pr-3 pl-3.5 text-left text-sm text-foreground",
        "before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-primary before:opacity-0 before:content-['']",
        "hover:bg-accent hover:before:opacity-100",
        "group-hover/item:bg-accent group-hover/item:before:opacity-100",
        "group-focus-visible/item:bg-accent group-focus-visible/item:before:opacity-100",
        selected && "bg-accent before:opacity-100",
        className
      )}
      {...props}
    >
      <span className="min-w-0 truncate">{children}</span>
      <CornerDownLeft
        className={cn(
          "size-4 shrink-0 text-primary opacity-0",
          "group-hover/row:opacity-100 group-hover/item:opacity-100 group-focus-visible/item:opacity-100",
          selected && "opacity-100"
        )}
      />
    </div>
  )
}

function ResourceFieldKey({
  resource,
  className,
  ...inputProps
}: Omit<ComponentProps<typeof Input>, "className"> & {
  resource: ReactNode
  className?: string
}) {
  return (
    <div data-slot="resource-field-key" className={cn("flex min-w-0 items-center gap-1", className)}>
      <PopoverTrigger
        type="button"
        className="inline-flex h-9 min-w-0 items-center gap-1.5 rounded-lg border border-input bg-popover px-2.5 font-mono text-sm text-foreground outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <span className="truncate">{resource}</span>
        <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" />
      </PopoverTrigger>
      <span className="select-none text-muted-foreground">.</span>
      <Input className="h-9 w-28 font-mono md:text-sm" {...inputProps} />
    </div>
  )
}

function ResourceField<T>({
  value,
  onChange,
  items,
  getItemTitle,
  getItemGroup,
  renderSearchItem,
  renderSummary,
  searchFilter,
  renderActions,
  recentLabel = "Recent",
  label,
  error,
  placeholder = "Search resources",
  isLoading = false,
  defaultOpen = false,
  ...mixProps
}: ResourceFieldProps<T>) {
  const {
    container,
    label: labelProps,
    error: errorProps,
    popover: popProps,
  } = splitProps(mixProps, "container", "label", "error", "popover")

  const [open, setOpen] = useState(defaultOpen)
  const [query, setQuery] = useState("")
  const [anchor, setAnchor] = useState<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = useMemo(
    () => items.filter((item) => searchFilter(item, query)),
    [items, query, searchFilter]
  )

  const grouped = useMemo(() => {
    if (!getItemGroup) return null
    const groups = new Map<string, T[]>()
    for (const item of filtered) {
      const group = getItemGroup(item)
      const list = groups.get(group) ?? []
      list.push(item)
      groups.set(group, list)
    }
    return [...groups.entries()]
  }, [filtered, getItemGroup])

  const isItemSelected = (item: T) =>
    value != null && getItemTitle(value) === getItemTitle(item)

  const selectItem = (item: T) => {
    onChange(item)
    setOpen(false)
    setQuery("")
  }

  const renderItemButton = (item: T) => (
    <button
      key={getItemTitle(item)}
      type="button"
      className="group/item w-full cursor-pointer border-0 bg-transparent p-0 text-left outline-none"
      onClick={() => selectItem(item)}
    >
      {renderSearchItem(item, isItemSelected(item))}
    </button>
  )

  const picker = (
    <PopoverContent
      {...popProps}
      align="start"
      anchor={anchor ?? undefined}
      className={cn(
        "w-(--anchor-width) min-w-72 overflow-hidden border-2 border-ring p-0",
        popProps.className
      )}
    >
      <div className="p-2">
        <InputGroup className="rounded-lg border-input bg-card shadow-none has-[:focus-visible]:border-ring has-[:focus-visible]:ring-0">
          <InputGroupAddon align="inline-start">
            <Search className="size-4 text-muted-foreground" />
          </InputGroupAddon>
          <InputGroupInput
            ref={inputRef}
            placeholder={placeholder}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </InputGroup>
      </div>

      <div className="max-h-80 overflow-y-auto pb-1">
        {renderActions && !query ? (
          <div>
            <div className="px-3 py-1.5 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
              Create
            </div>
            {renderActions}
          </div>
        ) : null}

        {grouped
          ? grouped.map(([group, groupItems]) => (
              <div key={group} className="px-1">
                <div className="px-2 py-1.5 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                  {group}
                </div>
                <div className="flex flex-col gap-0.5">
                  {groupItems.map(renderItemButton)}
                </div>
              </div>
            ))
          : (
            <>
              {filtered.length > 0 && !query ? (
                <div className="px-3 py-1.5 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                  {recentLabel}
                </div>
              ) : null}
              <div className="flex flex-col gap-0.5 px-1">
                {filtered.map(renderItemButton)}
              </div>
            </>
          )}

        {filtered.length === 0 ? (
          <div className="p-4 text-center text-xs text-muted-foreground">
            No results found
          </div>
        ) : null}
      </div>
    </PopoverContent>
  )

  const trigger = (text: string) => (
    <PopoverTrigger
      type="button"
      className={cn(
        "flex h-9 w-full items-center justify-between rounded-lg border border-input bg-popover px-2.5 text-sm transition-colors outline-none select-none",
        "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
        !value && "text-muted-foreground",
        error && "border-error shadow-ring-error ring-0"
      )}
    >
      <span className="truncate">{text}</span>
      {isLoading ? (
        <Spinner size={20} />
      ) : (
        <ChevronsUpDown className="ml-2 size-4 shrink-0 text-muted-foreground" />
      )}
    </PopoverTrigger>
  )

  const selectedTriggerClassName = cn(
    "inline-flex h-9 min-w-0 items-center gap-1.5 rounded-lg border border-input bg-popover px-2.5 font-mono text-sm text-foreground outline-none select-none",
    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
    error && "border-error shadow-ring-error ring-0"
  )

  const summary = value ? renderSummary?.(value) : null

  const field = (
    <Popover open={open} onOpenChange={setOpen}>
      {value ? (
        <div ref={setAnchor} className="flex min-w-0 items-center">
          {summary ?? (
            <PopoverTrigger type="button" className={selectedTriggerClassName}>
              <span className="truncate">{getItemTitle(value)}</span>
              {isLoading ? (
                <Spinner size={20} />
              ) : (
                <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" />
              )}
            </PopoverTrigger>
          )}
        </div>
      ) : (
        trigger(placeholder)
      )}
      {picker}
    </Popover>
  )

  return (
    <div
      {...container}
      className={cn("flex w-full flex-col gap-1.5", container.className)}
    >
      {label ? (
        <Label {...labelProps} className={cn("font-semibold", labelProps.className)}>
          {label}
        </Label>
      ) : null}
      {field}
      {error ? (
        <p
          {...errorProps}
          className={cn("text-sm text-error", errorProps.className)}
        >
          {error}
        </p>
      ) : null}
    </div>
  )
}

export { ResourceField, ResourceFieldItem, ResourceFieldKey }
