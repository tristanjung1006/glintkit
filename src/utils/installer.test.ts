import { describe, it, expect, beforeEach, vi } from "vitest";
import { execSync } from "child_process";
import { installDependencies } from "./installer.js";

// Mock child_process
vi.mock("child_process", () => ({
  execSync: vi.fn(),
}));

// Mock logger to suppress console output during tests
vi.mock("./logger.js", () => ({
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    success: vi.fn(),
  },
}));

describe("installer.ts", () => {
  const mockExecSync = vi.mocked(execSync);

  beforeEach(() => {
    mockExecSync.mockClear();
    mockExecSync.mockReturnValue(Buffer.from(""));
  });

  it("should do nothing when deps array is empty", () => {
    installDependencies([], "npm", "/test/cwd");
    expect(mockExecSync).not.toHaveBeenCalled();
  });

  it("should call execSync with npm install command", () => {
    installDependencies(["react", "react-dom"], "npm", "/test/cwd");

    expect(mockExecSync).toHaveBeenCalledWith("npm install react react-dom", {
      cwd: "/test/cwd",
      stdio: "pipe",
    });
  });

  it("should call execSync with pnpm add command", () => {
    installDependencies(["lodash", "axios"], "pnpm", "/test/cwd");

    expect(mockExecSync).toHaveBeenCalledWith("pnpm add lodash axios", {
      cwd: "/test/cwd",
      stdio: "pipe",
    });
  });

  it("should call execSync with yarn add command", () => {
    installDependencies(["express"], "yarn", "/test/cwd");

    expect(mockExecSync).toHaveBeenCalledWith("yarn add express", {
      cwd: "/test/cwd",
      stdio: "pipe",
    });
  });

  it("should call execSync with bun add command", () => {
    installDependencies(["typescript", "@types/node"], "bun", "/test/cwd");

    expect(mockExecSync).toHaveBeenCalledWith("bun add typescript @types/node", {
      cwd: "/test/cwd",
      stdio: "pipe",
    });
  });

  it("should pass cwd option to execSync", () => {
    const testCwd = "/custom/project/path";
    installDependencies(["package"], "npm", testCwd);

    expect(mockExecSync).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        cwd: testCwd,
      })
    );
  });

  it("should throw error when execSync fails", () => {
    mockExecSync.mockImplementation(() => {
      throw new Error("Command failed: npm install");
    });

    expect(() => installDependencies(["react"], "npm", "/test/cwd")).toThrow(
      "Failed to install dependencies"
    );
  });

  it("should handle single dependency", () => {
    installDependencies(["single-package"], "npm", "/test/cwd");

    expect(mockExecSync).toHaveBeenCalledWith("npm install single-package", {
      cwd: "/test/cwd",
      stdio: "pipe",
    });
  });

  it("should handle multiple dependencies", () => {
    const deps = ["pkg1", "pkg2", "pkg3", "pkg4", "pkg5"];
    installDependencies(deps, "pnpm", "/test/cwd");

    expect(mockExecSync).toHaveBeenCalledWith("pnpm add pkg1 pkg2 pkg3 pkg4 pkg5", {
      cwd: "/test/cwd",
      stdio: "pipe",
    });
  });

  it("should handle scoped packages", () => {
    installDependencies(["@types/react", "@testing-library/react"], "npm", "/test/cwd");

    expect(mockExecSync).toHaveBeenCalledWith("npm install @types/react @testing-library/react", {
      cwd: "/test/cwd",
      stdio: "pipe",
    });
  });

  it("should use stdio: pipe to suppress output", () => {
    installDependencies(["package"], "npm", "/test/cwd");

    expect(mockExecSync).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        stdio: "pipe",
      })
    );
  });

  it("should use process.cwd() as default when cwd not provided", () => {
    const originalCwd = process.cwd();
    installDependencies(["package"], "npm");

    expect(mockExecSync).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        cwd: originalCwd,
      })
    );
  });
});
