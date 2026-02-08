import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { CountdownTimer } from "../../templates/components/motion/countdown-timer";

const meta: Meta<typeof CountdownTimer> = {
  title: "Motion/Countdown Timer",
  component: CountdownTimer,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Countdown timer with multiple visual states: normal, approaching, and live.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CountdownTimer>;

export const Default: Story = {
  args: {
    targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  },
};

export const Approaching: Story = {
  args: {
    targetDate: new Date(Date.now() + 2 * 60 * 60 * 1000),
  },
};
