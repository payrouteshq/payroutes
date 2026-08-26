import type { Meta, StoryObj } from "@storybook/react"

import { Link, MoreVertical } from "../icons"
import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu"

const meta: Meta<typeof DropdownMenu> = {
  title: "UI/DropdownMenu",
  component: DropdownMenu,
}

export default meta

type Story = StoryObj<typeof DropdownMenu>

function MenuDemo({ defaultOpen = false }: { defaultOpen?: boolean }) {
  return (
    <div className="flex justify-end">
      <DropdownMenu defaultOpen={defaultOpen}>
        <DropdownMenuTrigger
          render={<Button variant="ghost" size="icon-xs" />}
          aria-label="Open menu"
        >
          <MoreVertical className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link className="size-4" />
            Menu item
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link className="size-4" />
            Menu item
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <Link className="size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export const Default: Story = {
  render: () => <MenuDemo />,
}

export const Open: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: () => (
    <div className="min-h-40">
      <MenuDemo defaultOpen />
    </div>
  ),
}
