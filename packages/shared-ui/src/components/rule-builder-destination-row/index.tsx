import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../cn";
import { CloseX } from "../../icons";
import { type MixinProps, splitProps } from "../../lib/mixin";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

export interface RuleBuilderDestinationRowProps<T>
  extends
    MixinProps<"container", ComponentProps<"div">>,
    MixinProps<"trigger", Omit<ComponentProps<typeof SelectTrigger>, "children">>,
    MixinProps<"content", Omit<ComponentProps<typeof SelectContent>, "children">>,
    MixinProps<"input", Omit<ComponentProps<typeof Input>, "value" | "onChange">>,
    MixinProps<"suffix", Omit<ComponentProps<"span">, "children">>,
    MixinProps<"badge", Omit<ComponentProps<typeof Badge>, "children">>,
    MixinProps<"remove", Omit<ComponentProps<typeof Button>, "children">> {
  destination: T | null;
  onDestinationChange: (value: T | null) => void;
  destinations: T[];
  getItemValue: (item: T) => string;
  getItemTitle: (item: T) => string;
  share: string;
  onShareChange: (value: string) => void;
  suffix?: ReactNode;
  primary?: boolean;
  primaryLabel?: ReactNode;
  onRemove?: () => void;
  disabled?: boolean;
  placeholder?: string;
}

function RuleBuilderDestinationRow<T>({
  destination,
  onDestinationChange,
  destinations,
  getItemValue,
  getItemTitle,
  share,
  onShareChange,
  suffix = "%",
  primary = false,
  primaryLabel = "Primary",
  onRemove,
  disabled = false,
  placeholder = "Select destination",
  ...mixProps
}: RuleBuilderDestinationRowProps<T>) {
  const {
    container,
    trigger,
    content,
    input,
    suffix: suffixProps,
    badge,
    remove,
  } = splitProps(mixProps, "container", "trigger", "content", "input", "suffix", "badge", "remove");

  return (
    <div
      data-slot="rule-builder-destination-row"
      data-primary={primary || undefined}
      {...container}
      className={cn("flex items-center gap-3", container.className)}
    >
      <div className="relative z-10 min-w-0 flex-1">
        <Select
          value={destination ? getItemValue(destination) : null}
          onValueChange={(value) =>
            onDestinationChange(destinations.find((item) => getItemValue(item) === value) ?? null)
          }
          disabled={disabled}
        >
          <SelectTrigger {...trigger} className={cn("w-full", trigger.className)}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent {...content}>
            {destinations.map((item) => (
              <SelectItem key={getItemValue(item)} value={getItemValue(item)}>
                {getItemTitle(item)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">
        <Input
          {...input}
          type="text"
          inputMode="numeric"
          disabled={disabled}
          aria-label="Share"
          value={share}
          onChange={(event) => onShareChange(event.target.value)}
          className={cn("h-9 w-14 text-center md:text-sm", input.className)}
        />
        <span
          data-slot="rule-builder-destination-row-suffix"
          {...suffixProps}
          className={cn("text-muted-foreground text-sm select-none", suffixProps.className)}
        >
          {suffix}
        </span>
      </div>

      <div className="flex w-18 shrink-0 items-center justify-start">
        {primary ? (
          <Badge {...badge}>{primaryLabel}</Badge>
        ) : onRemove ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label="Remove destination"
            disabled={disabled}
            {...remove}
            className={cn("text-muted-foreground", remove.className)}
            onClick={(event) => {
              remove.onClick?.(event);
              onRemove();
            }}
          >
            <CloseX className="size-4" />
          </Button>
        ) : null}
      </div>
    </div>
  );
}

export { RuleBuilderDestinationRow };
