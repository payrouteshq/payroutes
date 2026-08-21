import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { Button } from "./button"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./dialog"

const meta: Meta<typeof Dialog> = {
  title: "UI/Dialog",
  component: Dialog,
}

export default meta

type Story = StoryObj<typeof Dialog>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" />}>
        Open dialog
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Dialog title</DialogTitle>
        <DialogDescription>A short description of this dialog.</DialogDescription>
      </DialogContent>
    </Dialog>
  ),
}

export const Open: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: function OpenStory() {
    const [open, setOpen] = useState(true)
    return (
      <div className="min-h-80">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogDescription>A short description of this dialog.</DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
    )
  },
}
