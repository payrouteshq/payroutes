import type { Meta, StoryObj } from "@storybook/react"

function ComingSoon() {
  return <p className="text-muted-foreground text-sm">Components go here.</p>
}

const meta: Meta<typeof ComingSoon> = {
  title: "Components/Coming soon",
  component: ComingSoon,
}

export default meta

type Story = StoryObj<typeof ComingSoon>

export const Default: Story = {}
