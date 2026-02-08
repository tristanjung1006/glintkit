import type { ComponentCategory, RegistryComponent } from "./index";

export const REGISTRY: RegistryComponent[] = [
  // Category: 3d
  {
    name: "3d-card",
    category: "3d",
    description: "3D tilt card with mouse/touch tracking and depth layers",
    files: [
      {
        templateKey: "components/3d/3d-card",
        fileName: "3d-card.tsx",
        type: "component",
      },
    ],
    npmDependencies: [],
    registryDependencies: ["cn"],
    cssPresets: [],
  },
  {
    name: "prismatic-burst",
    category: "3d",
    description:
      "WebGL prismatic light effect with customizable colors and animations",
    files: [
      {
        templateKey: "components/3d/prismatic-burst",
        fileName: "prismatic-burst.tsx",
        type: "component",
      },
    ],
    npmDependencies: ["ogl"],
    registryDependencies: [],
    cssPresets: [],
  },
  {
    name: "glass-surface",
    category: "3d",
    description: "SVG-based glass refraction and distortion surface",
    files: [
      {
        templateKey: "components/3d/glass-surface",
        fileName: "glass-surface.tsx",
        type: "component",
      },
    ],
    npmDependencies: [],
    registryDependencies: ["cn"],
    cssPresets: [],
  },
  {
    name: "dome-gallery",
    category: "3d",
    description: "3D dome/sphere photo gallery with drag and inertia",
    files: [
      {
        templateKey: "components/3d/dome-gallery",
        fileName: "dome-gallery.tsx",
        type: "component",
      },
    ],
    npmDependencies: ["@use-gesture/react"],
    registryDependencies: [],
    cssPresets: [],
  },
  {
    name: "holo-card",
    category: "3d",
    description: "Holographic card with rainbow shine and flip animation",
    files: [
      {
        templateKey: "components/3d/holo-card",
        fileName: "holo-card.tsx",
        type: "component",
      },
    ],
    npmDependencies: [],
    registryDependencies: ["cn"],
    cssPresets: ["holo-card"],
  },
  {
    name: "flip-card",
    category: "3d",
    description: "3D flip card with tilt effect and customizable content",
    files: [
      {
        templateKey: "components/3d/flip-card",
        fileName: "flip-card.tsx",
        type: "component",
      },
    ],
    npmDependencies: [],
    registryDependencies: ["cn", "3d-card"],
    cssPresets: [],
  },

  // Category: motion
  {
    name: "counter",
    category: "motion",
    description:
      "Cyberpunk scramble counter that reveals numbers with matrix-style animation",
    files: [
      {
        templateKey: "components/motion/counter",
        fileName: "counter.tsx",
        type: "component",
      },
    ],
    npmDependencies: [],
    registryDependencies: ["cn", "use-scroll-animation"],
    cssPresets: [],
  },
  {
    name: "countdown-timer",
    category: "motion",
    description:
      "Countdown timer with multiple visual states (normal, approaching, live)",
    files: [
      {
        templateKey: "components/motion/countdown-timer",
        fileName: "countdown-timer.tsx",
        type: "component",
      },
    ],
    npmDependencies: [],
    registryDependencies: ["cn", "use-countdown"],
    cssPresets: ["glass", "gradient-text", "animations"],
  },
  {
    name: "shiny-text",
    category: "motion",
    description: "Animated shiny/glossy text with customizable sweep direction",
    files: [
      {
        templateKey: "components/motion/shiny-text",
        fileName: "shiny-text.tsx",
        type: "component",
      },
    ],
    npmDependencies: ["motion"],
    registryDependencies: [],
    cssPresets: [],
  },
  {
    name: "light-rays",
    category: "motion",
    description: "WebGL volumetric light rays from configurable origin",
    files: [
      {
        templateKey: "components/motion/light-rays",
        fileName: "light-rays.tsx",
        type: "component",
      },
    ],
    npmDependencies: ["ogl"],
    registryDependencies: [],
    cssPresets: [],
  },

  // Category: glass
  {
    name: "button",
    category: "glass",
    description:
      "Multi-variant button with glow border, gradient, and glass styles",
    files: [
      {
        templateKey: "components/glass/button",
        fileName: "button.tsx",
        type: "component",
      },
    ],
    npmDependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["cn"],
    cssPresets: ["glow-border"],
  },
  {
    name: "card",
    category: "glass",
    description: "Glass card with default, strong, gradient, and outline variants",
    files: [
      {
        templateKey: "components/glass/card",
        fileName: "card.tsx",
        type: "component",
      },
    ],
    npmDependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["cn"],
    cssPresets: ["glass"],
  },
  {
    name: "modal",
    category: "glass",
    description:
      "Modal dialog with glass backdrop, mobile handle bar, and portal rendering",
    files: [
      {
        templateKey: "components/glass/modal",
        fileName: "modal.tsx",
        type: "component",
      },
    ],
    npmDependencies: [],
    registryDependencies: ["cn"],
    cssPresets: ["glass", "animations"],
  },
  {
    name: "music-player",
    category: "glass",
    description: "Audio player with soundwave visualization and glass surface",
    files: [
      {
        templateKey: "components/glass/music-player",
        fileName: "music-player.tsx",
        type: "component",
      },
    ],
    npmDependencies: [],
    registryDependencies: ["glass-surface"],
    cssPresets: ["animations"],
  },

  // Category: hooks
  {
    name: "use-countdown",
    category: "hooks",
    description: "Countdown timer hook that calculates days, hours, minutes, seconds",
    files: [
      {
        templateKey: "hooks/use-countdown",
        fileName: "use-countdown.ts",
        type: "hook",
      },
    ],
    npmDependencies: [],
    registryDependencies: [],
    cssPresets: [],
  },
  {
    name: "use-scroll-animation",
    category: "hooks",
    description: "IntersectionObserver-based scroll trigger hook",
    files: [
      {
        templateKey: "hooks/use-scroll-animation",
        fileName: "use-scroll-animation.ts",
        type: "hook",
      },
    ],
    npmDependencies: [],
    registryDependencies: [],
    cssPresets: [],
  },
  {
    name: "use-media-query",
    category: "hooks",
    description:
      "Responsive breakpoint detection with predefined mobile/tablet/desktop helpers",
    files: [
      {
        templateKey: "hooks/use-media-query",
        fileName: "use-media-query.ts",
        type: "hook",
      },
    ],
    npmDependencies: [],
    registryDependencies: [],
    cssPresets: [],
  },

  // Category: utils
  {
    name: "cn",
    category: "utils",
    description: "Tailwind CSS class merge utility (clsx + tailwind-merge)",
    files: [
      {
        templateKey: "utils/cn",
        fileName: "cn.ts",
        type: "util",
      },
    ],
    npmDependencies: ["clsx", "tailwind-merge"],
    registryDependencies: [],
    cssPresets: [],
  },
];

export function getComponent(name: string): RegistryComponent | undefined {
  return REGISTRY.find((c) => c.name === name);
}

export function getComponentsByCategory(
  category: ComponentCategory
): RegistryComponent[] {
  return REGISTRY.filter((c) => c.category === category);
}

export function getAllCategories(): ComponentCategory[] {
  return [...new Set(REGISTRY.map((c) => c.category))];
}
