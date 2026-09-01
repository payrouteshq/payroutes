import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "../cn";

const avatarVariants = cva("relative flex shrink-0 overflow-hidden rounded-full select-none", {
  variants: {
    size: {
      sm: "size-8 text-xs",
      default: "size-10 text-sm",
      lg: "size-16 text-lg",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

function Avatar({
  className,
  size = "default",
  ...props
}: AvatarPrimitive.Root.Props & VariantProps<typeof avatarVariants>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(avatarVariants({ size }), className)}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-secondary text-foreground flex size-full items-center justify-center rounded-full font-medium",
        className
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback, avatarVariants };
