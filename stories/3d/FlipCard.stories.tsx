import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { FlipCard } from "../../templates/components/3d/flip-card";

const meta: Meta<typeof FlipCard> = {
  title: "3D/Flip Card",
  component: FlipCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "3D flip card with tilt effect and customizable front/back content.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FlipCard>;

export const Default: Story = {
  render: () => (
    <FlipCard
      front={
        <div className="flex flex-col items-center justify-center h-full text-white p-6">
          <div className="text-5xl mb-4">🚀</div>
          <h3 className="text-xl font-bold">Hover Me</h3>
          <p className="text-sm text-white/60 mt-2">Click to flip</p>
        </div>
      }
      back={
        <div className="flex flex-col items-center justify-center h-full text-white p-6">
          <h3 className="text-xl font-bold mb-2">The Back Side</h3>
          <p className="text-sm text-white/60 text-center">
            This card flips with a smooth 3D animation and supports tilt effects.
          </p>
        </div>
      }
    />
  ),
};
