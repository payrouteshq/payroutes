import { Fragment, useState } from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { SearchField, SearchFieldResult } from "../search-field";
import { ConditionChips } from "./index";

const suggestions = ["amount > 500", "currency = EUR", "status = active", "country = DE"];

const meta: Meta<typeof ConditionChips> = {
  title: "Components/ConditionChips",
  component: ConditionChips,
};

export default meta;

type Story = StoryObj<typeof ConditionChips>;

export const Default: Story = {
  render: () => (
    <ConditionChips>
      <ConditionChips.Keyword>IF</ConditionChips.Keyword>
      <ConditionChips.Chip>amount &gt; 500</ConditionChips.Chip>
      <ConditionChips.Add />
    </ConditionChips>
  ),
};

export const And: Story = {
  render: () => (
    <ConditionChips>
      <ConditionChips.Keyword>IF</ConditionChips.Keyword>
      <ConditionChips.Chip>amount &gt; 500</ConditionChips.Chip>
      <ConditionChips.Keyword>AND</ConditionChips.Keyword>
      <ConditionChips.Chip>currency = EUR</ConditionChips.Chip>
      <ConditionChips.Add />
    </ConditionChips>
  ),
};

export const Or: Story = {
  render: () => (
    <ConditionChips>
      <ConditionChips.Keyword>IF</ConditionChips.Keyword>
      <ConditionChips.Chip>amount &gt; 500</ConditionChips.Chip>
      <ConditionChips.Keyword>OR</ConditionChips.Keyword>
      <ConditionChips.Chip>currency = EUR</ConditionChips.Chip>
      <ConditionChips.Add />
    </ConditionChips>
  ),
};

export const Chain: Story = {
  render: () => (
    <ConditionChips>
      <ConditionChips.Keyword>IF</ConditionChips.Keyword>
      <ConditionChips.Chip>amount &gt; 500</ConditionChips.Chip>
      <ConditionChips.Keyword>AND</ConditionChips.Keyword>
      <ConditionChips.Chip>currency = EUR</ConditionChips.Chip>
      <ConditionChips.Keyword>AND</ConditionChips.Keyword>
      <ConditionChips.Chip>status = active</ConditionChips.Chip>
      <ConditionChips.Add />
    </ConditionChips>
  ),
};

export const Keywords: Story = {
  render: () => (
    <ConditionChips>
      <ConditionChips.Keyword>IF</ConditionChips.Keyword>
      <ConditionChips.Keyword>AND</ConditionChips.Keyword>
      <ConditionChips.Keyword>OR</ConditionChips.Keyword>
      <ConditionChips.Keyword>THEN</ConditionChips.Keyword>
    </ConditionChips>
  ),
};

export const Interactive: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: function InteractiveStory() {
    const [chips, setChips] = useState(["amount > 500"]);
    const [combinators, setCombinators] = useState<string[]>([]);
    const [adding, setAdding] = useState(false);
    const [query, setQuery] = useState("");
    const matches = suggestions.filter(
      (item) => !chips.includes(item) && item.toLowerCase().includes(query.trim().toLowerCase())
    );

    function addChip(value: string) {
      setCombinators((current) => [...current, "AND"]);
      setChips((current) => [...current, value]);
      setQuery("");
      setAdding(false);
    }

    return (
      <ConditionChips>
        <ConditionChips.Keyword>IF</ConditionChips.Keyword>
        {chips.map((chip, index) => (
          <Fragment key={`${chip}-${index}`}>
            {index > 0 ? (
              <ConditionChips.Keyword
                onClick={() =>
                  setCombinators((current) =>
                    current.map((item, itemIndex) => (itemIndex === index - 1 ? (item === "AND" ? "OR" : "AND") : item))
                  )
                }
              >
                {combinators[index - 1]}
              </ConditionChips.Keyword>
            ) : null}
            <ConditionChips.Chip>{chip}</ConditionChips.Chip>
          </Fragment>
        ))}
        {adding ? (
          <SearchField
            className="w-56"
            placeholder="Add condition"
            value={query}
            autoFocus
            defaultOpen
            onChange={(event) => setQuery(event.target.value)}
          >
            {matches.map((item) => (
              <SearchFieldResult key={item} onSelect={() => addChip(item)}>
                {item}
              </SearchFieldResult>
            ))}
          </SearchField>
        ) : (
          <ConditionChips.Add onClick={() => setAdding(true)} />
        )}
      </ConditionChips>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <ConditionChips>
      <ConditionChips.Keyword disabled>IF</ConditionChips.Keyword>
      <ConditionChips.Chip disabled>amount &gt; 500</ConditionChips.Chip>
      <ConditionChips.Keyword disabled>AND</ConditionChips.Keyword>
      <ConditionChips.Chip disabled>currency = EUR</ConditionChips.Chip>
      <ConditionChips.Add disabled />
    </ConditionChips>
  ),
};
