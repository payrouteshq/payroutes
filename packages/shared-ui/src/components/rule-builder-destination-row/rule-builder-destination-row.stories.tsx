import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { RuleBuilderDestinationRow } from "./index"

type Destination = {
  id: string
  name: string
  description: string
}

const destinations: Destination[] = [
  { id: "stripe-global", name: "Stripe", description: "global cards" },
  { id: "adyen-eu", name: "Adyen", description: "EU acquiring" },
  { id: "checkout-uk", name: "Checkout.com", description: "UK cards" },
]

const destinationTitle = (item: Destination) =>
  `${item.name} · ${item.description}`

type Row = {
  id: string
  destinationId: string
  share: string
  primary?: boolean
}

const figRows: Row[] = [
  {
    id: "1",
    destinationId: "stripe-global",
    share: "60",
    primary: true,
  },
  {
    id: "2",
    destinationId: "adyen-eu",
    share: "60",
  },
]

function findDestination(id: string) {
  return destinations.find((item) => item.id === id) ?? null
}

function DestinationRowDemo(props: {
  defaultRow?: Row
  showRemove?: boolean
  disabled?: boolean
}) {
  const [row, setRow] = useState<Row>(
    props.defaultRow ?? {
      id: "1",
      destinationId: "stripe-global",
      share: "60",
      primary: true,
    }
  )

  return (
    <RuleBuilderDestinationRow
      destination={findDestination(row.destinationId)}
      onDestinationChange={(item) =>
        setRow((current) => ({
          ...current,
          destinationId: item?.id ?? "",
        }))
      }
      destinations={destinations}
      getItemValue={(item) => item.id}
      getItemTitle={destinationTitle}
      share={row.share}
      onShareChange={(share) => setRow((current) => ({ ...current, share }))}
      primary={row.primary}
      onRemove={props.showRemove ? () => undefined : undefined}
      disabled={props.disabled}
      containerClassName="max-w-xl"
    />
  )
}

function DestinationRowsDemo({ defaultRows = figRows }: { defaultRows?: Row[] }) {
  const [rows, setRows] = useState(defaultRows)

  const updateRow = (id: string, next: Partial<Row>) => {
    setRows((current) =>
      current.map((row) => (row.id === id ? { ...row, ...next } : row))
    )
  }

  return (
    <div className="flex max-w-xl flex-col gap-3">
      {rows.map((row) => (
        <RuleBuilderDestinationRow
          key={row.id}
          destination={findDestination(row.destinationId)}
          onDestinationChange={(item) =>
            updateRow(row.id, { destinationId: item?.id ?? "" })
          }
          destinations={destinations}
          getItemValue={(item) => item.id}
          getItemTitle={destinationTitle}
          share={row.share}
          onShareChange={(share) => updateRow(row.id, { share })}
          primary={row.primary}
          onRemove={
            row.primary
              ? undefined
              : () =>
                  setRows((current) =>
                    current.filter((item) => item.id !== row.id)
                  )
          }
        />
      ))}
    </div>
  )
}

const meta: Meta<typeof RuleBuilderDestinationRow> = {
  title: "Components/RuleBuilderDestinationRow",
  component: RuleBuilderDestinationRow,
}

export default meta

type Story = StoryObj<typeof RuleBuilderDestinationRow>

export const Default: Story = {
  render: () => <DestinationRowsDemo />,
}

export const Primary: Story = {
  render: () => <DestinationRowDemo />,
}

export const Removable: Story = {
  render: () => (
    <DestinationRowDemo
      defaultRow={{
        id: "2",
        destinationId: "adyen-eu",
        share: "60",
      }}
      showRemove
    />
  ),
}

export const Disabled: Story = {
  render: () => <DestinationRowDemo disabled />,
}

export const Empty: Story = {
  render: () => (
    <DestinationRowDemo
      defaultRow={{
        id: "3",
        destinationId: "",
        share: "",
      }}
    />
  ),
}
