import type { ComponentProps } from "react"
import type { Meta, StoryObj } from "@storybook/react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion"

const items = [
  {
    value: "product-information",
    title: "Product Information",
    content: (
      <>
        <p>
          This product features cutting-edge technology designed with precision.
          Made from premium materials, it offers exceptional durability and
          performance.
        </p>
        <p>
          The intuitive user interface ensures a seamless experience from setup
          to everyday use.
        </p>
      </>
    ),
  },
  {
    value: "shipping-details",
    title: "Shipping Details",
    content: (
      <>
        <p>
          We partner with trusted courier partners to ensure your order arrives
          safely and on time.
        </p>
        <p>
          Standard delivery typically takes 3-5 business days depending on your
          location.
        </p>
      </>
    ),
  },
  {
    value: "return-policy",
    title: "Return Policy",
    content: (
      <>
        <p>
          We offer a 30-day return policy for unused items in their original
          packaging.
        </p>
        <p>Return shipping is free for all eligible orders.</p>
      </>
    ),
  },
] as const

type AccordionRootProps = ComponentProps<typeof Accordion>

function ProductAccordion(props: AccordionRootProps) {
  return (
    <Accordion className="w-80" {...props}>
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.title}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

const meta: Meta<typeof Accordion> = {
  title: "UI/Accordion",
  component: Accordion,
}

export default meta

type Story = StoryObj<typeof Accordion>

export const Default: Story = {
  render: () => <ProductAccordion />,
}

export const ProductInformation: Story = {
  render: () => <ProductAccordion defaultValue={["product-information"]} />,
}

export const ShippingDetails: Story = {
  render: () => <ProductAccordion defaultValue={["shipping-details"]} />,
}

export const ReturnPolicy: Story = {
  render: () => <ProductAccordion defaultValue={["return-policy"]} />,
}

export const Multiple: Story = {
  render: () => (
    <ProductAccordion multiple defaultValue={["product-information", "shipping-details"]} />
  ),
}

export const Disabled: Story = {
  render: () => <ProductAccordion disabled defaultValue={["product-information"]} />,
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      <ProductAccordion />
      <ProductAccordion defaultValue={["product-information"]} />
      <ProductAccordion defaultValue={["shipping-details"]} />
      <ProductAccordion defaultValue={["return-policy"]} />
    </div>
  ),
}
