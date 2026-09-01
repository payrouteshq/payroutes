import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "../../ui/input";
import { EmbeddedFieldRow } from "../field-stack";
import { ConditionalFieldRow } from "./index";

const pricingOptions = [
  { value: "one-time", label: "One-time" },
  { value: "recurring", label: "Recurring" },
];

const meta: Meta<typeof ConditionalFieldRow> = {
  title: "Components/ConditionalFieldRow",
  component: ConditionalFieldRow,
  args: {
    className: "w-80",
    label: "Pricing type",
    options: pricingOptions,
    when: "recurring",
  },
};

export default meta;

type Story = StoryObj<typeof ConditionalFieldRow>;

export const Default: Story = {
  render: function DefaultStory(args) {
    const [value, setValue] = useState("one-time");
    return (
      <ConditionalFieldRow {...args} value={value} onValueChange={(next) => setValue(next ?? "one-time")}>
        <EmbeddedFieldRow.Label>Free trial</EmbeddedFieldRow.Label>
        <Input placeholder="14 days" />
      </ConditionalFieldRow>
    );
  },
};

export const Recurring: Story = {
  args: { defaultValue: "recurring" },
  render: (args) => (
    <ConditionalFieldRow {...args}>
      <EmbeddedFieldRow.Label>Free trial</EmbeddedFieldRow.Label>
      <Input placeholder="14 days" />
    </ConditionalFieldRow>
  ),
};
