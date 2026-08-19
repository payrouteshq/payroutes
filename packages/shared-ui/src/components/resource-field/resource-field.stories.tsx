import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { Popover } from "../../ui/popover"
import {
  ResourceField,
  ResourceFieldItem,
  ResourceFieldKey,
} from "./index"

type Resource = {
  group: string
  title: string
  keyHint?: boolean
}

const resources: Resource[] = [
  { group: "Payment", title: "amount" },
  { group: "Payment", title: "currency" },
  { group: "Payment", title: "status" },
  { group: "Customer", title: "customer.email" },
  { group: "Customer", title: "customer.name" },
  { group: "Customer", title: "customer.metadata.<key>", keyHint: true },
  { group: "Product", title: "product.id" },
  { group: "Product", title: "product.metadata.<key>", keyHint: true },
]

function itemLabel(item: Resource) {
  if (!item.keyHint) return item.title
  const [prefix] = item.title.split(".<key>")
  return (
    <>
      {prefix}.
      <span className="text-muted-foreground">&lt;key&gt;</span>
    </>
  )
}

function ResourceFieldDemo({
  defaultOpen,
  defaultValue = null,
  error,
}: {
  defaultOpen?: boolean
  defaultValue?: Resource | null
  error?: string
}) {
  const [value, setValue] = useState<Resource | null>(defaultValue)
  const [key, setKey] = useState("region")

  return (
    <ResourceField
      containerClassName="w-80"
      label="Resource"
      value={value}
      onChange={setValue}
      items={resources}
      defaultOpen={defaultOpen}
      error={error}
      getItemTitle={(item) => item.title}
      getItemGroup={(item) => item.group}
      searchFilter={(item, query) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      }
      renderSearchItem={(item, selected) => (
        <ResourceFieldItem selected={selected}>{itemLabel(item)}</ResourceFieldItem>
      )}
      renderSummary={(item) =>
        item.keyHint ? (
          <ResourceFieldKey
            resource={item.title.replace(".<key>", "")}
            value={key}
            onChange={(event) => setKey(event.target.value)}
          />
        ) : undefined
      }
    />
  )
}

const meta: Meta<typeof ResourceField> = {
  title: "Components/ResourceField",
  component: ResourceField,
}

export default meta

type Story = StoryObj<typeof ResourceField>

export const Default: Story = {
  render: () => <ResourceFieldDemo />,
}

export const Open: Story = {
  parameters: {
    docs: { disable: true },
  },
  render: () => (
    <div className="min-h-96">
      <ResourceFieldDemo
        defaultOpen
        defaultValue={resources.find((item) => item.title === "product.id") ?? null}
      />
    </div>
  ),
}

export const Selected: Story = {
  render: () => (
    <ResourceFieldDemo
      defaultValue={resources.find((item) => item.title === "product.id") ?? null}
    />
  ),
}

export const WithKey: Story = {
  render: () => (
    <ResourceFieldDemo
      defaultValue={
        resources.find((item) => item.title === "product.metadata.<key>") ?? null
      }
    />
  ),
}

export const Item: Story = {
  render: () => (
    <div className="w-72 overflow-hidden rounded-lg border-2 border-ring bg-popover py-1">
      <div className="px-3 py-1.5 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
        Payment
      </div>
      <div className="flex flex-col gap-0.5 px-1">
        <ResourceFieldItem>amount</ResourceFieldItem>
        <ResourceFieldItem selected>currency</ResourceFieldItem>
        <ResourceFieldItem>status</ResourceFieldItem>
      </div>
      <div className="px-3 py-1.5 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
        Product
      </div>
      <div className="flex flex-col gap-0.5 px-1">
        <ResourceFieldItem selected>product.id</ResourceFieldItem>
        <ResourceFieldItem>product.name</ResourceFieldItem>
      </div>
    </div>
  ),
}

export const Key: Story = {
  render: function KeyComposer() {
    const [key, setKey] = useState("region")
    return (
      <Popover>
        <ResourceFieldKey
          resource="product.metadata"
          value={key}
          onChange={(event) => setKey(event.target.value)}
        />
      </Popover>
    )
  },
}
