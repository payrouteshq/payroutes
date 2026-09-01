import type { Meta, StoryObj } from "@storybook/react";

import { Switch } from "./switch";

const meta: Meta<typeof Switch> = {
  title: "UI/Switch",
  component: Switch,
  argTypes: {
    defaultChecked: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    size: {
      control: "select",
      options: ["default", "sm"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {};

export const Checked: Story = { args: { defaultChecked: true } };

export const Disabled: Story = { args: { disabled: true } };

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {[
        { defaultChecked: true },
        { defaultChecked: false },
        { defaultChecked: true, disabled: true },
        { defaultChecked: false, disabled: true },
      ].map(({ defaultChecked, disabled }, index) => (
        <label key={index} className={`flex items-center gap-2 text-lg ${disabled ? "text-muted-foreground" : ""}`}>
          <Switch defaultChecked={defaultChecked} disabled={disabled} />
          Label
        </label>
      ))}
    </div>
  ),
};
