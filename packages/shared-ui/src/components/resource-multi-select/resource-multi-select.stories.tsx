import * as React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { ResourceMultiSelect } from "./index";

const plans = ["Pro plan", "Starter", "Enterprise"];

function DefaultDemo() {
  const [selected, setSelected] = React.useState(["Pro plan", "Starter"]);

  function toggle(plan: string) {
    setSelected((current) => (current.includes(plan) ? current.filter((item) => item !== plan) : [...current, plan]));
  }

  return (
    <ResourceMultiSelect className="w-80">
      {selected.length > 0 ? (
        <ResourceMultiSelect.Tags>
          {selected.map((plan) => (
            <ResourceMultiSelect.Tag key={plan} onRemove={() => toggle(plan)}>
              {plan}
            </ResourceMultiSelect.Tag>
          ))}
        </ResourceMultiSelect.Tags>
      ) : null}
      {plans.map((plan) => (
        <ResourceMultiSelect.Row key={plan} checked={selected.includes(plan)} onCheckedChange={() => toggle(plan)}>
          {plan}
        </ResourceMultiSelect.Row>
      ))}
    </ResourceMultiSelect>
  );
}

const meta: Meta<typeof ResourceMultiSelect> = {
  title: "Components/ResourceMultiSelect",
  component: ResourceMultiSelect,
};

export default meta;

type Story = StoryObj<typeof ResourceMultiSelect>;

export const Default: Story = {
  render: () => <DefaultDemo />,
};

export const Tags: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <ResourceMultiSelect.Tag>Pro plan</ResourceMultiSelect.Tag>
      <ResourceMultiSelect.Tag>Starter</ResourceMultiSelect.Tag>
      <ResourceMultiSelect.Tag disabled>Enterprise</ResourceMultiSelect.Tag>
    </div>
  ),
};

export const Rows: Story = {
  render: () => (
    <div className="border-border w-80 overflow-hidden rounded-lg border">
      <ResourceMultiSelect.Row checked>Pro plan</ResourceMultiSelect.Row>
      <ResourceMultiSelect.Row>Label</ResourceMultiSelect.Row>
    </div>
  ),
};

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
};
