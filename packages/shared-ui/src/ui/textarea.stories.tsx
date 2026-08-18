import type { Meta, StoryObj } from "@storybook/react"

import { Textarea } from "./textarea"

const meta: Meta<typeof Textarea> = {
  title: "UI/Textarea",
  component: Textarea,
  args: {
    placeholder: "Placeholder",
    className: "w-72",
  },
}

export default meta

type Story = StoryObj<typeof Textarea>

export const Default: Story = {}

export const Focused: Story = {
  render: (args) => <Textarea {...args} data-state="focus" />,
}

export const Invalid: Story = {
  render: (args) => (
    <div className="flex w-72 flex-col gap-1.5">
      <Textarea {...args} className="w-full" aria-invalid />
      <p className="text-error text-xs">Error message</p>
    </div>
  ),
}

export const Disabled: Story = { args: { disabled: true } }

export const States: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-6">
      <Textarea placeholder="Placeholder" />
      <Textarea placeholder="Placeholder" data-state="focus" />
      <div className="flex flex-col gap-1.5">
        <Textarea placeholder="Placeholder" aria-invalid />
        <p className="text-error text-xs">Error message</p>
      </div>
      <Textarea placeholder="Placeholder" disabled />
    </div>
  ),
}
