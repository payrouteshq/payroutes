import type { ComponentProps } from "react"

import { type MixinProps, splitProps } from "../../lib/mixin"
import { cn } from "../../cn"
import { Badge } from "../../ui/badge"

export interface AppConnectionProps
  extends MixinProps<"container", ComponentProps<"div">>,
    ComponentProps<"div"> {}

function AppConnectionRoot({
  children,
  className,
  ...mixProps
}: AppConnectionProps) {
  const { container, rest } = splitProps(mixProps, "container")

  return (
    <div
      data-slot="app-connection"
      {...rest}
      {...container}
      className={cn(
        "flex w-full flex-col gap-4 rounded-lg border border-ring bg-card p-4",
        className,
        container.className
      )}
    >
      {children}
    </div>
  )
}

function AppConnectionIcon({
  className,
  children,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      data-slot="app-connection-icon"
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-md bg-secondary text-xs font-semibold text-primary",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

function AppConnectionContent({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="app-connection-content"
      className={cn("flex flex-1 items-start justify-between gap-2", className)}
      {...props}
    />
  )
}

function AppConnectionMeta({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="app-connection-meta"
      className={cn("min-w-0 space-y-1", className)}
      {...props}
    />
  )
}

function AppConnectionTitle({
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      data-slot="app-connection-title"
      className={cn("text-sm font-semibold text-foreground", className)}
      {...props}
    />
  )
}

function AppConnectionDescription({
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      data-slot="app-connection-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function AppConnectionBadge({
  className,
  children = "Live",
  ...props
}: ComponentProps<typeof Badge>) {
  return (
    <Badge
      data-slot="app-connection-badge"
      className={cn("shrink-0", className)}
      {...props}
    >
      {children}
    </Badge>
  )
}

function AppConnectionActions({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="app-connection-actions"
      className={cn(
        "mt-auto flex gap-2 [&_[data-slot=button]]:flex-1",
        className
      )}
      {...props}
    />
  )
}

const AppConnection = Object.assign(AppConnectionRoot, {
  Icon: AppConnectionIcon,
  Content: AppConnectionContent,
  Meta: AppConnectionMeta,
  Title: AppConnectionTitle,
  Description: AppConnectionDescription,
  Badge: AppConnectionBadge,
  Actions: AppConnectionActions,
})

export { AppConnection }
