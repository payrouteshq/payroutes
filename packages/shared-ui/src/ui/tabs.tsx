import * as React from "react";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { LayoutGroup, motion } from "framer-motion";

import { cn } from "../cn";

const TabsLayoutId = React.createContext("tabs-indicator");

function Tabs({ className, ...props }: TabsPrimitive.Root.Props) {
  return <TabsPrimitive.Root data-slot="tabs" className={cn("flex flex-col gap-2", className)} {...props} />;
}

function TabsList({ className, ...props }: TabsPrimitive.List.Props) {
  const id = React.useId();

  return (
    <TabsLayoutId.Provider value={id}>
      <LayoutGroup id={id}>
        <TabsPrimitive.List
          data-slot="tabs-list"
          className={cn(
            "border-input bg-background relative flex w-full items-center rounded-lg border p-0.5",
            className
          )}
          {...props}
        />
      </LayoutGroup>
    </TabsLayoutId.Provider>
  );
}

function TabsTrigger({ className, children, ...props }: TabsPrimitive.Tab.Props) {
  const layoutId = React.useContext(TabsLayoutId);

  return (
    <TabsPrimitive.Tab
      {...props}
      data-slot="tabs-trigger"
      className={cn(
        "text-foreground relative isolate inline-flex flex-1 items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium outline-none",
        "focus-visible:ring-ring/50 focus-visible:ring-3",
        "data-active:text-primary-foreground",
        "disabled:text-disabled-foreground disabled:pointer-events-none",
        className
      )}
      render={(rootProps, state) => (
        <button {...rootProps}>
          {state.active ? (
            <motion.span
              layoutId={layoutId}
              className="bg-primary absolute inset-0 -z-10 rounded-md"
              initial={false}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          ) : null}
          {children}
        </button>
      )}
    />
  );
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return <TabsPrimitive.Panel data-slot="tabs-content" className={cn("outline-none", className)} {...props} />;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
