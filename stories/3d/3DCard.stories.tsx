import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { CardContainer, CardBody, CardItem } from "../../templates/components/3d/3d-card";

const meta: Meta<typeof CardContainer> = {
  title: "3D/3D Card",
  component: CardContainer,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "3D tilt card with mouse/touch tracking and depth layers. Hover to see the parallax effect.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CardContainer>;

export const Default: Story = {
  render: () => (
    <CardContainer className="inter-var">
      <CardBody className="relative w-auto h-auto rounded-xl p-6 border border-white/[0.1] bg-black/50 sm:w-[30rem]">
        <CardItem translateZ="50" className="text-xl font-bold text-white">
          Make things float in 3D
        </CardItem>
        <CardItem as="p" translateZ="60" className="text-sm mt-2 text-neutral-300 max-w-sm">
          Hover over this card to unleash the power of CSS perspective.
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <div className="h-48 w-full rounded-xl bg-gradient-to-br from-cyan-500/20 to-green-500/20 border border-white/10 flex items-center justify-center">
            <span className="text-4xl">✨</span>
          </div>
        </CardItem>
        <div className="flex justify-between items-center mt-6">
          <CardItem translateZ={20} as="button" className="px-4 py-2 rounded-xl text-xs font-normal text-white">
            Try now →
          </CardItem>
          <CardItem translateZ={20} as="button" className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold">
            Sign up
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  ),
};

export const DepthLayers: Story = {
  render: () => (
    <CardContainer>
      <CardBody className="relative w-[20rem] h-[20rem] rounded-2xl bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-white/10">
        <CardItem translateZ={20} className="absolute inset-4 rounded-xl bg-white/5 border border-white/5" />
        <CardItem translateZ={50} className="absolute inset-8 rounded-lg bg-white/5 border border-white/5" />
        <CardItem translateZ={80} className="absolute inset-12 rounded-md bg-white/10 border border-white/10 flex items-center justify-center">
          <span className="text-white font-bold text-lg">Depth</span>
        </CardItem>
      </CardBody>
    </CardContainer>
  ),
};
