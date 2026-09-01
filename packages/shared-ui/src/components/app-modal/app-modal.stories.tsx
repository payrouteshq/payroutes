import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { AppModal } from "./index";

const meta: Meta = {
  title: "Components/AppModal",
  decorators: [
    (Story) => (
      <div className="flex min-h-24 items-center justify-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj;

export const Small: Story = {
  render: () => (
    <Button
      onClick={() =>
        AppModal.open({
          size: "small",
          title: "Enable live routing",
          description: "Traffic will start following this rule immediately. You can pause it later from the rule list.",
          primaryButton: { children: "Enable" },
          secondaryButton: { children: "Cancel" },
        })
      }
    >
      Open small modal
    </Button>
  ),
};

export const Medium: Story = {
  render: () => (
    <Button
      onClick={() =>
        AppModal.open({
          size: "medium",
          title: "Invite a teammate",
          description: "They’ll get access to this workspace’s routing rules and destination weights.",
          content: <Input type="email" placeholder="nina.v@example.com" aria-label="Email" />,
          primaryButton: { children: "Send invite" },
          secondaryButton: { children: "Cancel" },
        })
      }
    >
      Open medium modal
    </Button>
  ),
};

export const Full: Story = {
  render: () => (
    <Button
      onClick={() =>
        AppModal.open({
          size: "full",
          title: "Rule editor",
          description:
            "Build the full routing rule in a dedicated canvas. Save when the conditions and destinations look right.",
          content: (
            <div className="border-border bg-card text-muted-foreground rounded-lg border p-4 text-sm">
              Condition and destination rows go here.
            </div>
          ),
          primaryButton: { children: "Save rule" },
          secondaryButton: { children: "Cancel" },
        })
      }
    >
      Open full-screen modal
    </Button>
  ),
};

export const CustomFooter: Story = {
  render: () => (
    <Button
      onClick={() =>
        AppModal.open({
          title: "Export report",
          description: "Choose how you want to download this routing report.",
          footer: (
            <div className="flex w-full items-center justify-between gap-3">
              <Button variant="ghost" onClick={() => AppModal.close()}>
                Cancel
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => AppModal.close()}>
                  CSV
                </Button>
                <Button onClick={() => AppModal.close()}>PDF</Button>
              </div>
            </div>
          ),
        })
      }
    >
      Open with custom footer
    </Button>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Button
      variant="destructive"
      onClick={() =>
        AppModal.open({
          title: "Delete this rule?",
          description: "This can’t be undone. Live traffic using this rule will fall back to the default route.",
          primaryButton: {
            children: "Delete rule",
            variant: "destructive",
            onClick: () => AppModal.close(),
          },
          secondaryButton: { children: "Keep rule" },
        })
      }
    >
      Open delete confirmation
    </Button>
  ),
};

export const NoCloseButton: Story = {
  render: () => (
    <Button
      variant="outline"
      onClick={() =>
        AppModal.open({
          showCloseButton: false,
          title: "Processing payout",
          description: "Don’t close this window until the export finishes. You’ll get a download when it’s ready.",
          primaryButton: {
            children: "Stay on this page",
            onClick: () => AppModal.close(),
          },
        })
      }
    >
      Open (no X button)
    </Button>
  ),
};

export const Steps: Story = {
  render: () => (
    <Button
      variant="secondary"
      onClick={() =>
        AppModal.open({
          step: "Step 1 of 2",
          title: "Modal title",
          description: "Body copy sits here. Footer keeps one primary and a quiet secondary.",
          primaryButton: {
            children: "Continue",
            onClick: () =>
              AppModal.updateConfig({
                step: "Step 2 of 2",
                title: "Almost done",
                description: "Confirm to finish this flow.",
                primaryButton: {
                  children: "Done",
                  onClick: () => AppModal.close(),
                },
              }),
          },
          secondaryButton: { children: "Cancel" },
        })
      }
    >
      Open step flow
    </Button>
  ),
};
