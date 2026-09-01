import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "../cn";

type InputProps = InputPrimitive.Props & {
  "data-state"?: "focus";
};

function Input({ className, type, ...props }: InputProps) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "border-input text-foreground file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 data-[state=focus]:border-ring data-[state=focus]:ring-ring/50 disabled:bg-disabled disabled:text-disabled-foreground disabled:placeholder:text-disabled-foreground aria-invalid:border-error aria-invalid:shadow-ring-error dark:bg-input/30 dark:disabled:bg-disabled h-9 w-full min-w-0 rounded-lg border bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-transparent aria-invalid:ring-0 data-[state=focus]:ring-3 md:text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Input };
export type { InputProps };
