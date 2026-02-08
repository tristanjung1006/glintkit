import fs from "fs-extra";
import path from "path";

export interface GlintUIConfig {
  aliases: {
    components: string;
    hooks: string;
    utils: string;
  };
  tailwind: {
    css: string;
  };
}

const CONFIG_FILE = "glint-ui.json";

export function getConfigPath(cwd: string = process.cwd()): string {
  return path.join(cwd, CONFIG_FILE);
}

export function configExists(cwd: string = process.cwd()): boolean {
  return fs.existsSync(getConfigPath(cwd));
}

export function readConfig(cwd: string = process.cwd()): GlintUIConfig {
  const configPath = getConfigPath(cwd);
  if (!fs.existsSync(configPath)) {
    throw new Error("glint-ui.json not found. Run `glint-ui init` first.");
  }
  return fs.readJSONSync(configPath) as GlintUIConfig;
}

export function writeConfig(config: GlintUIConfig, cwd: string = process.cwd()): void {
  fs.writeJSONSync(getConfigPath(cwd), config, { spaces: 2 });
}

export function detectAliasFromTsconfig(cwd: string = process.cwd()): string | null {
  const tsconfigPath = path.join(cwd, "tsconfig.json");
  if (!fs.existsSync(tsconfigPath)) return null;

  try {
    const raw = fs.readFileSync(tsconfigPath, "utf-8");
    // Remove comments for JSON parsing
    const cleaned = raw.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "");
    const tsconfig = JSON.parse(cleaned);
    const paths = tsconfig?.compilerOptions?.paths;
    if (!paths) return null;

    // Look for @/* pattern
    for (const [alias, targets] of Object.entries(paths)) {
      if (alias.endsWith("/*") && Array.isArray(targets) && targets.length > 0) {
        const prefix = alias.slice(0, -2); // Remove /*
        return prefix;
      }
    }
  } catch {
    // ignore parse errors
  }
  return null;
}
