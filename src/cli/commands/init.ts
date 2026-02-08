import { Command } from "commander";
import prompts from "prompts";
import { logger } from "../../utils/logger.js";
import { writeConfig, configExists, detectAliasFromTsconfig } from "../../utils/config.js";
import type { GlintUIConfig } from "../../utils/config.js";

export const initCommand = new Command("init")
  .description("Initialize glintkit configuration")
  .option("-y, --yes", "Skip prompts and use defaults")
  .action(async (options) => {
    const cwd = process.cwd();

    if (configExists(cwd)) {
      logger.warn("glintkit.json already exists. Overwriting...");
    }

    logger.title("\n  glintkit init\n");

    // Auto-detect alias prefix from tsconfig
    const detectedAlias = detectAliasFromTsconfig(cwd);
    const aliasPrefix = detectedAlias || "@";

    let config: GlintUIConfig;

    if (options.yes) {
      config = {
        aliases: {
          components: `${aliasPrefix}/components/ui`,
          hooks: `${aliasPrefix}/hooks`,
          utils: `${aliasPrefix}/lib`,
        },
        tailwind: {
          css: "src/app/globals.css",
        },
      };
    } else {
      const response = await prompts([
        {
          type: "text",
          name: "components",
          message: "Components directory alias:",
          initial: `${aliasPrefix}/components/ui`,
        },
        {
          type: "text",
          name: "hooks",
          message: "Hooks directory alias:",
          initial: `${aliasPrefix}/hooks`,
        },
        {
          type: "text",
          name: "utils",
          message: "Utils directory alias:",
          initial: `${aliasPrefix}/lib`,
        },
        {
          type: "text",
          name: "css",
          message: "Tailwind CSS file path:",
          initial: "src/app/globals.css",
        },
      ]);

      if (!response.components) {
        logger.error("Init cancelled.");
        process.exit(1);
      }

      config = {
        aliases: {
          components: response.components,
          hooks: response.hooks,
          utils: response.utils,
        },
        tailwind: {
          css: response.css,
        },
      };
    }

    writeConfig(config, cwd);
    logger.success("Created glintkit.json");
    logger.break();
    logger.info("Now you can add components:");
    logger.info("  glintkit add 3d-card");
    logger.info("  glintkit add --category 3d");
    logger.info("  glintkit add --all");
    logger.break();
  });
