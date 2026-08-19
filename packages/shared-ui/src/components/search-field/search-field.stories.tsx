import type { Meta, StoryObj } from "@storybook/react"

import { SearchField } from "./index"

const meta: Meta<typeof SearchField> = {
  title: "Components/SearchField",
  component: SearchField,
  args: {
    className: "w-80",
  },
}

export default meta

type Story = StoryObj<typeof SearchField>

export const Default: Story = {}

export const Hover: Story = {
  args: { "data-state": "hover" },
}

export const Focused: Story = {
  args: { "data-state": "focus" },
}

export const Filled: Story = {
  args: { "data-state": "focus", defaultValue: "stripe2" },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const States: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <SearchField />
      <SearchField data-state="hover" />
      <SearchField data-state="focus" />
      <SearchField data-state="focus" defaultValue="stripe2" />
      <SearchField disabled />
    </div>
  ),
}
