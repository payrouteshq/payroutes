import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { ResourceMultiSelect } from "./index"

const plans = ["Pro plan", "Starter", "Enterprise"] as const

const meta: Meta<typeof ResourceMultiSelect> = {
  title: "Components/ResourceMultiSelect",
  component: ResourceMultiSelect,
}

export default meta

type Story = StoryObj<typeof ResourceMultiSelect>

export const Default: Story = {
  render: function DefaultStory() {
    const [selected, setSelected] = useState<string[]>(["Pro plan", "Starter"])

    function toggle(plan: string) {
      setSelected((current) =>
        current.includes(plan)
          ? current.filter((item) => item !== plan)
          : [...current, plan]
      )
    }

    return (
      <ResourceMultiSelect className="w-80">
        {selected.length > 0 ? (
          <ResourceMultiSelect.Tags>
            {selected.map((plan) => (
              <ResourceMultiSelect.Tag
                key={plan}
                onRemove={() => toggle(plan)}
              >
                {plan}
              </ResourceMultiSelect.Tag>
            ))}
          </ResourceMultiSelect.Tags>
        ) : null}
        {plans.map((plan) => (
          <ResourceMultiSelect.Row
            key={plan}
            checked={selected.includes(plan)}
            onCheckedChange={() => toggle(plan)}
          >
            {plan}
          </ResourceMultiSelect.Row>
        ))}
      </ResourceMultiSelect>
    )
  },
}

export const Tag: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <ResourceMultiSelect.Tag>Pro plan</ResourceMultiSelect.Tag>
      <ResourceMultiSelect.Tag>Starter</ResourceMultiSelect.Tag>
      <ResourceMultiSelect.Tag disabled>Enterprise</ResourceMultiSelect.Tag>
    </div>
  ),
}

export const Row: Story = {
  render: () => (
    <div className="w-80 overflow-hidden rounded-lg border border-border">
      <ResourceMultiSelect.Row checked>Pro plan</ResourceMultiSelect.Row>
      <ResourceMultiSelect.Row>Label</ResourceMultiSelect.Row>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <ResourceMultiSelect className="w-80">
      <ResourceMultiSelect.Tags>
        <ResourceMultiSelect.Tag disabled>Pro plan</ResourceMultiSelect.Tag>
      </ResourceMultiSelect.Tags>
      <ResourceMultiSelect.Row checked disabled>
        Pro plan
      </ResourceMultiSelect.Row>
      <ResourceMultiSelect.Row disabled>Starter</ResourceMultiSelect.Row>
    </ResourceMultiSelect>
  ),
}
