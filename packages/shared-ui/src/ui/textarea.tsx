import * as React from "react";

import { cn } from "../cn";

type TextareaProps = React.ComponentProps<"textarea"> & {
  "data-state"?: "focus";
};

function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 data-[state=focus]:border-ring data-[state=focus]:ring-ring/50 disabled:bg-disabled disabled:text-disabled-foreground disabled:placeholder:text-disabled-foreground aria-invalid:border-error aria-invalid:shadow-ring-error dark:bg-input/30 dark:disabled:bg-disabled flex field-sizing-content min-h-16 w-full rounded-lg border bg-transparent px-2.5 py-2 text-base transition-colors outline-none focus-visible:ring-3 disabled:cursor-not-allowed disabled:border-transparent aria-invalid:ring-0 data-[state=focus]:ring-3 md:text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
export type { TextareaProps };
