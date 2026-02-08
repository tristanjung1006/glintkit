import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "fs-extra";
import path from "path";
import os from "os";
import {
  getConfigPath,
  configExists,
  readConfig,
  writeConfig,
  detectAliasFromTsconfig,
  type GlintUIConfig,
} from "./config.js";

describe("config.ts", () => {
  let testDir: string;

  beforeEach(() => {
    testDir = path.join(os.tmpdir(), `glintkit-test-${Date.now()}-${Math.random().toString(36).substring(7)}`);
    fs.ensureDirSync(testDir);
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.removeSync(testDir);
    }
  });

  describe("getConfigPath", () => {
    it("should return correct path", () => {
      const configPath = getConfigPath(testDir);
      expect(configPath).toBe(path.join(testDir, "glintkit.json"));
    });
  });

  describe("configExists", () => {
    it("should return false when no config", () => {
      expect(configExists(testDir)).toBe(false);
    });

    it("should return true when config exists", () => {
      const configPath = path.join(testDir, "glintkit.json");
      fs.writeJSONSync(configPath, { test: "data" });
      expect(configExists(testDir)).toBe(true);
    });
  });

  describe("writeConfig", () => {
    it("should create valid JSON", () => {
      const config: GlintUIConfig = {
        aliases: {
          components: "@/components",
          hooks: "@/hooks",
          utils: "@/lib",
        },
        tailwind: {
          css: "src/app/globals.css",
        },
      };

      writeConfig(config, testDir);

      const configPath = path.join(testDir, "glintkit.json");
      expect(fs.existsSync(configPath)).toBe(true);

      const written = fs.readJSONSync(configPath);
      expect(written).toEqual(config);
    });
  });

  describe("readConfig", () => {
    it("should read written config correctly", () => {
      const config: GlintUIConfig = {
        aliases: {
          components: "@/components",
          hooks: "@/hooks",
          utils: "@/lib",
        },
        tailwind: {
          css: "src/app/globals.css",
        },
      };

      writeConfig(config, testDir);
      const read = readConfig(testDir);

      expect(read).toEqual(config);
    });

    it("should throw when no config exists", () => {
      expect(() => readConfig(testDir)).toThrow();
      expect(() => readConfig(testDir)).toThrow("glintkit.json");
    });
  });

  describe("detectAliasFromTsconfig", () => {
    it("should return null when no tsconfig", () => {
      expect(detectAliasFromTsconfig(testDir)).toBeNull();
    });

    it("should return @ when tsconfig has @/* path", () => {
      const tsconfig = {
        compilerOptions: {
          paths: {
            "@/*": ["./src/*"],
          },
        },
      };

      fs.writeJSONSync(path.join(testDir, "tsconfig.json"), tsconfig);
      expect(detectAliasFromTsconfig(testDir)).toBe("@");
    });

    it("should return ~ when tsconfig has ~/* path", () => {
      const tsconfig = {
        compilerOptions: {
          paths: {
            "~/*": ["./src/*"],
          },
        },
      };

      fs.writeJSONSync(path.join(testDir, "tsconfig.json"), tsconfig);
      expect(detectAliasFromTsconfig(testDir)).toBe("~");
    });

    it("should handle tsconfig with comments", () => {
      const tsconfigWithComments = `{
  // This is a comment
  "compilerOptions": {
    /* Block comment */
    "paths": {
      "@/*": ["./src/*"] // trailing comment
    }
  }
}`;

      fs.writeFileSync(path.join(testDir, "tsconfig.json"), tsconfigWithComments, "utf-8");
      expect(detectAliasFromTsconfig(testDir)).toBe("@");
    });

    it("should return null when tsconfig has no paths", () => {
      const tsconfig = {
        compilerOptions: {
          strict: true,
        },
      };

      fs.writeJSONSync(path.join(testDir, "tsconfig.json"), tsconfig);
      expect(detectAliasFromTsconfig(testDir)).toBeNull();
    });

    it("should handle invalid JSON gracefully", () => {
      fs.writeFileSync(path.join(testDir, "tsconfig.json"), "{ invalid json }", "utf-8");
      expect(detectAliasFromTsconfig(testDir)).toBeNull();
    });

    it("should detect first path pattern", () => {
      const tsconfig = {
        compilerOptions: {
          paths: {
            "$lib/*": ["./src/lib/*"],
            "@/*": ["./src/*"],
          },
        },
      };

      fs.writeJSONSync(path.join(testDir, "tsconfig.json"), tsconfig);
      const result = detectAliasFromTsconfig(testDir);
      expect(result).toMatch(/^\$lib$|^@$/);
    });
  });
});
