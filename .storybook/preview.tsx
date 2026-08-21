import type { Preview } from "@storybook/react";

import { AppModalProvider } from "../packages/shared-ui/src/components/app-modal";
import "../packages/shared-ui/src/global.css";
import "./preview.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <AppModalProvider>
        <Story />
      </AppModalProvider>
    ),
  ],
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "oklch(0.2079 0.0399 265.7275)",
        },
      ],
    },
  },
};

export default preview;
