import * as React from "react";

import { AnimatePresence, motion } from "framer-motion";

import { cn } from "../../cn";
import { CloseX } from "../../icons";
import { Button, type ButtonProps } from "../../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";

type ModalButtonProps = ButtonProps & {
  children: React.ReactNode;
};

export interface AppModalOptions {
  title: string;
  step?: React.ReactNode;
  description?: string;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  primaryButton?: ModalButtonProps;
  secondaryButton?: ModalButtonProps;
  size?: "small" | "medium" | "full";
  showCloseButton?: boolean;
  onClose?: () => void;
}

type ModalState = { open: boolean; config: AppModalOptions | null };
type SetModalState = (value: ModalState | ((prev: ModalState) => ModalState)) => void;

let setGlobalState: SetModalState | null = null;

export const AppModal = {
  open: (options: AppModalOptions) => setGlobalState?.({ open: true, config: options }),
  close: () => setGlobalState?.((prev) => ({ ...prev, open: false })),
  updateConfig: (partial: Partial<AppModalOptions>) =>
    setGlobalState?.((prev) => (prev.config ? { ...prev, config: { ...prev.config, ...partial } } : prev)),
};

export interface AppModalUIProps extends AppModalOptions {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onExited?: () => void;
}

const sizeStyles = {
  small: "max-h-[90vh] sm:max-w-md",
  medium: "max-h-[90vh] sm:max-w-2xl",
  full: "h-full max-h-none w-full max-w-none rounded-none sm:max-w-none",
};

function AppModalUI({
  open,
  onOpenChange,
  title,
  step,
  description,
  content,
  footer,
  primaryButton,
  secondaryButton,
  size = "small",
  showCloseButton = true,
  onExited,
}: AppModalUIProps) {
  const [present, setPresent] = React.useState(open);

  React.useEffect(() => {
    if (open) setPresent(true);
  }, [open]);

  const generatedFooter =
    footer ??
    (primaryButton || secondaryButton ? (
      <>
        {primaryButton ? <Button size="lg" {...primaryButton} /> : null}
        {secondaryButton ? <Button variant="ghost" size="lg" {...secondaryButton} /> : null}
      </>
    ) : null);

  return (
    <Dialog open={present} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        viewportClassName={size === "full" ? "p-0" : undefined}
        className={cn(
          "overflow-visible border-none bg-transparent p-0 shadow-none",
          "data-closed:animate-none data-open:animate-none",
          sizeStyles[size]
        )}
      >
        <AnimatePresence
          onExitComplete={() => {
            if (!open) {
              setPresent(false);
              onExited?.();
            }
          }}
        >
          {open ? (
            <motion.div
              key="app-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: { type: "spring", stiffness: 400, damping: 32 },
              }}
              exit={{
                scale: 0.98,
                opacity: 0,
                transition: { duration: 0.12, ease: [0.32, 0.72, 0, 1] },
              }}
              className={cn(
                "border-ring bg-popover text-popover-foreground shadow-elevation-md relative flex min-w-0 flex-col gap-3 overflow-hidden rounded-xl border p-5",
                size === "full" && "h-full min-h-screen w-full rounded-none",
                size !== "full" && "h-auto max-h-[90vh] w-full"
              )}
            >
              {showCloseButton ? (
                <DialogClose
                  aria-label="Close"
                  className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 absolute top-4 right-4 inline-flex size-8 items-center justify-center rounded-md outline-none focus-visible:ring-3"
                >
                  <CloseX className="size-6" />
                </DialogClose>
              ) : null}

              <DialogHeader className={cn(showCloseButton && "pr-10")}>
                {step ? (
                  <p data-slot="app-modal-step" className="text-primary text-xs font-medium tracking-wider uppercase">
                    {step}
                  </p>
                ) : null}
                <DialogTitle>{title}</DialogTitle>
                {description ? <DialogDescription className="text-base">{description}</DialogDescription> : null}
              </DialogHeader>

              {content ? (
                <div
                  className={cn(
                    "min-h-0 min-w-0",
                    size === "full" ? "flex flex-1 flex-col overflow-y-auto" : "overflow-auto"
                  )}
                >
                  {content}
                </div>
              ) : null}

              {generatedFooter ? (
                <DialogFooter className="border-border border-t pt-4">{generatedFooter}</DialogFooter>
              ) : null}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

export function AppModalProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<ModalState>({
    open: false,
    config: null,
  });

  React.useEffect(() => {
    setGlobalState = setState;
    return () => {
      setGlobalState = null;
    };
  }, []);

  const close = React.useCallback(() => {
    setState((prev) => {
      prev.config?.onClose?.();
      return { ...prev, open: false };
    });
  }, []);

  return (
    <>
      {children}
      {state.config ? (
        <AppModalUI
          {...state.config}
          open={state.open}
          onOpenChange={(nextOpen) => {
            if (!nextOpen) close();
          }}
          onExited={() => setState({ open: false, config: null })}
          secondaryButton={
            state.config.secondaryButton
              ? {
                  ...state.config.secondaryButton,
                  onClick: (event) => {
                    state.config?.secondaryButton?.onClick?.(event);
                    close();
                  },
                }
              : undefined
          }
        />
      ) : null}
    </>
  );
}

export { AppModalUI };
export type { ModalButtonProps };
