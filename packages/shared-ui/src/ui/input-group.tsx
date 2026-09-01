import * as React from "react";

import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "../cn";
import { Button, type ButtonProps } from "./button";
import { Input } from "./input";
import { Textarea } from "./textarea";

function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group border-input bg-popover relative flex h-9 w-full min-w-0 items-center rounded-lg border transition-colors outline-none",
        "has-[>textarea]:h-auto",
        "has-[>[data-align=inline-start]]:[&>input]:pl-2",
        "has-[>[data-align=inline-end]]:[&>input]:pr-2",
        "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:[&>input]:pb-3",
        "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:[&>input]:pt-3",
        "has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot=input-group-control]:focus-visible]:ring-3",
        "has-[:focus-visible]:border-ring has-[:focus-visible]:ring-ring/50 has-[:focus-visible]:ring-3",
        "data-[state=focus]:border-ring data-[state=focus]:ring-ring/50 data-[state=focus]:ring-3",
        "has-[[data-slot=input-group-control][aria-invalid=true]]:border-error has-[[data-slot=input-group-control][aria-invalid=true]]:shadow-ring-error has-[[data-slot=input-group-control][aria-invalid=true]]:ring-0",
        "aria-invalid:border-error aria-invalid:shadow-ring-error aria-invalid:ring-0",
        "has-[:disabled]:bg-disabled has-[:disabled]:text-disabled-foreground has-[:disabled]:border-transparent",
        "data-disabled:bg-disabled data-disabled:text-disabled-foreground data-disabled:border-transparent",
        "dark:bg-input/30 dark:has-[:disabled]:bg-disabled dark:data-disabled:bg-disabled",
        className
      )}
      {...props}
    />
  );
}

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none [&>svg:not([class*='size-'])]:size-4 group-data-disabled/input-group:text-disabled-foreground",
  {
    variants: {
      align: {
        "inline-start": "order-first pl-2.5 has-[>button]:ml-[-0.45rem]",
        "inline-end": "order-last pr-2.5 has-[>button]:mr-[-0.45rem]",
        "block-start": "order-first w-full justify-start px-2.5 pt-3 group-has-[>input]/input-group:pt-2.5",
        "block-end": "order-last w-full justify-start px-2.5 pb-3 group-has-[>input]/input-group:pb-2.5",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
);

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("button")) return;
        event.currentTarget.parentElement?.querySelector("input")?.focus();
      }}
      {...props}
    />
  );
}

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<ButtonProps, "size"> & {
  size?: ButtonProps["size"];
}) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      size={size}
      className={cn("shadow-none", className)}
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "text-muted-foreground flex items-center gap-2 text-sm [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
}

function InputGroupInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:border-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:border-0 aria-invalid:shadow-none data-[state=focus]:border-0 data-[state=focus]:ring-0 dark:bg-transparent",
        className
      )}
      {...props}
    />
  );
}

function InputGroupTextarea({ className, ...props }: React.ComponentProps<typeof Textarea>) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:border-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:border-0 aria-invalid:shadow-none data-[state=focus]:border-0 data-[state=focus]:ring-0 dark:bg-transparent",
        className
      )}
      {...props}
    />
  );
}

export { InputGroup, InputGroupAddon, InputGroupButton, InputGroupText, InputGroupInput, InputGroupTextarea };
