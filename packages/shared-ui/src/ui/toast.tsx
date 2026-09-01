import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import { cva } from "class-variance-authority";

import { cn } from "../cn";
import { Check, CloseX } from "../icons";
import { Button } from "./button";

export type ToastType = "info" | "success" | "warning" | "error" | "copy" | "loading";

const toast = ToastPrimitive.createToastManager();

const toastSurfaceVariants = cva("rounded-xl outline-none", {
  variants: {
    type: {
      info: "[--toast-accent:var(--primary)] overflow-hidden border border-primary/20 border-l-[5px] border-l-primary bg-toast-info shadow-sm",
      success:
        "[--toast-accent:var(--success)] overflow-hidden border border-success/20 border-l-[5px] border-l-success bg-toast-success shadow-sm",
      warning:
        "[--toast-accent:var(--warning)] overflow-hidden border border-warning/20 border-l-[5px] border-l-warning bg-toast-warning shadow-sm",
      error:
        "[--toast-accent:var(--error)] overflow-hidden border border-error/20 border-l-[5px] border-l-error bg-toast-error shadow-sm",
      copy: "w-fit rounded-full border border-primary bg-card shadow-none",
      loading:
        "[--toast-accent:var(--muted-foreground)] overflow-hidden border border-border border-l-[5px] border-l-muted-foreground bg-muted shadow-sm",
    },
  },
  defaultVariants: {
    type: "info",
  },
});

function resolveToastType(type: string | undefined): ToastType {
  if (type === "success" || type === "warning" || type === "error" || type === "copy" || type === "loading") {
    return type;
  }

  return "info";
}

function ToastProvider({ ...props }: ToastPrimitive.Provider.Props) {
  return <ToastPrimitive.Provider {...props} />;
}

function ToastPortal({ ...props }: ToastPrimitive.Portal.Props) {
  return <ToastPrimitive.Portal data-slot="toast-portal" {...props} />;
}

function ToastViewport({ className, ...props }: ToastPrimitive.Viewport.Props) {
  return (
    <ToastPrimitive.Viewport
      data-slot="toast-viewport"
      className={cn(
        "pointer-events-none fixed right-4 bottom-4 z-50 w-[calc(100%-2rem)] max-w-72 outline-none",
        className
      )}
      {...props}
    />
  );
}

function Toast({ className, toast: toastItem, ...props }: ToastPrimitive.Root.Props) {
  const type = resolveToastType(toastItem.type);

  return (
    <ToastPrimitive.Root
      data-slot="toast"
      data-type={type}
      toast={toastItem}
      className={cn(
        "group/toast pointer-events-auto absolute right-0 bottom-0 z-[calc(1000-var(--toast-index))] origin-bottom-right will-change-transform select-none",
        type === "copy" ? "w-fit" : "w-full",
        "[--gap:0.75rem] [--offset-y:calc(var(--toast-offset-y)*-1+calc(var(--toast-index)*var(--gap)*-1)+var(--toast-swipe-movement-y))]",
        "h-(--toast-height) [transform:translateX(var(--toast-swipe-movement-x))_translateY(var(--offset-y))]",
        "[transition:transform_500ms_cubic-bezier(0.22,1,0.36,1),opacity_500ms,height_150ms]",
        "after:absolute after:top-full after:left-0 after:h-[calc(var(--gap)+1px)] after:w-full after:content-['']",
        "data-limited:opacity-0 data-starting-style:[transform:translateY(150%)]",
        "[&[data-ending-style]:not([data-limited]):not([data-swipe-direction])]:[transform:translateY(150%)]",
        "data-ending-style:data-[swipe-direction=down]:[transform:translateY(calc(var(--toast-swipe-movement-y)+150%))]",
        "data-ending-style:data-[swipe-direction=left]:[transform:translateX(calc(var(--toast-swipe-movement-x)-150%))_translateY(var(--offset-y))]",
        "data-ending-style:data-[swipe-direction=right]:[transform:translateX(calc(var(--toast-swipe-movement-x)+150%))_translateY(var(--offset-y))]",
        "data-ending-style:data-[swipe-direction=up]:[transform:translateY(calc(var(--toast-swipe-movement-y)-150%))]",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3",
        toastSurfaceVariants({ type }),
        className
      )}
      {...props}
    />
  );
}

function ToastContent({ className, ...props }: ToastPrimitive.Content.Props) {
  return (
    <ToastPrimitive.Content
      data-slot="toast-content"
      className={cn(
        "flex h-full items-start gap-2 overflow-hidden px-3.5 py-3 transition-opacity duration-250 ease-[cubic-bezier(0.22,1,0.36,1)]",
        "in-data-[type=copy]:items-center in-data-[type=copy]:px-3 in-data-[type=copy]:py-1.5",
        className
      )}
      {...props}
    />
  );
}

