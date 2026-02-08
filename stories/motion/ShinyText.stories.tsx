import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import ShinyText from "../../templates/components/motion/shiny-text";

const meta: Meta<typeof ShinyText> = {
  title: "Motion/Shiny Text",
  component: ShinyText,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Animated shiny/glossy text with customizable sweep direction. Powered by Framer Motion.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ShinyText>;

export const Default: Story = {
  render: () => (
    <ShinyText className="text-4xl font-bold text-white">
      Shiny Text Effect
    </ShinyText>
  ),
};

export const Heading: Story = {
  render: () => (
    <div className="space-y-4">
      <ShinyText className="text-6xl font-bold text-white">
        THE FIRST SPARK
      </ShinyText>
      <ShinyText className="text-2xl text-white/80">
        From Fear to Frontier
      </ShinyText>
    </div>
  ),
};
