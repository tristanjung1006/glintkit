import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { GlassSurface } from "../../templates/components/3d/glass-surface";

const meta: Meta<typeof GlassSurface> = {
  title: "3D/Glass Surface",
  component: GlassSurface,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "SVG-based glass refraction and distortion surface. Hover to see the distortion effect.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof GlassSurface>;

export const Default: Story = {
  render: () => (
    <GlassSurface className="px-8 py-4 rounded-full">
      <span className="text-white font-medium text-sm">Glass Surface</span>
    </GlassSurface>
  ),
};

export const Navigation: Story = {
  render: () => (
    <GlassSurface className="px-6 py-3 rounded-full">
      <div className="flex gap-6 text-white/80 text-sm">
        <span>Home</span>
        <span>About</span>
        <span>Contact</span>
      </div>
    </GlassSurface>
  ),
};
