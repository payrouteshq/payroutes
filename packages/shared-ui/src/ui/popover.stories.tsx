import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const meta: Meta<typeof Popover> = {
  title: "UI/Popover",
  component: Popover,
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>Open popover</PopoverTrigger>
      <PopoverContent align="start">
        <p className="text-foreground text-sm">Popover content</p>
      </PopoverContent>
    </Popover>
  ),
};

export const Open: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: () => (
    <div className="min-h-32">
      <Popover defaultOpen>
        <PopoverTrigger render={<Button variant="outline" />}>Open popover</PopoverTrigger>
        <PopoverContent align="start">
          <p className="text-foreground text-sm">Popover content</p>
        </PopoverContent>
      </Popover>
    </div>
  ),
};
