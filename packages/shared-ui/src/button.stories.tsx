import type { Meta, StoryObj } from "@storybook/react"

import { Button } from "./button"

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  args: {
    children: "Button",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "secondary", "ghost", "destructive", "link"],
    },
    size: {
      control: "select",
      options: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"],
    },
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {}

export const Outline: Story = { args: { variant: "outline" } }

export const Secondary: Story = { args: { variant: "secondary" } }

export const Ghost: Story = { args: { variant: "ghost" } }

export const Destructive: Story = { args: { variant: "destructive" } }

export const Link: Story = { args: { variant: "link" } }

export const AllVariants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {(["default", "outline", "secondary", "ghost", "destructive", "link"] as const).map((variant) => (
        <Button key={variant} {...args} variant={variant} />
      ))}
    </div>
  ),
}

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {(["xs", "sm", "default", "lg"] as const).map((size) => (
        <Button key={size} {...args} size={size} />
      ))}
    </div>
  ),
}
