import type { Meta, StoryObj } from "@storybook/react"

import { Input } from "./input"

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  args: {
    placeholder: "Placeholder",
    className: "w-72",
  },
}

export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {}

export const Focused: Story = {
  render: (args) => <Input {...args} data-state="focus" />,
}

export const Invalid: Story = {
  render: (args) => (
    <div className="flex w-72 flex-col gap-1.5">
      <Input {...args} className="w-full" aria-invalid />
      <p className="text-error text-xs">Error message</p>
    </div>
  ),
}

export const Disabled: Story = { args: { disabled: true } }

export const States: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-6">
      <Input placeholder="Placeholder" />
      <Input placeholder="Placeholder" data-state="focus" />
      <div className="flex flex-col gap-1.5">
        <Input placeholder="Placeholder" aria-invalid />
        <p className="text-error text-xs">Error message</p>
      </div>
      <Input placeholder="Placeholder" disabled />
    </div>
  ),
}
