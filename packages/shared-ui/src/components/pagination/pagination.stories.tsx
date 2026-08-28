import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"

import { Pagination } from "./index"

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
}

export default meta

type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  render: function DefaultStory() {
    const [page, setPage] = useState(1)
    const last = 3

    return (
      <Pagination>
        <Pagination.Content>
          <Pagination.Item>
            <Pagination.Previous
              disabled={page === 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
            />
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Link isActive={page === 1} onClick={() => setPage(1)}>
              1
            </Pagination.Link>
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Link isActive={page === 2} onClick={() => setPage(2)}>
              2
            </Pagination.Link>
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Link isActive={page === 3} onClick={() => setPage(3)}>
              3
            </Pagination.Link>
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Ellipsis />
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Next
              disabled={page === last}
              onClick={() => setPage((current) => Math.min(last, current + 1))}
            />
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>
    )
  },
}

export const Boxed: Story = {
  render: function BoxedStory() {
    const [page, setPage] = useState(1)
    const last = 3

    return (
      <Pagination>
        <Pagination.Content className="gap-2">
          <Pagination.Item>
            <Pagination.Previous
              boxed
              disabled={page === 1}
              onClick={() => setPage((current) => Math.max(1, current - 1))}
            />
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Link
              boxed
              isActive={page === 1}
              onClick={() => setPage(1)}
            >
              1
            </Pagination.Link>
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Link
              boxed
              isActive={page === 2}
              onClick={() => setPage(2)}
            >
              2
            </Pagination.Link>
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Link
              boxed
              isActive={page === 3}
              onClick={() => setPage(3)}
            >
              3
            </Pagination.Link>
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Ellipsis className="size-9" />
          </Pagination.Item>
          <Pagination.Item>
            <Pagination.Next
              boxed
              disabled={page === last}
              onClick={() => setPage((current) => Math.min(last, current + 1))}
            />
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>
    )
  },
}

export const Disabled: Story = {
  render: () => (
    <Pagination>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous disabled />
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link isActive>1</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link disabled>2</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link disabled>3</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Ellipsis />
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Next disabled />
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  ),
}
