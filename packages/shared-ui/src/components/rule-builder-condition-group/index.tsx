import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../cn";
import { CloseX, Plus } from "../../icons";
import { type MixinProps, splitProps } from "../../lib/mixin";
import { Button } from "../../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { EmbeddedFieldRow, FieldStack } from "../field-stack";

const DEFAULT_COMBINATORS = [
  { value: "and", label: "AND" },
  { value: "or", label: "OR" },
] as const;

export interface RuleBuilderConditionGroupProps
  extends
    MixinProps<"container", ComponentProps<"div">>,
    MixinProps<"trigger", Omit<ComponentProps<typeof SelectTrigger>, "children">>,
    MixinProps<"content", Omit<ComponentProps<typeof SelectContent>, "children">>,
    MixinProps<"addCondition", Omit<ComponentProps<typeof Button>, "children">>,
    MixinProps<"addGroup", Omit<ComponentProps<typeof Button>, "children">>,
    MixinProps<"remove", Omit<ComponentProps<typeof Button>, "children">> {
  combinator: string;
  onCombinatorChange: (value: string | null) => void;
  combinators?: { value: string; label: string }[];
  children?: ReactNode;
  onAddCondition?: () => void;
  onAddGroup?: () => void;
  onRemove?: () => void;
  addConditionLabel?: ReactNode;
  addGroupLabel?: ReactNode;
  disabled?: boolean;
}

function RuleBuilderConditionGroup({
  combinator,
  onCombinatorChange,
  combinators = [...DEFAULT_COMBINATORS],
  children,
  onAddCondition,
  onAddGroup,
  onRemove,
  addConditionLabel = "Add condition",
  addGroupLabel = "Add group",
  disabled = false,
  ...mixProps
}: RuleBuilderConditionGroupProps) {
  const { container, trigger, content, addCondition, addGroup, remove } = splitProps(
    mixProps,
    "container",
    "trigger",
    "content",
    "addCondition",
    "addGroup",
    "remove"
  );

  return (
    <FieldStack {...container} data-slot="rule-builder-condition-group" className={cn(container.className)}>
      <div className="flex items-center gap-2">
        <Select value={combinator} onValueChange={onCombinatorChange} disabled={disabled}>
          <SelectTrigger {...trigger} className={cn("w-fit font-medium", trigger.className)}>
            <SelectValue placeholder="AND" />
          </SelectTrigger>
          <SelectContent {...content}>
            {combinators.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {onRemove ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            aria-label="Remove group"
            disabled={disabled}
            {...remove}
            className={cn("text-muted-foreground ml-auto shrink-0", remove.className)}
            onClick={(event) => {
              remove.onClick?.(event);
              onRemove();
            }}
          >
            <CloseX className="size-4" />
          </Button>
        ) : null}
      </div>

      <EmbeddedFieldRow
        when={Boolean(children) || Boolean(onAddCondition) || Boolean(onAddGroup)}
        layout="stack"
        className="pl-6"
        connectorClassName="bottom-4 border-ring"
      >
        {children}
        {onAddCondition || onAddGroup ? (
          <div className="flex flex-wrap items-center gap-1">
            {onAddCondition ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={disabled}
                {...addCondition}
                className={cn("text-primary", addCondition.className)}
                onClick={(event) => {
                  addCondition.onClick?.(event);
                  onAddCondition();
                }}
              >
                <Plus className="size-3.5" />
                {addConditionLabel}
              </Button>
            ) : null}
            {onAddGroup ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={disabled}
                {...addGroup}
                className={cn("text-primary", addGroup.className)}
                onClick={(event) => {
                  addGroup.onClick?.(event);
                  onAddGroup();
                }}
              >
                <Plus className="size-3.5" />
                {addGroupLabel}
              </Button>
            ) : null}
          </div>
        ) : null}
      </EmbeddedFieldRow>
    </FieldStack>
  );
}

export { RuleBuilderConditionGroup };
