import type { Meta, StoryObj } from "@storybook/react"

import { RadioGroup, RadioGroupItem } from "./radio-group"

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
}

export default meta

type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="a" className="gap-4">
      {[
        { value: "a", label: "Label" },
        { value: "b", label: "Label" },
      ].map(({ value, label }) => (
        <label key={value} className="flex items-center gap-2 text-lg">
          <RadioGroupItem value={value} />
          {label}
        </label>
      ))}
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="a" disabled className="gap-4">
      {[
        { value: "a", label: "Label" },
        { value: "b", label: "Label" },
      ].map(({ value, label }) => (
        <label key={value} className="flex items-center gap-2 text-lg">
          <RadioGroupItem value={value} />
          {label}
        </label>
      ))}
    </RadioGroup>
  ),
}
