import type { Meta, StoryObj } from "@storybook/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta: Meta<typeof Tabs> = {
  title: "UI/Tabs",
  component: Tabs,
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="one-time" className="w-80">
      <TabsList>
        <TabsTrigger value="one-time">One-time</TabsTrigger>
        <TabsTrigger value="recurring">Recurring</TabsTrigger>
      </TabsList>
      <TabsContent value="one-time" />
      <TabsContent value="recurring" />
    </Tabs>
  ),
};
