import type { Meta, StoryObj } from "@storybook/react"

import { PayroutesLogo } from "./icons"

const meta: Meta<typeof PayroutesLogo> = {
  title: "Components/PayroutesLogo",
  component: PayroutesLogo,
  args: {
    className: "h-12 w-12 text-primary",
  },
}

export default meta

type Story = StoryObj<typeof PayroutesLogo>

export const Default: Story = {}
