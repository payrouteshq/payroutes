import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

const sizes = ["sm", "default", "lg"] as const;

const meta: Meta<typeof Avatar> = {
  title: "UI/Avatar",
  component: Avatar,
  argTypes: {
    size: {
      control: "select",
      options: sizes,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
};

export const Fallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback />
    </Avatar>
  ),
};

export const Image: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="https://github.com/shadcn.png" alt="AB" />
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      {sizes.map((size) => (
        <Avatar key={size} size={size}>
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      {sizes.map((size) => (
        <div key={size} className="flex items-center gap-2">
          <Avatar size={size}>
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <Avatar size={size}>
            <AvatarFallback />
          </Avatar>
        </div>
      ))}
    </div>
  ),
};
