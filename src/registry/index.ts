export type ComponentCategory = "3d" | "motion" | "glass" | "hooks" | "utils";
export type FileType = "component" | "hook" | "util";

export interface RegistryFile {
  /** Key in TEMPLATES map */
  templateKey: string;
  /** Output file name */
  fileName: string;
  /** Where to write: components | hooks | utils */
  type: FileType;
}

export interface RegistryComponent {
  name: string;
  category: ComponentCategory;
  description: string;
  files: RegistryFile[];
  /** npm packages to install */
  npmDependencies: string[];
  /** Other registry component names that must be installed first */
  registryDependencies: string[];
  /** CSS preset names to inject */
  cssPresets: string[];
}

export interface CSSPreset {
  name: string;
  content: string;
}
