import type { Meta, StoryObj } from "@storybook/react"

import { Checkbox } from "./checkbox"

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
  argTypes: {
    defaultChecked: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {}

export const Checked: Story = { args: { defaultChecked: true } }

export const Disabled: Story = { args: { disabled: true } }

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {[
        { defaultChecked: true },
        { defaultChecked: false },
        { defaultChecked: true, disabled: true },
        { defaultChecked: false, disabled: true },
      ].map(({ defaultChecked, disabled }, index) => (
        <label key={index} className="flex items-center gap-2 text-lg">
          <Checkbox defaultChecked={defaultChecked} disabled={disabled} />
          Label
        </label>
      ))}
    </div>
  ),
}
