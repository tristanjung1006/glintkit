import fs from "fs-extra";
import path from "path";
import type { GlintUIConfig } from "./config.js";
import { TEMPLATES } from "../registry/__generated__/templates.js";

type AliasType = "components" | "hooks" | "utils";

const ALIAS_MAP: Record<string, AliasType> = {
  __COMPONENTS_ALIAS__: "components",
  __HOOKS_ALIAS__: "hooks",
  __UTILS_ALIAS__: "utils",
};

export function replaceAliases(content: string, config: GlintUIConfig): string {
  let result = content;
  for (const [placeholder, key] of Object.entries(ALIAS_MAP)) {
    result = result.replaceAll(placeholder, config.aliases[key]);
  }
  return result;
}

export interface WriteFileOptions {
  templateKey: string;
  targetDir: string;
  fileName: string;
  config: GlintUIConfig;
  overwrite?: boolean;
}

export function writeTemplateFile(options: WriteFileOptions): { written: boolean; path: string } {
  const { templateKey, targetDir, fileName, config, overwrite = false } = options;
  const template = TEMPLATES[templateKey];
  if (!template) {
    throw new Error(`Template not found: ${templateKey}`);
  }

  const targetPath = path.join(targetDir, fileName);

  if (fs.existsSync(targetPath) && !overwrite) {
    return { written: false, path: targetPath };
  }

  fs.ensureDirSync(targetDir);
  const content = replaceAliases(template, config);
  fs.writeFileSync(targetPath, content, "utf-8");
  return { written: true, path: targetPath };
}
