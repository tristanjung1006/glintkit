import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Maps component names to their template subdirectory paths
const COMPONENT_MAP: Record<string, string> = {
  "3d-card": "3d/3d-card",
  "prismatic-burst": "3d/prismatic-burst",
  "glass-surface": "3d/glass-surface",
  "dome-gallery": "3d/dome-gallery",
  "holo-card": "3d/holo-card",
  "flip-card": "3d/flip-card",
  "button": "glass/button",
  "card": "glass/card",
  "modal": "glass/modal",
  "music-player": "glass/music-player",
  "counter": "motion/counter",
  "countdown-timer": "motion/countdown-timer",
  "shiny-text": "motion/shiny-text",
  "light-rays": "motion/light-rays",
};

function glintAliasPlugin() {
  const templatesDir = path.resolve(__dirname, "../templates");

  return {
    name: "glint-ui-alias",
    resolveId(source: string) {
      if (source.startsWith("__UTILS_ALIAS__/")) {
        const name = source.replace("__UTILS_ALIAS__/", "");
        return path.resolve(templatesDir, `utils/${name}.ts`);
      }
      if (source.startsWith("__HOOKS_ALIAS__/")) {
        const name = source.replace("__HOOKS_ALIAS__/", "");
        return path.resolve(templatesDir, `hooks/${name}.ts`);
      }
      if (source.startsWith("__COMPONENTS_ALIAS__/")) {
        const name = source.replace("__COMPONENTS_ALIAS__/", "");
        const mapped = COMPONENT_MAP[name];
        if (mapped) {
          return path.resolve(templatesDir, `components/${mapped}.tsx`);
        }
      }
      return null;
    },
  };
}

const config: StorybookConfig = {
  stories: ["../stories/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-themes",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config) => {
    const tailwindcss = (await import("@tailwindcss/vite")).default;

    config.plugins = config.plugins || [];
    config.plugins.push(glintAliasPlugin());
    config.plugins.push(tailwindcss());

    return config;
  },
  docs: {
    autodocs: "tag",
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};

export default config;
