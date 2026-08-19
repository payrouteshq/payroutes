import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"

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
  resourceId: string
  fieldKey: string
  operator: string
  value: string
}

const figRow: Row = {
  resourceId: "customer.metadata",
  fieldKey: "plan_tier",
  operator: "is",
  value: "enterprise",
}

function findResource(id: string) {
  return resources.find((item) => item.id === id) ?? null
}

function ConditionRowDemo(props: {
  defaultRow?: Row
  showRemove?: boolean
  disabled?: boolean
}) {
  const [row, setRow] = useState<Row>(props.defaultRow ?? figRow)

  return (
    <RuleBuilderConditionRow
      resource={findResource(row.resourceId)}
      onResourceChange={(item) =>
        setRow((current) => ({ ...current, resourceId: item?.id ?? "" }))
      }
      resources={resources}
      getItemValue={(item) => item.id}
      getItemTitle={(item) => item.title}
      fieldKey={row.fieldKey}
      onFieldKeyChange={(fieldKey) =>
        setRow((current) => ({ ...current, fieldKey }))
      }
      operator={row.operator}
      onOperatorChange={(operator) =>
        setRow((current) => ({ ...current, operator: operator ?? "is" }))
      }
      value={row.value}
      onValueChange={(value) => setRow((current) => ({ ...current, value }))}
      onRemove={props.showRemove ? () => undefined : undefined}
      disabled={props.disabled}
    />
  )
}

const meta: Meta<typeof RuleBuilderConditionRow> = {
  title: "Components/RuleBuilderConditionRow",
  component: RuleBuilderConditionRow,
}

export default meta

type Story = StoryObj<typeof RuleBuilderConditionRow>

export const Default: Story = {
  render: () => <ConditionRowDemo showRemove />,
}

export const Disabled: Story = {
  render: () => <ConditionRowDemo showRemove disabled />,
}

export const Empty: Story = {
  render: () => (
    <ConditionRowDemo
      showRemove
      defaultRow={{
        resourceId: "",
        fieldKey: "",
        operator: "is",
        value: "",
      }}
    />
  ),
}
