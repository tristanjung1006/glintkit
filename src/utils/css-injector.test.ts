import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import fs from "fs-extra";
import path from "path";
import os from "os";
import { injectCSSPreset } from "./css-injector.js";

// Mock logger to suppress console output during tests
vi.mock("./logger.js", () => ({
  logger: {
    warn: vi.fn(),
    info: vi.fn(),
    error: vi.fn(),
    success: vi.fn(),
  },
}));

describe("css-injector.ts", () => {
  let testDir: string;
  let cssFilePath: string;

  beforeEach(() => {
    testDir = path.join(os.tmpdir(), `glint-ui-test-${Date.now()}-${Math.random().toString(36).substring(7)}`);
    fs.ensureDirSync(testDir);
    cssFilePath = path.join(testDir, "globals.css");
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.removeSync(testDir);
    }
  });

  it("should append preset to end of CSS file with markers", () => {
    const originalCSS = "@tailwind base;\n@tailwind components;\n@tailwind utilities;";
    fs.writeFileSync(cssFilePath, originalCSS, "utf-8");

    const presetContent = ".glass { background: rgba(255, 255, 255, 0.1); }";
    injectCSSPreset(cssFilePath, "glass", presetContent);

    const result = fs.readFileSync(cssFilePath, "utf-8");

    expect(result).toContain(originalCSS);
    expect(result).toContain("/* glint-ui:glass - start */");
    expect(result).toContain(presetContent);
    expect(result).toContain("/* glint-ui:glass - end */");
  });

  it("should use correct marker format", () => {
    fs.writeFileSync(cssFilePath, "", "utf-8");

    const presetContent = ".test { color: red; }";
    injectCSSPreset(cssFilePath, "test-preset", presetContent);

    const result = fs.readFileSync(cssFilePath, "utf-8");

    expect(result).toContain("/* glint-ui:test-preset - start */");
    expect(result).toContain("/* glint-ui:test-preset - end */");
  });

  it("should skip injection when CSS file doesn't exist", () => {
    const nonExistentPath = path.join(testDir, "nonexistent.css");

    // Should not throw
    expect(() => injectCSSPreset(nonExistentPath, "test", ".test {}")).not.toThrow();

    // File should still not exist
    expect(fs.existsSync(nonExistentPath)).toBe(false);
  });

  it("should replace existing preset when markers already present", () => {
    const originalCSS = `@tailwind base;
/* glint-ui:glass - start */
.glass { background: blue; }
/* glint-ui:glass - end */
@tailwind utilities;`;

    fs.writeFileSync(cssFilePath, originalCSS, "utf-8");

    const newPresetContent = ".glass { background: rgba(255, 255, 255, 0.1); }";
    injectCSSPreset(cssFilePath, "glass", newPresetContent);

    const result = fs.readFileSync(cssFilePath, "utf-8");

    expect(result).toContain(newPresetContent);
    expect(result).not.toContain("background: blue");
    expect(result).toContain("@tailwind base");
    expect(result).toContain("@tailwind utilities");

    // Should only have one set of markers
    const startMarkerCount = (result.match(/\/\* glint-ui:glass - start \*\//g) || []).length;
    const endMarkerCount = (result.match(/\/\* glint-ui:glass - end \*\//g) || []).length;
    expect(startMarkerCount).toBe(1);
    expect(endMarkerCount).toBe(1);
  });

  it("should allow multiple presets to coexist in same file", () => {
    fs.writeFileSync(cssFilePath, "@tailwind base;", "utf-8");

    injectCSSPreset(cssFilePath, "glass", ".glass { background: rgba(255, 255, 255, 0.1); }");
    injectCSSPreset(cssFilePath, "animations", "@keyframes fade { from { opacity: 0; } }");
    injectCSSPreset(cssFilePath, "glow", ".glow { box-shadow: 0 0 20px rgba(0, 255, 0, 0.5); }");

    const result = fs.readFileSync(cssFilePath, "utf-8");

    expect(result).toContain("/* glint-ui:glass - start */");
    expect(result).toContain("/* glint-ui:glass - end */");
    expect(result).toContain("/* glint-ui:animations - start */");
    expect(result).toContain("/* glint-ui:animations - end */");
    expect(result).toContain("/* glint-ui:glow - start */");
    expect(result).toContain("/* glint-ui:glow - end */");
    expect(result).toContain(".glass");
    expect(result).toContain("@keyframes fade");
    expect(result).toContain(".glow");
  });

  it("should preserve original CSS content", () => {
    const originalCSS = `@tailwind base;
@tailwind components;
@tailwind utilities;

.custom-class {
  color: red;
}

/* Custom comment */
.another-class {
  background: blue;
}`;

    fs.writeFileSync(cssFilePath, originalCSS, "utf-8");

    injectCSSPreset(cssFilePath, "glass", ".glass { backdrop-filter: blur(10px); }");

    const result = fs.readFileSync(cssFilePath, "utf-8");

    expect(result).toContain("@tailwind base");
    expect(result).toContain("@tailwind components");
    expect(result).toContain("@tailwind utilities");
    expect(result).toContain(".custom-class");
    expect(result).toContain("color: red");
    expect(result).toContain("/* Custom comment */");
    expect(result).toContain(".another-class");
    expect(result).toContain("background: blue");
  });

  it("should handle updating preset multiple times", () => {
    fs.writeFileSync(cssFilePath, "@tailwind base;", "utf-8");

    injectCSSPreset(cssFilePath, "test", ".test { color: red; }");
    injectCSSPreset(cssFilePath, "test", ".test { color: blue; }");
    injectCSSPreset(cssFilePath, "test", ".test { color: green; }");

    const result = fs.readFileSync(cssFilePath, "utf-8");

    expect(result).toContain("color: green");
    expect(result).not.toContain("color: red");
    expect(result).not.toContain("color: blue");

    // Should still only have one set of markers
    const startMarkerCount = (result.match(/\/\* glint-ui:test - start \*\//g) || []).length;
    const endMarkerCount = (result.match(/\/\* glint-ui:test - end \*\//g) || []).length;
    expect(startMarkerCount).toBe(1);
    expect(endMarkerCount).toBe(1);
  });
});
