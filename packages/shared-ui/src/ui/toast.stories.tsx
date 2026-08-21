import type { Meta, StoryObj } from "@storybook/react"

import { Button } from "./button"
import {
  ToastCard,
  Toaster,
  toast,
  type ToastType,
} from "./toast"

const samples: { type: ToastType; title: string; description?: string }[] = [
  {
    type: "info",
    title: "Route deployed",
    description: "card-us-east now serving 72% of volume",
  },
  {
    type: "error",
    title: "Route deployed",
    description: "card-us-east now serving 72% of volume",
  },
  {
    type: "success",
    title: "Route deployed",
    description: "card-us-east now serving 72% of volume",
  },
  {
    type: "warning",
    title: "Route deployed",
    description: "card-us-east now serving 72% of volume",
  },
]

const meta: Meta<typeof ToastCard> = {
  title: "UI/Toast",
  component: ToastCard,
  args: {
    type: "info",
    title: "Route deployed",
    description: "card-us-east now serving 72% of volume",
  },
}

export default meta

type Story = StoryObj<typeof ToastCard>

export const Default: Story = {
  render: (args) => (
    <div className="w-72">
      <ToastCard {...args} />
    </div>
  ),
}

export const Info: Story = {
  args: samples[0],
  render: (args) => (
    <div className="w-72">
      <ToastCard {...args} />
    </div>
  ),
}

export const Error: Story = {
  args: samples[1],
  render: (args) => (
    <div className="w-72">
      <ToastCard {...args} />
    </div>
  ),
}

export const Success: Story = {
  args: samples[2],
  render: (args) => (
    <div className="w-72">
      <ToastCard {...args} />
    </div>
  ),
}

export const Warning: Story = {
  args: samples[3],
  render: (args) => (
    <div className="w-72">
      <ToastCard {...args} />
    </div>
  ),
}

export const Copy: Story = {
  args: {
    type: "copy",
    title: "Product ID copied",
    description: undefined,
  },
  render: (args) => <ToastCard {...args} />,
}

export const Variants: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-3">
      {samples.map((sample) => (
        <ToastCard key={sample.type} {...sample} />
      ))}
      <ToastCard type="copy" title="Product ID copied" />
    </div>
  ),
}

export const Interactive: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => (
    <Toaster>
      <div className="flex flex-wrap gap-2">
        {samples.map((sample) => (
          <Button
            key={sample.type}
            variant="outline"
            size="sm"
            onClick={() =>
              toast.add({
                type: sample.type,
                title: sample.title,
                description: sample.description,
              })
            }
          >
            {sample.type.charAt(0).toUpperCase() + sample.type.slice(1)}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => toast.add({ type: "copy", title: "Product ID copied" })}
        >
          Copy
        </Button>
      </div>
    </Toaster>
  ),
}
