import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Counter } from "../../templates/components/motion/counter";

const meta: Meta<typeof Counter> = {
  title: "Motion/Counter",
  component: Counter,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Cyberpunk scramble counter that reveals numbers with matrix-style katakana animation.",
      },
    },
  },
  argTypes: {
    target: { control: { type: "number", min: 0, max: 10000 } },
    suffix: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Counter>;

export const Default: Story = {
  args: { target: 1500, suffix: "+" },
};

export const Stats: Story = {
  render: () => (
    <div className="flex gap-12">
      <div className="text-center">
        <Counter target={73} suffix="+" className="text-5xl font-bold" />
        <p className="text-white/60 mt-2 text-sm">Teams</p>
      </div>
      <div className="text-center">
        <Counter target={1500} suffix="+" className="text-5xl font-bold" />
        <p className="text-white/60 mt-2 text-sm">Visitors</p>
      </div>
      <div className="text-center">
        <Counter target={10} suffix="+" className="text-5xl font-bold" />
        <p className="text-white/60 mt-2 text-sm">Sponsors</p>
      </div>
    </div>
  ),
};
