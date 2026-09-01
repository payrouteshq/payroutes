import type { Meta, StoryObj } from "@storybook/react";

import { ScrollArea } from "./scroll-area";

const meta: Meta<typeof ScrollArea> = {
  title: "UI/ScrollArea",
  component: ScrollArea,
};

export default meta;

type Story = StoryObj<typeof ScrollArea>;

export const Default: Story = {
  render: () => (
    <ScrollArea className="border-border bg-muted h-72 w-48 rounded-md border">
      <div className="p-4">
        {Array.from({ length: 50 }, (_, i) => (
          <p key={i} className="text-foreground text-sm leading-6">
            Item {i + 1}
          </p>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <ScrollArea className="border-border bg-muted w-96 rounded-md border whitespace-nowrap">
      <div className="flex w-max gap-4 p-4">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="border-border bg-card text-foreground flex h-24 w-32 shrink-0 items-center justify-center rounded-md border text-sm"
          >
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
