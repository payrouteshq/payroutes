import type { Meta, StoryObj } from "@storybook/react";
import type { ColumnDef } from "@tanstack/react-table";

import { Link, Trash2 } from "../../icons";
import { Badge } from "../../ui/badge";
import { DataTable, type DataTableBulkAction, type TableAction } from "./index";

type Route = {
  id: string;
  route: string;
  provider: string;
  authTrend: string;
  authRate: string;
  volume: string;
  status: string;
};

const routes: Route[] = [
  {
    id: "1",
    route: "card-us-east",
    provider: "Stripe",
    authTrend: "+1.2 pts",
    authRate: "92.4%",
    volume: "$412,800",
    status: "Text",
  },
  {
    id: "2",
    route: "card-eu-west",
    provider: "Adyen",
    authTrend: "-0.4 pts",
    authRate: "88.1%",
    volume: "$276,450",
    status: "Text",
  },
  {
    id: "3",
    route: "card-ap-south",
    provider: "Checkout.com",
    authTrend: "+0.8 pts",
    authRate: "90.6%",
    volume: "$198,220",
    status: "Text",
  },
];

const columns: ColumnDef<Route>[] = [
  { accessorKey: "route", header: "Route" },
  { accessorKey: "provider", header: "Provider" },
  { accessorKey: "authTrend", header: "Auth Trend" },
  { accessorKey: "authRate", header: "Auth Rate" },
  { accessorKey: "volume", header: "Volume - 24h" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => <Badge>{String(getValue())}</Badge>,
  },
];

const rowActions: TableAction<Route>[] = [
  {
    label: "Menu item",
    icon: <Link className="size-4" />,
    onClick: () => undefined,
  },
  {
    label: "Menu item",
    icon: <Link className="size-4" />,
    onClick: () => undefined,
  },
  {
    label: "Delete",
    icon: <Link className="size-4" />,
    variant: "destructive",
    onClick: () => undefined,
  },
];

const bulkActions: DataTableBulkAction<Route>[] = [
  {
    label: "Copy",
    items: [
      { label: "Copy IDs", onClick: () => undefined },
      { label: "Copy rows", onClick: () => undefined },
    ],
  },
  {
    label: "Export",
    items: [
      { label: "Export CSV", onClick: () => undefined },
      { label: "Export JSON", onClick: () => undefined },
    ],
  },
  {
    label: "Delete",
    icon: <Trash2 className="size-3.5" />,
    variant: "destructive",
    onClick: () => undefined,
  },
];

const meta: Meta<typeof DataTable<Route, unknown>> = {
  title: "Components/DataTable",
  component: DataTable,
};

export default meta;

type Story = StoryObj<typeof DataTable<Route, unknown>>;

export const Default: Story = {
  render: () => (
    <DataTable columns={columns} data={routes} enableBulkSelect actions={rowActions} bulkActions={bulkActions} />
  ),
};

export const Selected: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={routes}
      enableBulkSelect
      actions={rowActions}
      bulkActions={bulkActions}
      defaultRowSelection={{ "1": true }}
    />
  ),
};

export const Loading: Story = {
  render: () => <DataTable columns={columns} data={[]} enableBulkSelect actions={rowActions} isLoading />,
};

export const Empty: Story = {
  render: () => <DataTable columns={columns} data={[]} enableBulkSelect actions={rowActions} />,
};

export const Hover: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={routes}
      enableBulkSelect
      actions={rowActions}
      defaultRowSelection={{ "1": true }}
    />
  ),
};
