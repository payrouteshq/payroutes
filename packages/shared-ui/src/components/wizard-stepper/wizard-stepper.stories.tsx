import type { Meta, StoryObj } from "@storybook/react"

import { WizardStep, WizardStepper } from "./index"

const steps = ["Welcome", "Organization", "Provider", "Routing", "Checkout", "Finish"]

const meta: Meta<typeof WizardStepper> = {
  title: "Components/WizardStepper",
  component: WizardStepper,
  args: {
    steps,
    current: 2,
    className: "w-full",
  },
}

export default meta

type Story = StoryObj<typeof WizardStepper>

export const Default: Story = {}

export const First: Story = { args: { current: 0 } }

export const Complete: Story = { args: { current: steps.length } }

export const Steps: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <WizardStep status="complete" step={1} label="Welcome" />
      <WizardStep status="current" step={3} label="Provider" />
      <WizardStep status="upcoming" step={4} label="Routing" />
    </div>
  ),
}
