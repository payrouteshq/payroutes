import type { Meta, StoryObj } from "@storybook/react"
import type { ComponentProps } from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"

const options = [
  { value: "auth-rate", label: "Auth-rate first" },
  { value: "lowest-cost", label: "Lowest cost" },
  { value: "lowest-latency", label: "Lowest latency" },
] as const

type SelectRootProps = ComponentProps<typeof Select>

function RoutingSelect({
  className = "w-56",
  placeholder = "Select option",
  ...props
}: SelectRootProps & { className?: string; placeholder?: string }) {
  return (
    <Select {...props}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
}

export default meta

type Story = StoryObj<typeof Select>

export const Default: Story = {
  render: () => <RoutingSelect />,
}

export const Open: Story = {
  render: () => (
    <div className="min-h-48">
      <RoutingSelect defaultOpen defaultValue="auth-rate" />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => <RoutingSelect disabled />,
}

export const States: Story = {
  render: () => (
    <div className="flex min-h-48 items-start gap-6">
      <RoutingSelect />
      <RoutingSelect defaultOpen defaultValue="auth-rate" />
      <RoutingSelect disabled />
    </div>
  ),
}
