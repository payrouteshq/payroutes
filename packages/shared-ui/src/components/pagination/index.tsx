import type { ComponentProps } from "react";

import { cn } from "../../cn";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "../../icons";
import { type MixinProps, splitProps } from "../../lib/mixin";
import { Button, type ButtonProps } from "../../ui/button";

export interface PaginationProps extends MixinProps<"container", ComponentProps<"nav">>, ComponentProps<"nav"> {}

function PaginationRoot({ children, className, ...mixProps }: PaginationProps) {
  const { container, rest } = splitProps(mixProps, "container");

  return (
    <nav
      data-slot="pagination"
      role="navigation"
      aria-label="pagination"
      {...rest}
      {...container}
      className={cn("mx-auto flex w-full justify-center", className, container.className)}
    >
      {children}
    </nav>
  );
}

function PaginationContent({ className, ...props }: ComponentProps<"ul">) {
  return <ul data-slot="pagination-content" className={cn("flex items-center gap-0.5", className)} {...props} />;
}

function PaginationItem({ ...props }: ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
  boxed?: boolean;
} & ButtonProps;

function PaginationLink({ className, isActive, boxed, size = "icon", variant, ...props }: PaginationLinkProps) {
  return (
    <Button
      variant={variant ?? (boxed ? "ghost" : isActive ? "outline" : "ghost")}
      size={size}
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive || undefined}
      data-boxed={boxed || undefined}
      className={cn(
        boxed &&
          "border-input bg-card text-foreground hover:bg-subtle data-[state=hover]:bg-subtle size-9 border hover:shadow-none data-[state=hover]:shadow-none",
        boxed &&
          isActive &&
          "bg-primary text-primary-foreground hover:bg-primary data-[state=hover]:bg-primary border-transparent",
        boxed && "disabled:bg-disabled disabled:text-disabled-foreground disabled:border-transparent",
        className
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  boxed,
  text = boxed ? false : "Previous",
  children,
  ...props
}: PaginationLinkProps & { text?: string | false }) {
  const showText = Boolean(text);

  return (
    <PaginationLink
      aria-label="Go to previous page"
      size={showText ? "default" : "icon"}
      boxed={boxed}
      className={cn(showText && "pl-1.5", className)}
      {...props}
    >
      {children ?? (
        <>
          <ChevronLeft data-icon="inline-start" />
          {showText ? <span className="hidden sm:block">{text}</span> : null}
        </>
      )}
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  boxed,
  text = boxed ? false : "Next",
  children,
  ...props
}: PaginationLinkProps & { text?: string | false }) {
  const showText = Boolean(text);

  return (
    <PaginationLink
      aria-label="Go to next page"
      size={showText ? "default" : "icon"}
      boxed={boxed}
      className={cn(showText && "pr-1.5", className)}
      {...props}
    >
      {children ?? (
        <>
          {showText ? <span className="hidden sm:block">{text}</span> : null}
          <ChevronRight data-icon="inline-end" />
        </>
      )}
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("text-muted-foreground flex size-8 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

const Pagination = Object.assign(PaginationRoot, {
  Content: PaginationContent,
  Item: PaginationItem,
  Link: PaginationLink,
  Previous: PaginationPrevious,
  Next: PaginationNext,
  Ellipsis: PaginationEllipsis,
});

export { Pagination };
