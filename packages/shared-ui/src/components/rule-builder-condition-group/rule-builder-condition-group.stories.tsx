import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { RuleBuilderConditionRow } from "../rule-builder-condition-row"
import { RuleBuilderConditionGroup } from "./index"

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

function GroupDemo({ disabled }: { disabled?: boolean }) {
  const [combinator, setCombinator] = useState("and")
  const [rows, setRows] = useState<Row[]>([
    figRow("1"),
    figRow("2", { fieldKey: "region", value: "eu" }),
  ])

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
      onRemove={() => setRows([])}
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

const meta: Meta<typeof RuleBuilderConditionGroup> = {
  title: "Components/RuleBuilderConditionGroup",
  component: RuleBuilderConditionGroup,
}

export default meta

type Story = StoryObj<typeof RuleBuilderConditionGroup>

export const Default: Story = {
  render: () => <GroupDemo />,
}

type InnerGroup = {
  id: string
  combinator: string
  rows: Row[]
}

export const Nested: Story = {
  render: function NestedStory() {
    const [combinator, setCombinator] = useState("and")
    const [outerRows, setOuterRows] = useState<Row[]>([figRow("1")])
    const [groups, setGroups] = useState<InnerGroup[]>([
      {
        id: "or-1",
        combinator: "or",
        rows: [
          figRow("2", { fieldKey: "region", value: "eu" }),
          figRow("3", { fieldKey: "region", value: "uk" }),
        ],
      },
    ])

    return (
      <RuleBuilderConditionGroup
        combinator={combinator}
        onCombinatorChange={(value) => setCombinator(value ?? "and")}
        onAddCondition={() =>
          setOuterRows((current) => [
            ...current,
            figRow(String(Date.now()), { fieldKey: "", value: "" }),
          ])
        }
        onAddGroup={() =>
          setGroups((current) => [
            ...current,
            {
              id: String(Date.now()),
              combinator: "or",
              rows: [figRow(String(Date.now()), { fieldKey: "", value: "" })],
            },
          ])
        }
      >
        {outerRows.map((row) => (
          <ConditionRow
            key={row.id}
            row={row}
            onChange={(next) =>
              setOuterRows((current) =>
                current.map((item) => (item.id === next.id ? next : item))
              )
            }
            onRemove={() =>
              setOuterRows((current) =>
                current.filter((item) => item.id !== row.id)
              )
            }
          />
        ))}
        {groups.map((group) => (
          <RuleBuilderConditionGroup
            key={group.id}
            combinator={group.combinator}
            onCombinatorChange={(value) =>
              setGroups((current) =>
                current.map((item) =>
                  item.id === group.id
                    ? { ...item, combinator: value ?? "or" }
                    : item
                )
              )
            }
            onAddCondition={() =>
              setGroups((current) =>
                current.map((item) =>
                  item.id === group.id
                    ? {
                        ...item,
                        rows: [
                          ...item.rows,
                          figRow(String(Date.now()), { fieldKey: "", value: "" }),
                        ],
                      }
                    : item
                )
              )
            }
            onRemove={() =>
              setGroups((current) =>
                current.filter((item) => item.id !== group.id)
              )
            }
          >
            {group.rows.map((row) => (
              <ConditionRow
                key={row.id}
                row={row}
                onChange={(next) =>
                  setGroups((current) =>
                    current.map((item) =>
                      item.id === group.id
                        ? {
                            ...item,
                            rows: item.rows.map((entry) =>
                              entry.id === next.id ? next : entry
                            ),
                          }
                        : item
                    )
                  )
                }
                onRemove={() =>
                  setGroups((current) =>
                    current.map((item) =>
                      item.id === group.id
                        ? {
                            ...item,
                            rows: item.rows.filter((entry) => entry.id !== row.id),
                          }
                        : item
                    )
                  )
                }
              />
            ))}
          </RuleBuilderConditionGroup>
        ))}
      </RuleBuilderConditionGroup>
    )
  },
}

export const Disabled: Story = {
  render: () => <GroupDemo disabled />,
}
