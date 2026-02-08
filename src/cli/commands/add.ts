import { Command } from "commander";
import prompts from "prompts";
import path from "path";
import ora from "ora";
import pc from "picocolors";
import { logger } from "../../utils/logger.js";
import { readConfig, configExists } from "../../utils/config.js";
import type { GlintUIConfig } from "../../utils/config.js";
import { REGISTRY, getComponent, getComponentsByCategory, getAllCategories } from "../../registry/components.js";
import type { RegistryComponent } from "../../registry/index.js";
import { detectPackageManager } from "../../utils/detect-pm.js";
import { installDependencies } from "../../utils/installer.js";
import { writeTemplateFile } from "../../utils/file-writer.js";
import { injectCSSPreset } from "../../utils/css-injector.js";
import { CSS_PRESETS } from "../../registry/css-presets.js";

function resolveAllDependencies(names: string[]): RegistryComponent[] {
  const resolved = new Map<string, RegistryComponent>();
  const queue = [...names];

  while (queue.length > 0) {
    const name = queue.shift()!;
    if (resolved.has(name)) continue;

    const comp = getComponent(name);
    if (!comp) {
      logger.warn(`Component "${name}" not found in registry. Skipping.`);
      continue;
    }

    resolved.set(name, comp);

    for (const dep of comp.registryDependencies) {
      if (!resolved.has(dep)) {
        queue.push(dep);
      }
    }
  }

  return Array.from(resolved.values());
}

function resolveTargetDir(config: GlintUIConfig, fileType: string, cwd: string): string {
  // Map file types to config aliases, then resolve to filesystem paths
  const aliasMap: Record<string, string> = {
    component: config.aliases.components,
    hook: config.aliases.hooks,
    util: config.aliases.utils,
  };

  const alias = aliasMap[fileType];
  if (!alias) return path.join(cwd, "src", "components", "ui");

  // Convert alias like @/components/ui to actual path
  // Remove alias prefix (e.g., @/) and prepend src/
  const match = alias.match(/^@\/(.*)/);
  if (match) {
    return path.join(cwd, "src", match[1]);
  }

  // Handle ~/... or other patterns
  const match2 = alias.match(/^~\/(.*)/);
  if (match2) {
    return path.join(cwd, match2[1]);
  }

  // Fallback: treat as relative path
  return path.join(cwd, alias);
}

export const addCommand = new Command("add")
  .description("Add components to your project")
  .argument("[components...]", "Component names to add")
  .option("-c, --category <category>", "Add all components in a category")
  .option("-a, --all", "Add all components")
  .option("-y, --yes", "Skip confirmation prompt")
  .option("--overwrite", "Overwrite existing files")
  .action(async (componentNames: string[], options) => {
    const cwd = process.cwd();

    // Ensure config exists
    if (!configExists(cwd)) {
      logger.warn("glint-ui.json not found. Running init first...");
      const { execSync } = await import("child_process");
      execSync("npx glint-ui init -y", { cwd, stdio: "inherit" });
    }

    const config = readConfig(cwd);

    // Determine which components to add
    let requestedNames: string[] = [];

    if (options.all) {
      requestedNames = REGISTRY.map((c) => c.name);
    } else if (options.category) {
      const cats = options.category.split(",");
      for (const cat of cats) {
        const comps = getComponentsByCategory(cat.trim() as any);
        requestedNames.push(...comps.map((c) => c.name));
      }
      if (requestedNames.length === 0) {
        logger.error(`No components found in category "${options.category}"`);
        logger.info(`Available categories: ${getAllCategories().join(", ")}`);
        process.exit(1);
      }
    } else if (componentNames.length > 0) {
      requestedNames = componentNames;
    } else {
      // Interactive selection
      const response = await prompts({
        type: "multiselect",
        name: "components",
        message: "Select components to add:",
        choices: REGISTRY.map((c) => ({
          title: `${c.name} ${pc.dim(`(${c.category})`)}`,
          value: c.name,
          description: c.description,
        })),
      });

      if (!response.components || response.components.length === 0) {
        logger.error("No components selected.");
        process.exit(1);
      }
      requestedNames = response.components;
    }

    // Validate requested names
    for (const name of requestedNames) {
      if (!getComponent(name)) {
        logger.error(`Component "${name}" not found.`);
        logger.info("Run `glint-ui list` to see available components.");
        process.exit(1);
      }
    }

    // Resolve all dependencies
    const allComponents = resolveAllDependencies(requestedNames);

    // Collect npm dependencies (deduplicated)
    const npmDeps = [...new Set(allComponents.flatMap((c) => c.npmDependencies))];

    // Collect CSS presets (deduplicated)
    const cssPresets = [...new Set(allComponents.flatMap((c) => c.cssPresets))];

    // Show summary
    logger.title("\n  Components to install:\n");
    for (const comp of allComponents) {
      const isRequested = requestedNames.includes(comp.name);
      const marker = isRequested ? pc.green("●") : pc.dim("○");
      console.log(`    ${marker} ${comp.name} ${!isRequested ? pc.dim("(dependency)") : ""}`);
    }

    if (npmDeps.length > 0) {
      logger.break();
      logger.info(`npm dependencies: ${npmDeps.join(", ")}`);
    }
    if (cssPresets.length > 0) {
      logger.info(`CSS presets: ${cssPresets.join(", ")}`);
    }

    // Confirmation
    if (!options.yes) {
      logger.break();
      const confirm = await prompts({
        type: "confirm",
        name: "proceed",
        message: "Proceed with installation?",
        initial: true,
      });

      if (!confirm.proceed) {
        logger.error("Cancelled.");
        process.exit(0);
      }
    }

    // Install components
    const spinner = ora("Installing components...").start();

    let filesWritten = 0;
    let filesSkipped = 0;

    for (const comp of allComponents) {
      for (const file of comp.files) {
        const targetDir = resolveTargetDir(config, file.type, cwd);
        const result = writeTemplateFile({
          templateKey: file.templateKey,
          targetDir,
          fileName: file.fileName,
          config,
          overwrite: options.overwrite ?? false,
        });

        if (result.written) {
          filesWritten++;
        } else {
          filesSkipped++;
        }
      }
    }

    spinner.succeed(`${filesWritten} file(s) written${filesSkipped > 0 ? `, ${filesSkipped} skipped (already exist)` : ""}`);

    // Install npm dependencies
    if (npmDeps.length > 0) {
      const pmSpinner = ora("Installing npm dependencies...").start();
      try {
        const pm = detectPackageManager(cwd);
        installDependencies(npmDeps, pm, cwd);
        pmSpinner.succeed(`Installed: ${npmDeps.join(", ")}`);
      } catch (error) {
        pmSpinner.fail(`Failed to install dependencies: ${(error as Error).message}`);
        logger.info(`You can manually install: ${npmDeps.join(" ")}`);
      }
    }

    // Inject CSS presets
    if (cssPresets.length > 0) {
      const cssSpinner = ora("Injecting CSS presets...").start();
      const cssPath = path.join(cwd, config.tailwind.css);

      for (const presetName of cssPresets) {
        const presetContent = CSS_PRESETS[presetName];
        if (presetContent) {
          injectCSSPreset(cssPath, presetName, presetContent);
        } else {
          logger.warn(`CSS preset "${presetName}" not found.`);
        }
      }

      cssSpinner.succeed(`Injected ${cssPresets.length} CSS preset(s)`);
    }

    logger.break();
    logger.success("Done! Components are ready to use.");
    if (filesSkipped > 0) {
      logger.info(`Use --overwrite to replace existing files.`);
    }
    logger.break();
  });
