import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import LightRays from "../../templates/components/motion/light-rays";

const meta: Meta<typeof LightRays> = {
  title: "Motion/Light Rays",
  component: LightRays,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "WebGL volumetric light rays from configurable origin. Uses OGL for rendering.",
      },
    },
  },
  argTypes: {
    origin: {
      control: { type: "select" },
      options: ["top", "bottom", "left", "right", "center"],
    },
    colorStart: { control: "color" },
    colorEnd: { control: "color" },
    opacity: { control: { type: "range", min: 0, max: 1, step: 0.05 } },
  },
};

export default meta;
type Story = StoryObj<typeof LightRays>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <LightRays {...args} />
    </div>
  ),
  args: {
    origin: "center",
    colorStart: "#00D4FF",
    colorEnd: "#00FF88",
    opacity: 0.5,
  },
};

export const TopOrigin: Story = {
  render: (args) => (
    <div style={{ width: "100vw", height: "400px", position: "relative" }}>
      <LightRays {...args} />
    </div>
  ),
  args: {
    origin: "top",
    colorStart: "#a855f7",
    colorEnd: "#ec4899",
    opacity: 0.6,
  },
};
