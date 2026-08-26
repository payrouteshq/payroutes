import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { RuleBuilderConditionGroup } from "../rule-builder-condition-group"
import { RuleBuilderConditionRow } from "./index"

type Resource = {
  id: string
  title: string
}

const resources: Resource[] = [
  { id: "customer.metadata", title: "customer.metadata" },
  { id: "customer.email", title: "customer.email" },
  { id: "product.metadata", title: "product.metadata" },
  { id: "payment.status", title: "payment.status" },
]

type Row = {
  id: string
  resourceId: string
  fieldKey: string
  operator: string
  value: string
}

const figRow = (id: string, overrides?: Partial<Row>): Row => ({
  id,
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
  row,
  onChange,
  onRemove,
  disabled,
}: {
  row: Row
  onChange: (row: Row) => void
  onRemove?: () => void
  disabled?: boolean
}) {
  return (
    <RuleBuilderConditionRow
      resource={findResource(row.resourceId)}
      onResourceChange={(item) =>
        onChange({ ...row, resourceId: item?.id ?? "" })
      }
      resources={resources}
      getItemValue={(item) => item.id}
      getItemTitle={(item) => item.title}
      fieldKey={row.fieldKey}
      onFieldKeyChange={(fieldKey) => onChange({ ...row, fieldKey })}
      operator={row.operator}
      onOperatorChange={(operator) =>
        onChange({ ...row, operator: operator ?? "is" })
      }
      value={row.value}
      onValueChange={(value) => onChange({ ...row, value })}
      onRemove={onRemove}
      disabled={disabled}
    />
  )
}

function FlatGroupDemo({
  disabled,
  initialRows,
}: {
  disabled?: boolean
  initialRows?: Row[]
}) {
  const [combinator, setCombinator] = useState("and")
  const [rows, setRows] = useState<Row[]>(
    initialRows ?? [
      figRow("1"),
      figRow("2", { fieldKey: "region", value: "eu" }),
    ]
  )

  return (
    <RuleBuilderConditionGroup
      combinator={combinator}
      onCombinatorChange={(value) => setCombinator(value ?? "and")}
      onAddCondition={() =>
        setRows((current) => [
          ...current,
          figRow(String(Date.now()), { fieldKey: "", value: "" }),
        ])
      }
      disabled={disabled}
    >
      {rows.map((row) => (
        <ConditionRow
          key={row.id}
          row={row}
          disabled={disabled}
          onChange={(next) =>
            setRows((current) =>
              current.map((item) => (item.id === next.id ? next : item))
            )
          }
          onRemove={() =>
            setRows((current) => current.filter((item) => item.id !== row.id))
          }
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
      initialRows={[
        figRow("1", { resourceId: "", fieldKey: "", operator: "is", value: "" }),
      ]}
    />
  ),
}

export const Single: Story = {
  render: function SingleStory() {
    const [row, setRow] = useState(figRow("1"))
    return (
      <ConditionRow
        row={row}
        onChange={setRow}
        onRemove={() => undefined}
      />
    )
  },
}
