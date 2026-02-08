import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import DomeGallery from "../../templates/components/3d/dome-gallery";

const meta: Meta<typeof DomeGallery> = {
  title: "3D/Dome Gallery",
  component: DomeGallery,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "3D dome/sphere photo gallery with drag and inertia. Drag to rotate the sphere.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DomeGallery>;

const sampleImages = Array.from({ length: 12 }, (_, i) => ({
  src: `https://picsum.photos/seed/${i + 1}/400/300`,
  alt: `Sample image ${i + 1}`,
}));

export const Default: Story = {
  render: () => (
    <div style={{ width: "100vw", height: "100vh" }}>
      <DomeGallery images={sampleImages} />
    </div>
  ),
};
