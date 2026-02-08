import fs from "fs-extra";
import { logger } from "./logger.js";

const MARKER_START = (name: string) => `/* glintkit:${name} - start */`;
const MARKER_END = (name: string) => `/* glintkit:${name} - end */`;

export function injectCSSPreset(
  cssFilePath: string,
  presetName: string,
  presetContent: string
): void {
  if (!fs.existsSync(cssFilePath)) {
    logger.warn(`CSS file not found: ${cssFilePath}. Skipping CSS injection.`);
    return;
  }

  let css = fs.readFileSync(cssFilePath, "utf-8");
  const startMarker = MARKER_START(presetName);
  const endMarker = MARKER_END(presetName);

  // Check if already injected
  if (css.includes(startMarker)) {
    // Replace existing preset
    const startIdx = css.indexOf(startMarker);
    const endIdx = css.indexOf(endMarker);
    if (endIdx !== -1) {
      css = css.slice(0, startIdx) + startMarker + "\n" + presetContent + "\n" + endMarker + css.slice(endIdx + endMarker.length);
      fs.writeFileSync(cssFilePath, css, "utf-8");
      return;
    }
  }

  // Append to end of file
  const block = `\n${startMarker}\n${presetContent}\n${endMarker}\n`;
  css += block;
  fs.writeFileSync(cssFilePath, css, "utf-8");
}
