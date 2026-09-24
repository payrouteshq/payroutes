import type { ReactNode } from "react";

import { cn } from "../cn";

function Callout({ icon, children, className }: { icon?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div
      data-slot="callout"
      className={cn(
        "border-border bg-card text-muted-foreground flex items-start gap-2.5 rounded-lg border px-4 py-3 text-sm leading-normal",
        className
      )}
    >
      {icon && <span className="mt-0.5 shrink-0 [&_svg]:size-4">{icon}</span>}
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

export { Callout };
