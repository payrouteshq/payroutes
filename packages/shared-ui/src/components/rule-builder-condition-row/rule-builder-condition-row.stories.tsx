import { Controller, useFieldArray, useForm } from "react-hook-form"
import type { Meta, StoryObj } from "@storybook/react"

import { RuleBuilderConditionGroup } from "../rule-builder-condition-group"
import { RuleBuilderConditionRow } from "./index"

type Resource = {
  id: string
  title: string
  kind: "object" | "string"
}

const resources: Resource[] = [
  { id: "customer.metadata", title: "customer.metadata", kind: "object" },
  { id: "customer.email", title: "customer.email", kind: "string" },
  { id: "product.metadata", title: "product.metadata", kind: "object" },
  { id: "payment.status", title: "payment.status", kind: "string" },
]

type Condition = {
  resourceId: string
  fieldKey: string
  operator: string
  value: string
}

type FormValues = {
  combinator: string
  conditions: Condition[]
}

const figCondition = (overrides?: Partial<Condition>): Condition => ({
  resourceId: "customer.metadata",
  fieldKey: "plan_tier",
  operator: "is",
  value: "enterprise",
  ...overrides,
})

function findResource(id: string) {
  return resources.find((item) => item.id === id) ?? null
}

function ConditionRow({
  value,
  onChange,
  onRemove,
  disabled,
}: {
  value: Condition
  onChange: (value: Condition) => void
  onRemove?: () => void
  disabled?: boolean
}) {
  return (
    <RuleBuilderConditionRow
      resource={findResource(value.resourceId)}
      onResourceChange={(item) =>
        onChange({ ...value, resourceId: item?.id ?? "" })
      }
      resources={resources}
      getItemValue={(item) => item.id}
      getItemTitle={(item) => item.title}
      getHasKey={(item) => item.kind === "object"}
      fieldKey={value.fieldKey}
      onFieldKeyChange={(fieldKey) => onChange({ ...value, fieldKey })}
      operator={value.operator}
      onOperatorChange={(operator) =>
        onChange({ ...value, operator: operator ?? "is" })
      }
      value={value.value}
      onValueChange={(next) => onChange({ ...value, value: next })}
      onRemove={onRemove}
      disabled={disabled}
    />
  )
}

function FlatGroupDemo({
  disabled,
  defaultConditions,
}: {
  disabled?: boolean
  defaultConditions?: Condition[]
}) {
  const form = useForm<FormValues>({
    defaultValues: {
      combinator: "and",
      conditions: defaultConditions ?? [
        figCondition(),
        figCondition({
          resourceId: "customer.email",
          fieldKey: "",
          value: "eu",
        }),
      ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "conditions",
  })

  return (
    <RuleBuilderConditionGroup
      combinator={form.watch("combinator")}
      onCombinatorChange={(value) =>
        form.setValue("combinator", value ?? "and")
      }
      onAddCondition={() =>
        append(figCondition({ fieldKey: "", value: "" }))
      }
      disabled={disabled}
    >
      {fields.map((field, index) => (
        <Controller
          key={field.id}
          control={form.control}
          name={`conditions.${index}`}
          render={({ field: rowField }) => (
            <ConditionRow
              value={rowField.value}
              onChange={rowField.onChange}
              onRemove={() => remove(index)}
              disabled={disabled}
            />
          )}
        />
      ))}
    </RuleBuilderConditionGroup>
  )
}

const meta: Meta<typeof RuleBuilderConditionRow> = {
  title: "Components/RuleBuilderConditionRow",
  component: RuleBuilderConditionRow,
}

export default meta

type Story = StoryObj<typeof RuleBuilderConditionRow>

export const Default: Story = {
  render: () => <FlatGroupDemo />,
}

export const Disabled: Story = {
  render: () => <FlatGroupDemo disabled />,
}

export const Empty: Story = {
  render: () => (
    <FlatGroupDemo
      defaultConditions={[
        figCondition({ resourceId: "", fieldKey: "", operator: "is", value: "" }),
      ]}
    />
  ),
}

export const Single: Story = {
  render: function SingleStory() {
    const form = useForm<{ conditions: Condition[] }>({
      defaultValues: { conditions: [figCondition()] },
    })

    const { fields, remove } = useFieldArray({
      control: form.control,
      name: "conditions",
    })

    return (
      <>
        {fields.map((field, index) => (
          <Controller
            key={field.id}
            control={form.control}
            name={`conditions.${index}`}
            render={({ field: rowField }) => (
              <ConditionRow
                value={rowField.value}
                onChange={rowField.onChange}
                onRemove={() => remove(index)}
              />
            )}
          />
        ))}
      </>
    )
  },
}
