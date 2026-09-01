import * as React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { type PhoneNumber, PhoneNumberField } from "./index";

const emptyValue: PhoneNumber = { number: "", countryCode: "US" };

function PhoneFieldDemo(props: Omit<React.ComponentProps<typeof PhoneNumberField>, "value" | "onChange">) {
  const id = React.useId();
  const [value, setValue] = React.useState<PhoneNumber>(emptyValue);
  return <PhoneNumberField id={id} value={value} onChange={setValue} {...props} />;
}

const meta: Meta<typeof PhoneNumberField> = {
  title: "Components/PhoneNumberField",
  component: PhoneNumberField,
  args: {
    className: "w-72",
    label: "Phone Number",
  },
  render: (args) => <PhoneFieldDemo {...args} />,
};

export default meta;

type Story = StoryObj<typeof PhoneNumberField>;

export const Default: Story = {};

export const Focused: Story = {
  args: { "data-state": "focus" },
};

export const Invalid: Story = {
  args: {
    error: "Error message",
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const CountryOpen: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: (args) => (
    <div className="min-h-80">
      <PhoneFieldDemo {...args} defaultOpen />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-6">
      <PhoneFieldDemo />
      <PhoneFieldDemo data-state="focus" />
      <PhoneFieldDemo error="Error message" />
      <PhoneFieldDemo disabled />
    </div>
  ),
};
