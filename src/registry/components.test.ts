import { describe, it, expect } from "vitest";
import { REGISTRY, getComponent, getComponentsByCategory, getAllCategories } from "./components.js";

describe("components.ts", () => {
  describe("REGISTRY", () => {
    it("should have 18 components", () => {
      expect(REGISTRY).toHaveLength(18);
    });

    it("should ensure every component has required fields", () => {
      REGISTRY.forEach((component) => {
        expect(component.name).toBeTruthy();
        expect(component.category).toBeTruthy();
        expect(component.description).toBeTruthy();
        expect(Array.isArray(component.files)).toBe(true);
        expect(Array.isArray(component.npmDependencies)).toBe(true);
        expect(Array.isArray(component.registryDependencies)).toBe(true);
        expect(Array.isArray(component.cssPresets)).toBe(true);
      });
    });

    it("should ensure every component.files entry has required properties", () => {
      REGISTRY.forEach((component) => {
        component.files.forEach((file) => {
          expect(file.templateKey).toBeTruthy();
          expect(file.fileName).toBeTruthy();
          expect(file.type).toBeTruthy();
          expect(["component", "hook", "util"]).toContain(file.type);
        });
      });
    });

    it("should not have duplicate component names", () => {
      const names = REGISTRY.map((c) => c.name);
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(names.length);
    });

    it("should ensure all registryDependencies reference existing components", () => {
      const allNames = new Set(REGISTRY.map((c) => c.name));

      REGISTRY.forEach((component) => {
        component.registryDependencies.forEach((dep) => {
          expect(allNames.has(dep)).toBe(true);
        });
      });
    });
  });

  describe("getComponent", () => {
    it("should return component by name", () => {
      const card = getComponent("3d-card");
      expect(card).toBeDefined();
      expect(card?.name).toBe("3d-card");
      expect(card?.category).toBe("3d");
    });

    it("should return undefined for unknown name", () => {
      const unknown = getComponent("nonexistent-component");
      expect(unknown).toBeUndefined();
    });

    it("should return correct component for each registry entry", () => {
      REGISTRY.forEach((component) => {
        const found = getComponent(component.name);
        expect(found).toEqual(component);
      });
    });
  });

  describe("getComponentsByCategory", () => {
    it("should return correct components for 3d category", () => {
      const components = getComponentsByCategory("3d");
      expect(components).toHaveLength(6);
      expect(components.every((c) => c.category === "3d")).toBe(true);

      const names = components.map((c) => c.name);
      expect(names).toContain("3d-card");
      expect(names).toContain("prismatic-burst");
      expect(names).toContain("glass-surface");
      expect(names).toContain("dome-gallery");
      expect(names).toContain("holo-card");
      expect(names).toContain("flip-card");
    });

    it("should return correct components for glass category", () => {
      const components = getComponentsByCategory("glass");
      expect(components).toHaveLength(4);
      expect(components.every((c) => c.category === "glass")).toBe(true);

      const names = components.map((c) => c.name);
      expect(names).toContain("button");
      expect(names).toContain("card");
      expect(names).toContain("modal");
      expect(names).toContain("music-player");
    });

    it("should return correct components for motion category", () => {
      const components = getComponentsByCategory("motion");
      expect(components).toHaveLength(4);
      expect(components.every((c) => c.category === "motion")).toBe(true);

      const names = components.map((c) => c.name);
      expect(names).toContain("counter");
      expect(names).toContain("countdown-timer");
      expect(names).toContain("shiny-text");
      expect(names).toContain("light-rays");
    });

    it("should return correct components for hooks category", () => {
      const components = getComponentsByCategory("hooks");
      expect(components).toHaveLength(3);
      expect(components.every((c) => c.category === "hooks")).toBe(true);

      const names = components.map((c) => c.name);
      expect(names).toContain("use-countdown");
      expect(names).toContain("use-scroll-animation");
      expect(names).toContain("use-media-query");
    });

    it("should return correct components for utils category", () => {
      const components = getComponentsByCategory("utils");
      expect(components).toHaveLength(1);
      expect(components.every((c) => c.category === "utils")).toBe(true);

      const names = components.map((c) => c.name);
      expect(names).toContain("cn");
    });

    it("should return empty array for unknown category", () => {
      // @ts-expect-error - testing invalid category
      const components = getComponentsByCategory("nonexistent");
      expect(components).toHaveLength(0);
    });
  });

  describe("getAllCategories", () => {
    it("should return all unique categories", () => {
      const categories = getAllCategories();
      expect(categories).toHaveLength(5);
      expect(categories).toContain("3d");
      expect(categories).toContain("motion");
      expect(categories).toContain("glass");
      expect(categories).toContain("hooks");
      expect(categories).toContain("utils");
    });

    it("should not have duplicate categories", () => {
      const categories = getAllCategories();
      const uniqueCategories = new Set(categories);
      expect(uniqueCategories.size).toBe(categories.length);
    });
  });

  describe("component structure validation", () => {
    it("should have correct 3d-card structure", () => {
      const card = getComponent("3d-card");
      expect(card?.files).toHaveLength(1);
      expect(card?.files[0].templateKey).toBe("components/3d/3d-card");
      expect(card?.files[0].fileName).toBe("3d-card.tsx");
      expect(card?.files[0].type).toBe("component");
      expect(card?.npmDependencies).toEqual([]);
      expect(card?.registryDependencies).toContain("cn");
    });

    it("should have correct prismatic-burst structure", () => {
      const burst = getComponent("prismatic-burst");
      expect(burst?.npmDependencies).toContain("ogl");
      expect(burst?.registryDependencies).toEqual([]);
    });

    it("should have correct button structure", () => {
      const button = getComponent("button");
      expect(button?.npmDependencies).toContain("clsx");
      expect(button?.npmDependencies).toContain("tailwind-merge");
      expect(button?.registryDependencies).toContain("cn");
      expect(button?.cssPresets).toContain("glow-border");
    });

    it("should have correct countdown-timer structure", () => {
      const timer = getComponent("countdown-timer");
      expect(timer?.registryDependencies).toContain("use-countdown");
      expect(timer?.cssPresets).toContain("glass");
      expect(timer?.cssPresets).toContain("gradient-text");
      expect(timer?.cssPresets).toContain("animations");
    });

    it("should have correct flip-card structure", () => {
      const flipCard = getComponent("flip-card");
      expect(flipCard?.registryDependencies).toContain("cn");
      expect(flipCard?.registryDependencies).toContain("3d-card");
    });
  });
});
