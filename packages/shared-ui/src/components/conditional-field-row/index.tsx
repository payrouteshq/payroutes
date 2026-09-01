import * as React from "react";

import { cn } from "../../cn";
import { Label } from "../../ui/label";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import { EmbeddedFieldRow } from "../field-stack";

export interface ConditionalFieldRowOption {
  value: string;
  label: React.ReactNode;
}

export interface ConditionalFieldRowProps extends Omit<React.ComponentProps<"div">, "children"> {
  label?: React.ReactNode;
  options: ConditionalFieldRowOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string | null) => void;
  when?: string;
  children?: React.ReactNode;
}

function ConditionalFieldRow({
  label,
  options,
  value,
  defaultValue,
  onValueChange,
  when,
  children,
  className,
  ...props
}: ConditionalFieldRowProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? options[0]?.value ?? "");
  const selected = isControlled ? value : internal;
  const showNested = Boolean(children) && (when ? selected === when : false);

  return (
    <div data-slot="conditional-field-row" className={cn("flex w-full flex-col gap-2", className)} {...props}>
      {label ? <Label className="text-muted-foreground">{label}</Label> : null}

      <Tabs
        value={selected}
        onValueChange={(next) => {
          if (!isControlled) setInternal(String(next ?? ""));
          onValueChange?.(next == null ? null : String(next));
        }}
      >
        <TabsList>
          {options.map((option) => (
            <TabsTrigger key={option.value} value={option.value}>
              {option.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <EmbeddedFieldRow
        when={showNested}
        layout="stack"
        className="pl-6"
        connectorClassName="bottom-[18px] border-ring"
      >
        {children}
      </EmbeddedFieldRow>
    </div>
  );
}

export { ConditionalFieldRow };
