import type { Meta, StoryObj } from "@storybook/react"

import { FileUpload, type FileWithPreview } from "./index"

const sampleFile = {
  name: "pro-plan-hero.png",
  size: 1.2 * 1024 * 1024,
  type: "image/png",
  width: 1600,
  height: 900,
} as FileWithPreview

const meta: Meta<typeof FileUpload> = {
  title: "Components/FileUpload",
  component: FileUpload,
  args: {
    className: "w-80",
  },
}

export default meta

type Story = StoryObj<typeof FileUpload>

export const Default: Story = {}

export const Hover: Story = {
  args: { "data-state": "hover" },
}

export const Drag: Story = {
  args: { "data-state": "drag" },
}

export const Error: Story = {
  args: { error: "That file is over 2MB. Try a smaller one." },
}

export const Disabled: Story = {
  args: { disabled: true },
}

export const Uploading: Story = {
  args: {
    status: "uploading",
    progress: 44,
    value: sampleFile,
  },
}

export const Success: Story = {
  args: {
    status: "success",
    value: sampleFile,
  },
}

export const States: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <FileUpload />
      <FileUpload data-state="hover" />
      <FileUpload data-state="drag" />
      <FileUpload error="That file is over 2MB. Try a smaller one." />
      <FileUpload disabled />
      <FileUpload status="uploading" progress={44} value={sampleFile} />
      <FileUpload status="success" value={sampleFile} />
    </div>
  ),
}
