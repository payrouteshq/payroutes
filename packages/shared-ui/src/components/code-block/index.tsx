import { type ComponentProps, useMemo } from "react";

import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/esm/languages/prism/typescript";
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

import { cn } from "../../cn";
import { useCopy } from "../../hooks/use-copy";
import { Check, Copy } from "../../icons";
import { type MixinProps, splitProps } from "../../lib/mixin";
import { ScrollArea, ScrollBar } from "../../ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../ui/tooltip";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("json", json);

type Language = "tsx" | "typescript" | "bash" | "json" | "shell" | "sh" | "zsh";

export interface CodeBlockProps
  extends
    MixinProps<"container", ComponentProps<"div">>,
    MixinProps<"copy", Omit<ComponentProps<"button">, "children" | "onClick">> {
  language?: Language;
  children: string;
  filename?: string;
  logo?: string;
  showCopyButton?: boolean;
  maxHeight?: string | "none";
  theme?: "light" | "dark";
  className?: string;
  copyState?: "hover" | "copied";
}

function CopyAction({
  copied,
  onClick,
  className,
  "data-state": dataState,
  ...props
}: {
  copied: boolean;
  onClick: () => void;
  className?: string;
  "data-state"?: "hover" | "copied";
} & Omit<ComponentProps<"button">, "children" | "onClick" | "className">) {
  const isCopied = copied || dataState === "copied";

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <button
            type="button"
            aria-label={isCopied ? "Copied" : "Copy code"}
            data-state={dataState}
            className={cn(
              "inline-flex size-7 items-center justify-center rounded-md transition-colors outline-none",
              "text-code-foreground/50",
              "hover:bg-code-foreground hover:text-code",
              "data-[state=hover]:bg-code-foreground data-[state=hover]:text-code",
              "data-[state=copied]:bg-primary data-[state=copied]:text-primary-foreground",
              isCopied && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
              className
            )}
            onClick={onClick}
            {...props}
          />
        }
      >
        {isCopied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      </TooltipTrigger>
      <TooltipContent>{isCopied ? "Copied!" : "Copy code"}</TooltipContent>
    </Tooltip>
  );
}

function CodeBlock({
  language = "tsx",
  children,
  filename,
  logo,
  showCopyButton = true,
  maxHeight = "none",
  theme = "dark",
  className,
  copyState,
  ...mixProps
}: CodeBlockProps) {
  const { copied, copy } = useCopy();
  const { container, copy: copyProps } = splitProps(mixProps, "container", "copy");

  const isDark = theme === "dark";
  const showHeader = Boolean(filename || logo);
  const syntaxLanguage = language === "shell" || language === "sh" || language === "zsh" ? "bash" : language;

  const syntaxTheme = useMemo(() => {
    const base = isDark ? oneDark : oneLight;
    const bg = isDark ? "var(--code)" : "var(--muted)";

    return {
      ...base,
      'pre[class*="language-"]': {
        ...base['pre[class*="language-"]'],
        background: bg,
        margin: 0,
        padding: "1.25rem",
        minWidth: "100%",
        width: "max-content",
        overflow: "visible",
      },
      'code[class*="language-"]': {
        ...base['code[class*="language-"]'],
        background: "transparent",
        fontSize: "0.875rem",
        fontFamily: "var(--font-mono), monospace",
      },
    };
  }, [isDark]);

  return (
    <TooltipProvider delay={200}>
      <div
        data-slot="code-block"
        data-theme={theme}
        {...container}
        className={cn(
          "group relative flex w-full flex-col overflow-hidden rounded-xl border",
          isDark ? "border-code-foreground/10 bg-code" : "border-border bg-muted/50",
          className,
          container.className
        )}
        style={{
          height: maxHeight === "none" ? "auto" : maxHeight,
          ...container.style,
        }}
      >
        {showHeader ? (
          <div
            className={cn(
              "sticky top-0 z-20 flex shrink-0 items-center justify-between border-b px-4 py-2",
              isDark ? "border-code-foreground/10 bg-code" : "border-border bg-muted/50"
            )}
          >
            <div className="flex items-center gap-2">
              {logo ? <img src={logo} alt="" width={14} height={14} className="object-contain" /> : null}
              {filename ? (
                <span
                  className={cn(
                    "font-mono text-xs font-medium",
                    isDark ? "text-code-foreground/50" : "text-muted-foreground"
                  )}
                >
                  {filename}
                </span>
              ) : null}
            </div>
            {showCopyButton ? (
              <CopyAction copied={copied} onClick={() => copy(children)} data-state={copyState} {...copyProps} />
            ) : null}
          </div>
        ) : null}

        <ScrollArea className="relative min-h-0 w-full flex-1 bg-transparent">
          <SyntaxHighlighter
            language={syntaxLanguage}
            style={syntaxTheme}
            customStyle={{ display: "block", margin: 0 }}
          >
            {children.trim()}
          </SyntaxHighlighter>
          <ScrollBar orientation="horizontal" />

          {!showHeader && showCopyButton ? (
            <div className="absolute top-2 right-2 z-20">
              <CopyAction copied={copied} onClick={() => copy(children)} data-state={copyState} {...copyProps} />
            </div>
          ) : null}
        </ScrollArea>
      </div>
    </TooltipProvider>
  );
}

export { CodeBlock, CopyAction };
export type { Language };
