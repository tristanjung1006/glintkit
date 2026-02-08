<div align="center">

# glint-ui

**Add beautiful 3D, glass, and motion UI components to your project.**

Like [shadcn/ui](https://ui.shadcn.com), but for WebGL effects, glassmorphism, and motion.
Copy-paste components you own — no runtime dependency, no lock-in.

[![npm version](https://img.shields.io/npm/v/glint-ui.svg)](https://www.npmjs.com/package/glint-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/tristanjung1006/glint-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/tristanjung1006/glint-ui/actions/workflows/ci.yml)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](https://nodejs.org)

</div>

---

## Why glint-ui?

Most UI libraries give you basic buttons and inputs. **glint-ui** gives you the components that make users say *"wow"*:

- **Holographic cards** with rainbow shine that follows your cursor
- **WebGL prismatic bursts** with real-time light refraction
- **Glass surfaces** with SVG-based distortion effects
- **3D tilt cards** with depth layers and touch support
- **Cyberpunk counters** with matrix-style scramble animations

All as copy-paste React components powered by Tailwind CSS.

## Quick Start

```bash
npx glint-ui init
npx glint-ui add 3d-card
```

That's it. The component is now in your project — you own it completely.

## How It Works

```
npx glint-ui init          # 1. Creates glint-ui.json config
npx glint-ui add holo-card # 2. Copies component + installs deps + injects CSS
                           # 3. Import and use — it's your code now
```

glint-ui detects your project setup automatically:
- **Package manager** — npm, pnpm, yarn, or bun
- **Path aliases** — reads from your `tsconfig.json`
- **CSS file** — injects presets with idempotent markers

## Components

### 3D — `glint-ui add --category 3d`

| Component | Description | Dependencies |
|-----------|-------------|--------------|
| `3d-card` | 3D tilt card with mouse/touch tracking and depth layers | — |
| `prismatic-burst` | WebGL prismatic light effect with customizable colors | `ogl` |
| `glass-surface` | SVG-based glass refraction and distortion surface | — |
| `dome-gallery` | 3D dome/sphere photo gallery with drag and inertia | `@use-gesture/react` |
| `holo-card` | Holographic card with rainbow shine and flip animation | — |
| `flip-card` | 3D flip card with tilt effect and customizable content | — |

### Glass — `glint-ui add --category glass`

| Component | Description | Dependencies |
|-----------|-------------|--------------|
| `button` | Multi-variant button with glow border, gradient, glass styles | `clsx`, `tailwind-merge` |
| `card` | Glass card with default, strong, gradient, outline variants | `clsx`, `tailwind-merge` |
| `modal` | Modal dialog with glass backdrop and portal rendering | — |
| `music-player` | Audio player with soundwave visualization | — |

### Motion — `glint-ui add --category motion`

| Component | Description | Dependencies |
|-----------|-------------|--------------|
| `counter` | Cyberpunk scramble counter with matrix-style animation | — |
| `countdown-timer` | Countdown timer with multiple visual states | — |
| `shiny-text` | Animated shiny/glossy text with sweep direction | `motion` |
| `light-rays` | WebGL volumetric light rays from configurable origin | `ogl` |

### Hooks — `glint-ui add --category hooks`

| Hook | Description |
|------|-------------|
| `use-countdown` | Countdown timer (days, hours, minutes, seconds) |
| `use-scroll-animation` | IntersectionObserver-based scroll trigger |
| `use-media-query` | Responsive breakpoint detection with helpers |

### Utils — `glint-ui add --category utils`

| Utility | Description |
|---------|-------------|
| `cn` | Tailwind CSS class merge (`clsx` + `tailwind-merge`) |

## CLI Reference

```bash
# Initialize configuration
glint-ui init              # Interactive setup
glint-ui init -y           # Accept defaults

# Add components
glint-ui add 3d-card       # Single component
glint-ui add 3d-card modal # Multiple components
glint-ui add -c 3d         # Entire category
glint-ui add -c 3d,glass   # Multiple categories
glint-ui add --all         # Everything
glint-ui add --overwrite   # Replace existing files

# Browse components
glint-ui list              # All components
glint-ui list -c motion    # Filter by category
```

## Configuration

`glint-ui init` creates `glint-ui.json`:

```json
{
  "aliases": {
    "components": "@/components/ui",
    "hooks": "@/hooks",
    "utils": "@/lib"
  },
  "tailwind": {
    "css": "src/app/globals.css"
  }
}
```

### Alias Resolution

glint-ui reads your `tsconfig.json` to auto-detect path aliases:

| tsconfig paths | Detected prefix |
|---------------|-----------------|
| `"@/*": ["./src/*"]` | `@` |
| `"~/*": ["./src/*"]` | `~` |
| *(none)* | `@` (default) |

## Architecture

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  CLI Layer   │────▶│   Registry   │────▶│  Templates   │
│  (commander) │     │  (metadata)  │     │  (bundled)   │
└──────┬───────┘     └──────────────┘     └──────┬───────┘
       │                                         │
       ▼                                         ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Config Mgmt  │     │  CSS Inject  │     │ File Writer  │
│ (glint.json) │     │  (markers)   │     │ (aliases)    │
└──────────────┘     └──────────────┘     └──────────────┘
```

## Requirements

- **Node.js** >= 18
- **React** >= 18
- **Tailwind CSS** v3 or v4
- **TypeScript** (recommended)

## Comparison

| Feature | glint-ui | Traditional UI Libraries |
|---------|----------|------------------------|
| Distribution | CLI copy-paste | npm import |
| Ownership | You own the code | Library dependency |
| Customization | Edit directly | Theme/props only |
| Bundle size | Only what you use | Entire library |
| Styling | Tailwind CSS | Library-specific |
| Lock-in | None | Version coupling |

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development setup and guidelines.

## License

[MIT](./LICENSE) — use it however you want.
