import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { SearchField, SearchFieldResult } from "./index";

const providers = ["Stripe", "Adyen", "Checkout.com", "Rivers", "Razorpay", "Braintree"];

const meta: Meta<typeof SearchField> = {
  title: "Components/SearchField",
  component: SearchField,
  args: {
    className: "w-80",
  },
};

export default meta;

type Story = StoryObj<typeof SearchField>;

function SearchingField({ defaultValue = "", defaultOpen = false }: { defaultValue?: string; defaultOpen?: boolean }) {
  const [value, setValue] = useState(defaultValue);
  const query = value.trim().toLowerCase();
  const matches = providers.filter((item) => item.toLowerCase().includes(query));

  return (
    <SearchField
      className="w-80"
      value={value}
      defaultOpen={defaultOpen}
      onChange={(event) => setValue(event.target.value)}
    >
      {matches.length > 0 ? (
        <>
          {!query ? (
            <p className="text-muted-foreground px-3 py-1.5 text-[10px] font-medium tracking-wider uppercase">Recent</p>
          ) : null}
          {matches.map((item) => (
            <SearchFieldResult key={item} selected={item === value} onSelect={() => setValue(item)}>
              {item}
            </SearchFieldResult>
          ))}
        </>
      ) : null}
    </SearchField>
  );
}

export const Default: Story = {
  render: () => <SearchingField />,
};

export const Hover: Story = {
  args: { "data-state": "hover" },
};

export const Focused: Story = {
  args: { "data-state": "focus" },
};

export const Filled: Story = {
  args: { "data-state": "focus", defaultValue: "stripe2" },
};

export const Results: Story = {
  render: () => (
    <div className="min-h-72">
      <SearchingField defaultValue="Rivers" defaultOpen />
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div className="min-h-40">
      <SearchingField defaultValue="zzzz" defaultOpen />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const States: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <SearchField />
      <SearchField data-state="hover" />
      <SearchField data-state="focus" />
      <SearchField data-state="focus" defaultValue="stripe2" />
      <SearchField disabled />
    </div>
  ),
};
