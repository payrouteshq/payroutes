import * as React from "react";

import { cn } from "../cn";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "group-data-[disabled=true]:text-disabled-foreground peer-disabled:text-disabled-foreground flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none peer-disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
}

export { Label };
