import type { Meta, StoryObj } from "@storybook/react"

import { Badge } from "./badge"
import { Checkbox } from "./checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"

const meta: Meta<typeof Table> = {
  title: "UI/Table",
  component: Table,
}

export default meta

type Story = StoryObj<typeof Table>

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10">
            <Checkbox aria-label="Select all" />
          </TableHead>
          <TableHead>Route</TableHead>
          <TableHead>Provider</TableHead>
          <TableHead>Auth Rate</TableHead>
          <TableHead>Volume - 24h</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <Checkbox aria-label="Select row" />
          </TableCell>
          <TableCell>card-us-east</TableCell>
          <TableCell>Stripe</TableCell>
          <TableCell>92.4%</TableCell>
          <TableCell>$412,800</TableCell>
          <TableCell>
            <Badge>Text</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Checkbox aria-label="Select row" />
          </TableCell>
          <TableCell>card-eu-west</TableCell>
          <TableCell>Adyen</TableCell>
          <TableCell>88.1%</TableCell>
          <TableCell>$276,450</TableCell>
          <TableCell>
            <Badge>Text</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}

export const Hover: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Route</TableHead>
          <TableHead>Provider</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>card-us-east</TableCell>
          <TableCell>Stripe</TableCell>
        </TableRow>
        <TableRow data-state="selected">
          <TableCell>card-eu-west</TableCell>
          <TableCell>Adyen</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}
