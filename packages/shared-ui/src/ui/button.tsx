import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "../cn";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent font-medium whitespace-nowrap transition-shadow outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-linear-to-b from-gradient-start to-gradient-end text-primary-foreground hover:shadow-button-hover data-[state=hover]:shadow-button-hover disabled:from-disabled disabled:to-disabled disabled:text-disabled-foreground",
        outline:
          "border-primary bg-background text-primary hover:shadow-button-hover data-[state=hover]:shadow-button-hover disabled:border-disabled-foreground disabled:text-disabled-foreground",
        ghost:
          "text-primary hover:bg-accent hover:shadow-button-hover data-[state=hover]:bg-accent data-[state=hover]:shadow-button-hover disabled:text-disabled-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:shadow-button-hover data-[state=hover]:shadow-button-hover disabled:bg-disabled disabled:text-disabled-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:shadow-button-hover data-[state=hover]:shadow-button-hover disabled:bg-disabled disabled:text-disabled-foreground",
        link: "text-primary underline-offset-4 hover:underline disabled:text-disabled-foreground",
      },
      size: {
        default: "h-9 gap-2 px-2.5 py-1 text-sm",
        sm: "h-8 gap-1.5 px-3 text-sm",
        lg: "h-11 gap-2 px-5 text-sm",
        xs: "h-6 gap-1 px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        icon: "size-10",
        "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    "data-state"?: "hover";
  };

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return <ButtonPrimitive data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
export type { ButtonProps };
