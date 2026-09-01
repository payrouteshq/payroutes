import type { Meta, StoryObj } from "@storybook/react";

import { Timeline, type TimelineStatus } from "./index";

type SampleItem = {
  id: string;
  title: string;
  date: string;
  source?: string;
  description?: string;
  status?: TimelineStatus;
  data?: Record<string, unknown>;
};

const figmaItems: SampleItem[] = [
  {
    id: "1",
    status: "success",
    title: "Activity label",
    source: "viaStripe",
    date: "Jul 14 - 09:12",
  },
  {
    id: "2",
    status: "pending",
    title: "Activity label",
    source: "viaStripe",
    date: "Jul 14 - 09:12",
  },
  {
    id: "3",
    status: "error",
    title: "Activity label",
    source: "viaStripe",
    date: "Jul 14 - 09:12",
  },
  {
    id: "4",
    status: "complete",
    title: "Activity label",
    source: "viaStripe",
    date: "Jul 14",
    description: "Description text goes here",
  },
];

const dataItems: SampleItem[] = [
  {
    id: "1",
    status: "complete",
    title: "Created",
    date: "Jan 15, 2025 at 2:30 PM",
    data: { customerId: "cust_abc123", productId: "prod_xyz" },
  },
  {
    id: "2",
    status: "pending",
    title: "Updated",
    date: "Jan 14, 2025 at 10:00 AM",
    data: {
      $changes: {
        email: { from: "old@example.com", to: "new@example.com" },
        name: { from: "Old Name", to: "New Name" },
      },
    },
  },
  {
    id: "3",
    status: "success",
    title: "Subscription renewed",
    date: "Jan 10, 2025 at 9:15 AM",
    data: { planId: "plan_pro", status: "active" },
  },
];

const meta: Meta<typeof Timeline> = {
  title: "Components/Timeline",
  component: Timeline,
  args: {
    emptyMessage: "No history found",
    isLoading: false,
    limit: 0,
    skeletonRowCount: 3,
  },
};

export default meta;

type Story = StoryObj<typeof Timeline>;

const renderItem = (item: SampleItem) => ({
  key: item.id,
  title: item.title,
  date: item.date,
  source: item.source,
  description: item.description,
  status: item.status,
  data: item.data,
});

export const Default: Story = {
  render: (args) => (
    <div className="w-80">
      <Timeline {...args} items={figmaItems} renderItem={renderItem} />
    </div>
  ),
};

export const WithData: Story = {
  render: (args) => (
    <div className="w-80">
      <Timeline {...args} items={dataItems} renderItem={renderItem} />
    </div>
  ),
};

export const WithLimit: Story = {
  render: (args) => (
    <div className="w-80">
      <Timeline {...args} items={figmaItems} renderItem={renderItem} limit={2} />
    </div>
  ),
};

export const Loading: Story = {
  render: (args) => (
    <div className="w-80">
      <Timeline {...args} items={[]} renderItem={renderItem} isLoading skeletonRowCount={4} />
    </div>
  ),
};

export const Empty: Story = {
  render: (args) => (
    <div className="w-80">
      <Timeline {...args} items={[]} renderItem={renderItem} emptyMessage="No activity yet" />
    </div>
  ),
};
