import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { Input } from "../../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select"
import { EmbeddedFieldRow, FieldStack } from "./index"

const operators = [
  { value: "gt", label: "Is greater than" },
  { value: "lt", label: "Is less than" },
  { value: "between", label: "Is between" },
] as const

function OperatorSelect({
  defaultValue,
  value,
  onValueChange,
}: {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string | null) => void
}) {
  return (
    <Select
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
    >
      <SelectTrigger className="w-80">
        <SelectValue placeholder="Select operator" />
      </SelectTrigger>
      <SelectContent>
        {operators.map((operator) => (
          <SelectItem key={operator.value} value={operator.value}>
            {operator.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function BetweenFields() {
  return (
    <>
      <div className="flex min-w-0 flex-col gap-1">
        <EmbeddedFieldRow.Label>Minimum</EmbeddedFieldRow.Label>
        <Input defaultValue="100" />
      </div>
      <div className="flex min-w-0 flex-col gap-1">
        <EmbeddedFieldRow.Label>Maximum</EmbeddedFieldRow.Label>
        <Input defaultValue="900" />
      </div>
      <EmbeddedFieldRow.Suffix>
        Both bounds are inclusive.
      </EmbeddedFieldRow.Suffix>
    </>
  )
}

const meta: Meta<typeof FieldStack> = {
  title: "Components/FieldStack",
  component: FieldStack,
}

export default meta

type Story = StoryObj<typeof FieldStack>

export const Default: Story = {
  render: () => (
    <FieldStack className="w-80">
      <OperatorSelect defaultValue="gt" />
      <OperatorSelect defaultValue="between" />
      <EmbeddedFieldRow when layout="stack">
        <BetweenFields />
      </EmbeddedFieldRow>
    </FieldStack>
  ),
}

export const Stack: Story = {
  render: () => (
    <FieldStack className="w-80">
      <OperatorSelect defaultValue="between" />
      <EmbeddedFieldRow when layout="stack">
        <BetweenFields />
      </EmbeddedFieldRow>
    </FieldStack>
  ),
}

export const Inline: Story = {
  render: () => (
    <FieldStack className="w-80">
      <OperatorSelect defaultValue="gt" />
      <EmbeddedFieldRow when layout="inline">
        <Input defaultValue="100" className="flex-1" />
      </EmbeddedFieldRow>
    </FieldStack>
  ),
}

export const Conditional: Story = {
  render: function ConditionalStory() {
    const [operator, setOperator] = useState("between")

    return (
      <FieldStack className="w-80">
        <OperatorSelect value={operator} onValueChange={(value) => setOperator(value ?? "gt")} />
        <EmbeddedFieldRow when={operator === "between"} layout="stack">
          <BetweenFields />
        </EmbeddedFieldRow>
      </FieldStack>
    )
  },
}
