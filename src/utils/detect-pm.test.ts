import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "fs-extra";
import path from "path";
import os from "os";
import { detectPackageManager } from "./detect-pm.js";

describe("detect-pm.ts", () => {
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

  it("should return npm when no lockfile", () => {
    expect(detectPackageManager(testDir)).toBe("npm");
  });

  it("should return bun when bun.lockb exists", () => {
    fs.writeFileSync(path.join(testDir, "bun.lockb"), "");
    expect(detectPackageManager(testDir)).toBe("bun");
  });

  it("should return bun when bun.lock exists", () => {
    fs.writeFileSync(path.join(testDir, "bun.lock"), "");
    expect(detectPackageManager(testDir)).toBe("bun");
  });

  it("should return pnpm when pnpm-lock.yaml exists", () => {
    fs.writeFileSync(path.join(testDir, "pnpm-lock.yaml"), "");
    expect(detectPackageManager(testDir)).toBe("pnpm");
  });

  it("should return yarn when yarn.lock exists", () => {
    fs.writeFileSync(path.join(testDir, "yarn.lock"), "");
    expect(detectPackageManager(testDir)).toBe("yarn");
  });

  it("should return npm when package-lock.json exists", () => {
    fs.writeFileSync(path.join(testDir, "package-lock.json"), "");
    expect(detectPackageManager(testDir)).toBe("npm");
  });

  it("should prioritize bun over other lockfiles", () => {
    fs.writeFileSync(path.join(testDir, "bun.lockb"), "");
    fs.writeFileSync(path.join(testDir, "yarn.lock"), "");
    fs.writeFileSync(path.join(testDir, "pnpm-lock.yaml"), "");
    expect(detectPackageManager(testDir)).toBe("bun");
  });

  it("should prioritize pnpm over yarn", () => {
    fs.writeFileSync(path.join(testDir, "pnpm-lock.yaml"), "");
    fs.writeFileSync(path.join(testDir, "yarn.lock"), "");
    expect(detectPackageManager(testDir)).toBe("pnpm");
  });

  it("should prioritize yarn over npm", () => {
    fs.writeFileSync(path.join(testDir, "yarn.lock"), "");
    fs.writeFileSync(path.join(testDir, "package-lock.json"), "");
    expect(detectPackageManager(testDir)).toBe("yarn");
  });
});
