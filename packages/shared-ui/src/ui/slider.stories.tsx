import { useState } from "react"

import type { Meta, StoryObj } from "@storybook/react"

import { Slider } from "./slider"

const meta: Meta<typeof Slider> = {
  title: "UI/Slider",
  component: Slider,
  args: {
    min: 0,
    max: 1000,
    defaultValue: [650],
  },
}

export default meta

type Story = StoryObj<typeof Slider>

export const Default: Story = {}

export const WithLabels: Story = {
  render: (args) => {
    function SliderWithLabels() {
      const [value, setValue] = useState(args.defaultValue as number[])

      return (
        <div className="flex w-80 flex-col gap-2">
          <Slider {...args} value={value} onValueChange={(next) => setValue(next as number[])} />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">$0</span>
            <span className="text-primary font-medium">${value[0]} / day</span>
            <span className="text-muted-foreground">$1k</span>
          </div>
        </div>
      )
    }

    return <SliderWithLabels />
  },
}

export const Disabled: Story = { args: { disabled: true } }
