import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Card } from "../../templates/components/glass/card";

const meta: Meta<typeof Card> = {
  title: "Glass/Card",
  component: Card,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Glass card with default, strong, gradient, and outline variants.",
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "strong", "gradient", "outline"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="p-6 w-80">
      <h3 className="text-white font-bold text-lg mb-2">Glass Card</h3>
      <p className="text-white/60 text-sm">
        A translucent card with backdrop blur and subtle borders.
      </p>
    </Card>
  ),
  args: { variant: "default" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[40rem]">
      {(["default", "strong", "gradient", "outline"] as const).map((v) => (
        <Card key={v} variant={v} className="p-6">
          <h3 className="text-white font-bold text-lg mb-2 capitalize">{v}</h3>
          <p className="text-white/60 text-sm">Glass card variant</p>
        </Card>
      ))}
    </div>
  ),
};
