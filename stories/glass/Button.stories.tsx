import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Button } from "../../templates/components/glass/button";

const meta: Meta<typeof Button> = {
  title: "Glass/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Multi-variant button with glow border, gradient, and glass styles.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "glow", "gradient", "outline", "glass", "ghost"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { children: "Button", variant: "default", size: "md" },
};

export const GlowBorder: Story = {
  args: { children: "Glow Border", variant: "glow", size: "md" },
};

export const Gradient: Story = {
  args: { children: "Gradient", variant: "gradient", size: "md" },
};

export const Outline: Story = {
  args: { children: "Outline", variant: "outline", size: "md" },
};

export const Glass: Story = {
  args: { children: "Glass", variant: "glass", size: "md" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button variant="default">Default</Button>
      <Button variant="glow">Glow Border</Button>
      <Button variant="gradient">Gradient</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="glass">Glass</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};
