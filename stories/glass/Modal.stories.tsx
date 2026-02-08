import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Modal } from "../../templates/components/glass/modal";

const meta: Meta<typeof Modal> = {
  title: "Glass/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Modal dialog with glass backdrop, mobile handle bar, and portal rendering.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <button
          onClick={() => setOpen(true)}
          className="px-6 py-3 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/20 transition"
        >
          Open Modal
        </button>
        <Modal isOpen={open} onClose={() => setOpen(false)}>
          <div className="p-6 text-white">
            <h2 className="text-xl font-bold mb-4">Glass Modal</h2>
            <p className="text-white/60">
              This modal uses glassmorphism backdrop with smooth animations.
            </p>
            <button
              onClick={() => setOpen(false)}
              className="mt-6 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm"
            >
              Close
            </button>
          </div>
        </Modal>
      </div>
    );
  },
};
