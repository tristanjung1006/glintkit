import { Command } from "commander";
import pc from "picocolors";
import { REGISTRY, getAllCategories, getComponentsByCategory } from "../../registry/components.js";
import { logger } from "../../utils/logger.js";

export const listCommand = new Command("list")
  .description("List all available components")
  .option("-c, --category <category>", "Filter by category")
  .action((options) => {
    logger.title("\n  glint-ui components\n");

    const categories = options.category
      ? [options.category]
      : getAllCategories();

    for (const category of categories) {
      const components = getComponentsByCategory(category as any);
      if (components.length === 0) continue;

      console.log(pc.bold(pc.yellow(`  ${category.toUpperCase()}`)));
      for (const comp of components) {
        const deps = comp.npmDependencies.length > 0
          ? pc.dim(` (${comp.npmDependencies.join(", ")})`)
          : "";
        console.log(`    ${pc.green(comp.name)}${deps}`);
        console.log(`      ${pc.dim(comp.description)}`);
      }
      console.log();
    }

    console.log(pc.dim(`  Total: ${REGISTRY.length} components\n`));
  });
