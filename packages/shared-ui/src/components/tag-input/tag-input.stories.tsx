import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { Tag, TagInput } from "./index";

const meta: Meta<typeof TagInput> = {
  title: "Components/TagInput",
  component: TagInput,
  args: {
    className: "w-80",
    placeholder: "Add values...",
  },
};

export default meta;

type Story = StoryObj<typeof TagInput>;

export const Default: Story = {
  render: function DefaultStory(args) {
    const [value, setValue] = useState<string[]>([]);
    return <TagInput {...args} value={value} onChange={setValue} />;
  },
};

export const Focused: Story = {
  args: {
    value: ["EU"],
    "data-state": "focus",
  },
};

export const Multiple: Story = {
  args: {
    value: ["EU", "UK"],
  },
};

export const Disabled: Story = {
  args: {
    value: ["EU", "UK"],
    disabled: true,
  },
};

export const Tags: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Tag>EU</Tag>
      <Tag disabled>EU</Tag>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <TagInput placeholder="Add values..." />
      <TagInput value={["EU"]} data-state="focus" />
      <TagInput value={["EU", "UK"]} />
      <TagInput value={["EU", "UK"]} disabled />
    </div>
  ),
};