function ToastTitle({ className, ...props }: ToastPrimitive.Title.Props) {
  return (
    <ToastPrimitive.Title
      data-slot="toast-title"
      className={cn("text-[13px] leading-5 font-semibold text-(--toast-accent)", className)}
      {...props}
    />
  );
}

function ToastDescription({ className, ...props }: ToastPrimitive.Description.Props) {
  return (
    <ToastPrimitive.Description
      data-slot="toast-description"
      className={cn("text-muted-foreground mt-0.5 text-xs leading-4 font-normal", className)}
      {...props}
    />
  );
}

function ToastAction({
  className,
  render = <Button variant="outline" size="sm" />,
  ...props
}: ToastPrimitive.Action.Props) {
  return (
    <ToastPrimitive.Action data-slot="toast-action" render={render} className={cn("shrink-0", className)} {...props} />
  );
}

function ToastClose({ className, children, ...props }: ToastPrimitive.Close.Props) {
  return (
    <ToastPrimitive.Close
      data-slot="toast-close"
      aria-label="Close toast"
      className={cn(
        "text-muted-foreground relative -mr-0.5 shrink-0 rounded-md outline-none",
        "focus-visible:ring-ring/50 focus-visible:ring-3",
        className
      )}
      {...props}
    >
      {children ?? <CloseX className="size-3.5" aria-hidden="true" />}
    </ToastPrimitive.Close>
  );
}

function ToastIcon({ type }: { type: string | undefined }) {
  const resolved = resolveToastType(type);

  if (resolved === "copy") {
    return (
      <span
        data-slot="toast-icon"
        className="bg-primary text-primary-foreground inline-flex size-4 shrink-0 items-center justify-center rounded-full"
      >
        <Check className="size-2.5" aria-hidden="true" />
      </span>
    );
  }

  if (resolved === "loading") {
    return (
      <span
        data-slot="toast-icon"
        className="mt-0.5 size-4 shrink-0 animate-spin rounded-full border-2 border-current border-t-transparent"
        aria-hidden="true"
      />
    );
  }

  return (
    <span
      data-slot="toast-icon"
      className="mt-1.5 size-1.5 shrink-0 rounded-full bg-(--toast-accent)"
      aria-hidden="true"
    />
  );
}

function ToastCard({
  type = "info",
  title,
  description,
  className,
  onClose,
}: {
  type?: ToastType;
  title: string;
  description?: string;
  className?: string;
  onClose?: () => void;
}) {
  const isCopy = type === "copy";

  return (
    <div
      data-slot="toast"
      data-type={type}
      className={cn(
        "pointer-events-auto relative w-full",
        isCopy && "w-fit",
        toastSurfaceVariants({ type }),
        className
      )}
    >
      <div className={cn("flex items-start gap-2 px-3.5 py-3", isCopy && "items-center px-3 py-1.5")}>
        <ToastIcon type={type} />
        <div className="min-w-0 flex-1">
          <p
            className={cn(
              isCopy ? "text-primary text-sm font-medium" : "text-[13px] leading-5 font-semibold text-(--toast-accent)"
            )}
          >
            {title}
          </p>
          {description ? (
            <p className="text-muted-foreground mt-0.5 text-xs leading-4 font-normal">{description}</p>
          ) : null}
        </div>
        {!isCopy ? (
          <button
            type="button"
            aria-label="Close toast"
            className="text-muted-foreground relative -mr-0.5 shrink-0 rounded-md outline-none"
            onClick={onClose}
          >
            <CloseX className="size-3.5" aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </div>
  );
}

function ToastList() {
  const { toasts } = ToastPrimitive.useToastManager();

  return toasts.map((toastItem) => {
    const type = resolveToastType(toastItem.type);

    return (
      <Toast key={toastItem.id} toast={toastItem}>
        <ToastContent>
          <ToastIcon type={type} />
          <div className="min-w-0 flex-1">
            <ToastTitle className={type === "copy" ? "text-primary text-sm font-medium" : undefined} />
            {toastItem.description ? <ToastDescription /> : null}
          </div>
          {toastItem.actionProps ? <ToastAction /> : null}
          {type !== "copy" ? <ToastClose /> : null}
        </ToastContent>
      </Toast>
    );
  });
}

function Toaster({ children, toastManager = toast, ...props }: ToastPrimitive.Provider.Props) {
  return (
    <ToastProvider toastManager={toastManager} {...props}>
      {children}
      <ToastPortal>
        <ToastViewport>
          <ToastList />
        </ToastViewport>
      </ToastPortal>
    </ToastProvider>
  );
}

const createToastManager = ToastPrimitive.createToastManager;
const useToastManager = ToastPrimitive.useToastManager;

export {
  Toaster,
  Toast,
  ToastAction,
  ToastCard,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastIcon,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  createToastManager,
  toast,
  toastSurfaceVariants,
  useToastManager,
};
