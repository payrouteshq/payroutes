import type { Meta, StoryObj } from "@storybook/react"

import { CircleCheck } from "../icons"
import { Badge } from "./badge"

const variants = ["default", "secondary", "outline", "success", "warning", "destructive", "ghost", "link"] as const

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  args: {
    children: "Text",
  },
  argTypes: {
    variant: {
      control: "select",
      options: variants,
    },
    size: {
      control: "select",
      options: ["default", "icon"],
    },
  },
}

export default meta

type Story = StoryObj<typeof Badge>

export const Default: Story = {}

export const Secondary: Story = { args: { variant: "secondary" } }

export const Outline: Story = { args: { variant: "outline" } }

export const Success: Story = { args: { variant: "success" } }

export const Warning: Story = { args: { variant: "warning" } }

export const Destructive: Story = { args: { variant: "destructive" } }

export const WithIcon: Story = {
  render: () => (
    <Badge data-icon="inline-start">
      <CircleCheck />
      Text
    </Badge>
  ),
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-6">
        <Badge variant="default">Text</Badge>
        <Badge variant="secondary">Text</Badge>
        <Badge variant="outline">Text</Badge>
        <Badge variant="default" data-icon="inline-start">
          <CircleCheck />
          Text
        </Badge>
      </div>
      <div className="flex items-center gap-6">
        <Badge variant="success">Text</Badge>
        <Badge variant="warning">Text</Badge>
        <Badge variant="destructive">Text</Badge>
      </div>
      <div className="flex items-center gap-6">
        {(["default", "outline", "destructive"] as const).map((variant) => (
          <Badge key={variant} variant={variant} size="icon">
            <CircleCheck />
          </Badge>
        ))}
      </div>
    </div>
  ),
}
