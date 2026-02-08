import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import PrismaticBurst from "../../templates/components/3d/prismatic-burst";

const meta: Meta<typeof PrismaticBurst> = {
  title: "3D/Prismatic Burst",
  component: PrismaticBurst,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "WebGL prismatic light effect with customizable colors and animations. Uses OGL for rendering.",
      },
    },
  },
  argTypes: {
    animationType: {
      control: { type: "select" },
      options: ["rotate", "rotate3d", "hover"],
    },
    opacity: {
      control: { type: "range", min: 0, max: 1, step: 0.05 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PrismaticBurst>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <PrismaticBurst {...args} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <h1 style={{ color: "white", fontSize: "3rem", fontWeight: "bold", textShadow: "0 0 40px rgba(0,0,0,0.5)" }}>
          Prismatic Burst
        </h1>
      </div>
    </div>
  ),
  args: {
    animationType: "rotate3d",
    opacity: 0.3,
    colors: ["#00D4FF", "#00FF88"],
  },
};

export const CyanGreen: Story = {
  render: (args) => (
    <div style={{ width: "100vw", height: "400px", position: "relative" }}>
      <PrismaticBurst {...args} />
    </div>
  ),
  args: {
    animationType: "rotate",
    opacity: 0.5,
    colors: ["#00D4FF", "#00FF88"],
  },
};

export const PurplePink: Story = {
  render: (args) => (
    <div style={{ width: "100vw", height: "400px", position: "relative" }}>
      <PrismaticBurst {...args} />
    </div>
  ),
  args: {
    animationType: "rotate3d",
    opacity: 0.4,
    colors: ["#a855f7", "#ec4899"],
  },
};
