import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MusicPlayer } from "../../templates/components/glass/music-player";

const meta: Meta<typeof MusicPlayer> = {
  title: "Glass/Music Player",
  component: MusicPlayer,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Audio player with soundwave visualization and glass surface refraction effect.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MusicPlayer>;

export const Default: Story = {
  render: () => (
    <MusicPlayer src="" title="Ambient Waves" />
  ),
};
