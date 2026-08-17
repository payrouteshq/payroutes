import type { Meta, StoryObj } from "@storybook/react"

import { Button } from "./button"

const variants = ["default", "outline", "ghost"] as const
const sizes = ["default", "sm"] as const

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  args: {
    children: "Button",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "ghost", "secondary", "destructive", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "xs", "icon", "icon-xs", "icon-sm", "icon-lg"],
    },
    disabled: {
      control: "boolean",
    },
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Default: Story = {}

export const Outline: Story = { args: { variant: "outline" } }

export const Ghost: Story = { args: { variant: "ghost" } }

export const Hover: Story = { args: { "data-state": "hover" } }

export const Disabled: Story = { args: { disabled: true } }

export const Secondary: Story = { args: { variant: "secondary" } }

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

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col gap-3">
          {variants.map((variant) => (
            <div key={`${size}-${variant}`} className="flex items-center gap-6">
              <Button variant={variant} size={size}>
                Button
              </Button>
              <Button variant={variant} size={size} data-state="hover">
                Button
              </Button>
              <Button variant={variant} size={size} disabled>
                Button
              </Button>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
}
