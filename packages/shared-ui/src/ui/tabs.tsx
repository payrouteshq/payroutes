import { createContext, useContext, useId } from "react"
import { LayoutGroup, motion } from "framer-motion"
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"

import { cn } from "../cn"

const TabsLayoutId = createContext("tabs-indicator")

function Tabs({ className, ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({ className, ...props }: TabsPrimitive.List.Props) {
  const id = useId()

  return (
    <TabsLayoutId.Provider value={id}>
      <LayoutGroup id={id}>
        <TabsPrimitive.List
          data-slot="tabs-list"
          className={cn(
            "relative flex w-full items-center rounded-lg border border-input bg-background p-0.5",
            className
          )}
          {...props}
        />
      </LayoutGroup>
    </TabsLayoutId.Provider>
  )
}

function TabsTrigger({
  className,
  children,
  ...props
}: TabsPrimitive.Tab.Props) {
  const layoutId = useContext(TabsLayoutId)

  return (
    <TabsPrimitive.Tab
      {...props}
      data-slot="tabs-trigger"
      className={cn(
        "relative isolate inline-flex flex-1 items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium text-foreground outline-none",
        "focus-visible:ring-3 focus-visible:ring-ring/50",
        "data-active:text-primary-foreground",
        "disabled:pointer-events-none disabled:text-disabled-foreground",
        className
      )}
      render={(rootProps, state) => (
        <button {...rootProps}>
          {state.active ? (
            <motion.span
              layoutId={layoutId}
              className="absolute inset-0 -z-10 rounded-md bg-primary"
              initial={false}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          ) : null}
          {children}
        </button>
      )}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
