import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { HoloCard } from "../../templates/components/3d/holo-card";

const meta: Meta<typeof HoloCard> = {
  title: "3D/Holo Card",
  component: HoloCard,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Holographic card with rainbow shine and flip animation. Click to open, move mouse for holographic effect.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof HoloCard>;

const sampleItem = {
  id: "demo-1",
  boothNumber: "A-01",
  title: "Aurora Project",
  description: "A real-time WebGL visualization engine for immersive data storytelling.",
  teamName: "Team Spark",
  category: "Web" as const,
  thumbnail: "",
};

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        {isOpen && (
          <HoloCard item={sampleItem} onClose={() => setIsOpen(false)} />
        )}
        {!isOpen && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
            <button
              onClick={() => setIsOpen(true)}
              className="px-6 py-3 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 transition"
            >
              Open Holo Card
            </button>
          </div>
        )}
      </div>
    );
  },
};
