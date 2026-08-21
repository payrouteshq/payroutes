import type { Meta, StoryObj } from "@storybook/react"

import { CodeBlock } from "./index"

const jsonSnippet = `{
  "plan_tier":
  "enterprise"
}`

const tsSnippet = `export const route = {
  provider: "stripe",
  weight: 60,
}`

const meta: Meta<typeof CodeBlock> = {
  title: "Components/CodeBlock",
  component: CodeBlock,
  parameters: {
    layout: "padded",
  },
  args: {
    language: "json",
    children: jsonSnippet,
    className: "w-full",
  },
}

export default meta

type Story = StoryObj<typeof CodeBlock>

export const Default: Story = {}

export const Hover: Story = {
  args: { copyState: "hover" },
}

export const Copied: Story = {
  args: { copyState: "copied" },
}

export const WithFilename: Story = {
  args: {
    filename: "route.json",
    language: "json",
  },
}

export const TypeScript: Story = {
  args: {
    language: "typescript",
    filename: "route.ts",
    children: tsSnippet,
  },
}

export const Shell: Story = {
  args: {
    language: "bash",
    children: "pnpm add @payroutes/shared-ui",
  },
}

export const Scrollable: Story = {
  args: {
    maxHeight: "10rem",
    language: "typescript",
    children: `${tsSnippet}\n${tsSnippet}\n${tsSnippet}\n${tsSnippet}`,
  },
}
