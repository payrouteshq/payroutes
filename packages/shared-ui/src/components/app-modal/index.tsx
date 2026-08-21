import {
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { AnimatePresence, motion } from "framer-motion"

import { CloseX } from "../../icons"
import { cn } from "../../cn"
import { Button, type ButtonProps } from "../../ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog"

type ModalButtonProps = ButtonProps & {
  children: ReactNode
}

export interface AppModalOptions {
  title: string
  step?: ReactNode
  description?: string
  content?: ReactNode
  footer?: ReactNode
  primaryButton?: ModalButtonProps
  secondaryButton?: ModalButtonProps
  size?: "small" | "medium" | "full"
  showCloseButton?: boolean
  onClose?: () => void
}

type ModalState = { open: boolean; config: AppModalOptions | null }
type SetModalState = (value: ModalState | ((prev: ModalState) => ModalState)) => void

let setGlobalState: SetModalState | null = null

export const AppModal = {
  open: (options: AppModalOptions) =>
    setGlobalState?.({ open: true, config: options }),
  close: () => setGlobalState?.((prev) => ({ ...prev, open: false })),
  updateConfig: (partial: Partial<AppModalOptions>) =>
    setGlobalState?.((prev) =>
      prev.config ? { ...prev, config: { ...prev.config, ...partial } } : prev
    ),
}

export interface AppModalUIProps extends AppModalOptions {
  open: boolean
  onOpenChange: (open: boolean) => void
  onExited?: () => void
}

const sizeStyles = {
  small: "max-h-[90vh] sm:max-w-md",
  medium: "max-h-[90vh] sm:max-w-2xl",
  full: "h-full max-h-none w-full max-w-none rounded-none sm:max-w-none",
}

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
  const [present, setPresent] = useState(open)

  useEffect(() => {
    if (open) setPresent(true)
  }, [open])

  const generatedFooter =
    footer ??
    ((primaryButton || secondaryButton) ? (
      <>
        {primaryButton ? <Button size="lg" {...primaryButton} /> : null}
        {secondaryButton ? (
          <Button variant="ghost" size="lg" {...secondaryButton} />
        ) : null}
      </>
    ) : null)

  return (
    <Dialog open={present} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        viewportClassName={size === "full" ? "p-0" : undefined}
        className={cn(
          "overflow-visible border-none bg-transparent p-0 shadow-none",
          "data-open:animate-none data-closed:animate-none",
          sizeStyles[size]
        )}
      >
        <AnimatePresence
          onExitComplete={() => {
            if (!open) {
              setPresent(false)
              onExited?.()
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
                "relative flex min-w-0 flex-col gap-3 overflow-hidden rounded-xl border border-ring bg-popover p-5 text-popover-foreground shadow-elevation-md",
                size === "full" && "h-full min-h-screen w-full rounded-none",
                size !== "full" && "h-auto max-h-[90vh] w-full"
              )}
            >
              {showCloseButton ? (
                <DialogClose
                  aria-label="Close"
                  className="absolute top-4 right-4 inline-flex size-8 items-center justify-center rounded-md text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <CloseX className="size-6" />
                </DialogClose>
              ) : null}

              <DialogHeader className={cn(showCloseButton && "pr-10")}>
                {step ? (
                  <p
                    data-slot="app-modal-step"
                    className="text-xs font-medium tracking-wider text-primary uppercase"
                  >
                    {step}
                  </p>
                ) : null}
                <DialogTitle>{title}</DialogTitle>
                {description ? (
                  <DialogDescription className="text-base">
                    {description}
                  </DialogDescription>
                ) : null}
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
                <DialogFooter className="border-t border-border pt-4">
                  {generatedFooter}
                </DialogFooter>
              ) : null}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}

export function AppModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ModalState>({
    open: false,
    config: null,
  })

  useEffect(() => {
    setGlobalState = setState
    return () => {
      setGlobalState = null
    }
  }, [])

  const close = useCallback(() => {
    setState((prev) => {
      prev.config?.onClose?.()
      return { ...prev, open: false }
    })
  }, [])

  return (
    <>
      {children}
      {state.config ? (
        <AppModalUI
          {...state.config}
          open={state.open}
          onOpenChange={(nextOpen) => {
            if (!nextOpen) close()
          }}
          onExited={() => setState({ open: false, config: null })}
          secondaryButton={
            state.config.secondaryButton
              ? {
                  ...state.config.secondaryButton,
                  onClick: (event) => {
                    state.config?.secondaryButton?.onClick?.(event)
                    close()
                  },
                }
              : undefined
          }
        />
      ) : null}
    </>
  )
}

export { AppModalUI }
export type { ModalButtonProps }
