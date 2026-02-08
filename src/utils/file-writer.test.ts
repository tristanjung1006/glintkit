import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import fs from "fs-extra";
import path from "path";
import os from "os";
import { replaceAliases, writeTemplateFile, type WriteFileOptions } from "./file-writer.js";
import type { GlintUIConfig } from "./config.js";

// Mock the TEMPLATES import
vi.mock("../registry/__generated__/templates.js", () => ({
  TEMPLATES: {
    "components/test": 'import { cn } from "__UTILS_ALIAS__/cn";\nexport function Test() { return <div />; }',
    "hooks/test-hook": 'import { useEffect } from "react";\nexport function useTest() {}',
    "components/with-all-aliases":
      'import { cn } from "__UTILS_ALIAS__/cn";\nimport { TestComponent } from "__COMPONENTS_ALIAS__/test";\nimport { useTest } from "__HOOKS_ALIAS__/use-test";',
  },
}));

describe("file-writer.ts", () => {
  let testDir: string;
  let config: GlintUIConfig;

  beforeEach(() => {
    testDir = path.join(os.tmpdir(), `glint-ui-test-${Date.now()}-${Math.random().toString(36).substring(7)}`);
    fs.ensureDirSync(testDir);
    config = {
      aliases: {
        components: "@/components",
        hooks: "@/hooks",
        utils: "@/lib",
      },
      tailwind: {
        css: "src/app/globals.css",
      },
    };
  });

  afterEach(() => {
    if (fs.existsSync(testDir)) {
      fs.removeSync(testDir);
    }
  });

  describe("replaceAliases", () => {
    it("should replace __COMPONENTS_ALIAS__ with config value", () => {
      const content = 'import { Test } from "__COMPONENTS_ALIAS__/test";';
      const result = replaceAliases(content, config);
      expect(result).toBe('import { Test } from "@/components/test";');
    });

    it("should replace __HOOKS_ALIAS__ with config value", () => {
      const content = 'import { useTest } from "__HOOKS_ALIAS__/use-test";';
      const result = replaceAliases(content, config);
      expect(result).toBe('import { useTest } from "@/hooks/use-test";');
    });

    it("should replace __UTILS_ALIAS__ with config value", () => {
      const content = 'import { cn } from "__UTILS_ALIAS__/cn";';
      const result = replaceAliases(content, config);
      expect(result).toBe('import { cn } from "@/lib/cn";');
    });

    it("should replace all three in one string", () => {
      const content =
        'import { cn } from "__UTILS_ALIAS__/cn";\nimport { Test } from "__COMPONENTS_ALIAS__/test";\nimport { useTest } from "__HOOKS_ALIAS__/use-test";';
      const result = replaceAliases(content, config);
      expect(result).toBe(
        'import { cn } from "@/lib/cn";\nimport { Test } from "@/components/test";\nimport { useTest } from "@/hooks/use-test";'
      );
    });

    it("should replace multiple occurrences of same alias", () => {
      const content = 'import { cn } from "__UTILS_ALIAS__/cn";\nimport { utils } from "__UTILS_ALIAS__/utils";';
      const result = replaceAliases(content, config);
      expect(result).toBe('import { cn } from "@/lib/cn";\nimport { utils } from "@/lib/utils";');
    });
  });

  describe("writeTemplateFile", () => {
    it("should create file in target dir", () => {
      const options: WriteFileOptions = {
        templateKey: "components/test",
        targetDir: testDir,
        fileName: "test.tsx",
        config,
      };

      const result = writeTemplateFile(options);

      expect(result.written).toBe(true);
      expect(fs.existsSync(result.path)).toBe(true);

      const content = fs.readFileSync(result.path, "utf-8");
      expect(content).toBe('import { cn } from "@/lib/cn";\nexport function Test() { return <div />; }');
    });

    it("should skip existing files when overwrite=false", () => {
      const options: WriteFileOptions = {
        templateKey: "components/test",
        targetDir: testDir,
        fileName: "test.tsx",
        config,
      };

      // Write original content
      const targetPath = path.join(testDir, "test.tsx");
      fs.writeFileSync(targetPath, "original content", "utf-8");

      const result = writeTemplateFile(options);

      expect(result.written).toBe(false);
      expect(fs.readFileSync(targetPath, "utf-8")).toBe("original content");
    });

    it("should overwrite existing files when overwrite=true", () => {
      const targetPath = path.join(testDir, "test.tsx");

      // Write original content first
      fs.writeFileSync(targetPath, "original content", "utf-8");
      expect(fs.existsSync(targetPath)).toBe(true);

      const options: WriteFileOptions = {
        templateKey: "components/test",
        targetDir: testDir,
        fileName: "test.tsx",
        config,
        overwrite: true,
      };

      const result = writeTemplateFile(options);

      expect(result.written).toBe(true);
      expect(result.path).toBe(targetPath);

      const content = fs.readFileSync(result.path, "utf-8");
      expect(content).not.toBe("original content");
      expect(content).toContain("import { cn }");
    });

    it("should throw when template key not found", () => {
      const options: WriteFileOptions = {
        templateKey: "components/nonexistent",
        targetDir: testDir,
        fileName: "test.tsx",
        config,
      };

      expect(() => writeTemplateFile(options)).toThrow("Template not found: components/nonexistent");
    });

    it("should create target directory if it doesn't exist", () => {
      const nestedDir = path.join(testDir, "nested", "deep", "dir");
      const options: WriteFileOptions = {
        templateKey: "components/test",
        targetDir: nestedDir,
        fileName: "test.tsx",
        config,
      };

      const result = writeTemplateFile(options);

      expect(result.written).toBe(true);
      expect(fs.existsSync(result.path)).toBe(true);
      expect(fs.existsSync(nestedDir)).toBe(true);
    });

    it("should replace all aliases in template", () => {
      const options: WriteFileOptions = {
        templateKey: "components/with-all-aliases",
        targetDir: testDir,
        fileName: "test.tsx",
        config,
      };

      const result = writeTemplateFile(options);
      const content = fs.readFileSync(result.path, "utf-8");

      expect(content).toContain('@/lib/cn');
      expect(content).toContain('@/components/test');
      expect(content).toContain('@/hooks/use-test');
      expect(content).not.toContain('__UTILS_ALIAS__');
      expect(content).not.toContain('__COMPONENTS_ALIAS__');
      expect(content).not.toContain('__HOOKS_ALIAS__');
    });
  });
});
