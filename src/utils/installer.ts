import { execSync } from "child_process";
import type { PackageManager } from "./detect-pm.js";
import { logger } from "./logger.js";

export function installDependencies(
  deps: string[],
  pm: PackageManager,
  cwd: string = process.cwd()
): void {
  if (deps.length === 0) return;

  const commands: Record<PackageManager, string> = {
    npm: `npm install ${deps.join(" ")}`,
    pnpm: `pnpm add ${deps.join(" ")}`,
    yarn: `yarn add ${deps.join(" ")}`,
    bun: `bun add ${deps.join(" ")}`,
  };

  const cmd = commands[pm];
  logger.info(`Installing dependencies with ${pm}...`);

  try {
    execSync(cmd, { cwd, stdio: "pipe" });
  } catch (error) {
    throw new Error(`Failed to install dependencies: ${(error as Error).message}`);
  }
}
