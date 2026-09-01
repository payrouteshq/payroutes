import * as React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../../ui/button";
import { AppConnection } from "./index";

const meta: Meta<typeof AppConnection> = {
  title: "Components/AppConnection",
  component: AppConnection,
};

export default meta;

type Story = StoryObj<typeof AppConnection>;

export const Default: Story = {
  render: () => (
    <div className="flex gap-4">
      <AppConnection className="w-56">
        <AppConnection.Icon>TX</AppConnection.Icon>
        <AppConnection.Content>
          <AppConnection.Meta>
            <AppConnection.Title>Stripe</AppConnection.Title>
            <AppConnection.Description>Cards · Wallets</AppConnection.Description>
          </AppConnection.Meta>
        </AppConnection.Content>
        <AppConnection.Actions>
          <Button variant="outline">Connect</Button>
        </AppConnection.Actions>
      </AppConnection>

      <AppConnection className="w-56">
        <AppConnection.Icon>TX</AppConnection.Icon>
        <AppConnection.Content>
          <AppConnection.Meta>
            <AppConnection.Title>Stripe</AppConnection.Title>
            <AppConnection.Description>Cards · Wallets</AppConnection.Description>
          </AppConnection.Meta>
          <AppConnection.Badge>Live</AppConnection.Badge>
        </AppConnection.Content>
        <AppConnection.Actions>
          <Button variant="outline">Open</Button>
          <Button variant="destructive">Disconnect</Button>
        </AppConnection.Actions>
      </AppConnection>
    </div>
  ),
};

export const Disconnected: Story = {
  render: () => (
    <AppConnection className="w-56">
      <AppConnection.Icon>TX</AppConnection.Icon>
      <AppConnection.Content>
        <AppConnection.Meta>
          <AppConnection.Title>Stripe</AppConnection.Title>
          <AppConnection.Description>Cards · Wallets</AppConnection.Description>
        </AppConnection.Meta>
      </AppConnection.Content>
      <AppConnection.Actions>
        <Button variant="outline">Connect</Button>
      </AppConnection.Actions>
    </AppConnection>
  ),
};

export const Connected: Story = {
  render: () => (
    <AppConnection className="w-56">
      <AppConnection.Icon>TX</AppConnection.Icon>
      <AppConnection.Content>
        <AppConnection.Meta>
          <AppConnection.Title>Stripe</AppConnection.Title>
          <AppConnection.Description>Cards · Wallets</AppConnection.Description>
        </AppConnection.Meta>
        <AppConnection.Badge>Live</AppConnection.Badge>
      </AppConnection.Content>
      <AppConnection.Actions>
        <Button variant="outline">Open</Button>
        <Button variant="destructive">Disconnect</Button>
      </AppConnection.Actions>
    </AppConnection>
  ),
};

export const Interactive: Story = {
  render: function InteractiveStory() {
    const [connected, setConnected] = React.useState(false);

    return (
      <AppConnection className="w-56">
        <AppConnection.Icon>TX</AppConnection.Icon>
        <AppConnection.Content>
          <AppConnection.Meta>
            <AppConnection.Title>Stripe</AppConnection.Title>
            <AppConnection.Description>Cards · Wallets</AppConnection.Description>
          </AppConnection.Meta>
          {connected ? <AppConnection.Badge>Live</AppConnection.Badge> : null}
        </AppConnection.Content>
        <AppConnection.Actions>
          {connected ? (
            <>
              <Button variant="outline">Open</Button>
              <Button variant="destructive" onClick={() => setConnected(false)}>
                Disconnect
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={() => setConnected(true)}>
              Connect
            </Button>
          )}
        </AppConnection.Actions>
      </AppConnection>
    );
  },
};
