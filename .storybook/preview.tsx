import type { Preview } from "@storybook/react";
import React from "react";
import "./globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#0a0a0f" },
        { name: "darker", value: "#000000" },
        { name: "light", value: "#ffffff" },
      ],
    },
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: "200px", padding: "2rem" }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
