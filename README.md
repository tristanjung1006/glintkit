<div align="center">

# glintkit

**Add beautiful 3D, glass, and motion UI components to your project.**

Like [shadcn/ui](https://ui.shadcn.com), but for WebGL effects, glassmorphism, and motion.
Copy-paste components you own — no runtime dependency, no lock-in.

[![npm version](https://img.shields.io/npm/v/glintkit.svg)](https://www.npmjs.com/package/glintkit)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/tristanjung1006/glintkit/actions/workflows/ci.yml/badge.svg)](https://github.com/tristanjung1006/glintkit/actions/workflows/ci.yml)
[![Storybook](https://img.shields.io/badge/Storybook-Live_Demo-FF4785?logo=storybook&logoColor=white)](https://tristanjung1006.github.io/glintkit/)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen.svg)](https://nodejs.org)

</div>

---

## Component Showcase

> **[View Live Storybook Demo →](https://tristanjung1006.github.io/glintkit/)**

<table>
<tr>
<td align="center" width="33%">
<strong>3D Card</strong><br/>
<sub>Mouse/touch tracking with depth layers</sub>
</td>
<td align="center" width="33%">
<strong>Holo Card</strong><br/>
<sub>Holographic rainbow shine effect</sub>
</td>
<td align="center" width="33%">
<strong>Glass Surface</strong><br/>
<sub>SVG-based refraction distortion</sub>
</td>
</tr>
<tr>
<td align="center" width="33%">
<strong>Prismatic Burst</strong><br/>
<sub>WebGL prismatic light refraction</sub>
</td>
<td align="center" width="33%">
<strong>Dome Gallery</strong><br/>
<sub>3D sphere photo gallery with drag</sub>
</td>
<td align="center" width="33%">
<strong>Flip Card</strong><br/>
<sub>3D flip with tilt effect</sub>
</td>
</tr>
<tr>
<td align="center" width="33%">
<strong>Glass Button</strong><br/>
<sub>Multi-variant glassmorphism button</sub>
</td>
<td align="center" width="33%">
<strong>Counter</strong><br/>
<sub>Cyberpunk scramble animation</sub>
</td>
<td align="center" width="33%">
<strong>Music Player</strong><br/>
<sub>Audio player with soundwave viz</sub>
</td>
</tr>
</table>

## Why glintkit?

Most UI libraries give you basic buttons and inputs. **glintkit** gives you the components that make users say *"wow"*:

- **Holographic cards** with rainbow shine that follows your cursor
- **WebGL prismatic bursts** with real-time light refraction
- **Glass surfaces** with SVG-based distortion effects
- **3D tilt cards** with depth layers and touch support
- **Cyberpunk counters** with matrix-style scramble animations

All as copy-paste React components powered by Tailwind CSS.

## Quick Start

```bash
npx glintkit init
npx glintkit add 3d-card
```

That's it. The component is now in your project — you own it completely.

## How It Works

```
npx glintkit init          # 1. Creates glintkit.json config
npx glintkit add holo-card # 2. Copies component + installs deps + injects CSS
                           # 3. Import and use — it's your code now
```

glintkit detects your project setup automatically:
- **Package manager** — npm, pnpm, yarn, or bun
- **Path aliases** — reads from your `tsconfig.json`
- **CSS file** — injects presets with idempotent markers

## Components

### 3D — `glintkit add --category 3d`

| Component | Description | Dependencies |
|-----------|-------------|--------------|
| `3d-card` | 3D tilt card with mouse/touch tracking and depth layers | — |
| `prismatic-burst` | WebGL prismatic light effect with customizable colors | `ogl` |
| `glass-surface` | SVG-based glass refraction and distortion surface | — |
| `dome-gallery` | 3D dome/sphere photo gallery with drag and inertia | `@use-gesture/react` |
| `holo-card` | Holographic card with rainbow shine and flip animation | — |
| `flip-card` | 3D flip card with tilt effect and customizable content | — |

### Glass — `glintkit add --category glass`

| Component | Description | Dependencies |
|-----------|-------------|--------------|
| `button` | Multi-variant button with glow border, gradient, glass styles | `clsx`, `tailwind-merge` |
| `card` | Glass card with default, strong, gradient, outline variants | `clsx`, `tailwind-merge` |
| `modal` | Modal dialog with glass backdrop and portal rendering | — |
| `music-player` | Audio player with soundwave visualization | — |

### Motion — `glintkit add --category motion`

| Component | Description | Dependencies |
|-----------|-------------|--------------|
| `counter` | Cyberpunk scramble counter with matrix-style animation | — |
| `countdown-timer` | Countdown timer with multiple visual states | — |
| `shiny-text` | Animated shiny/glossy text with sweep direction | `motion` |
| `light-rays` | WebGL volumetric light rays from configurable origin | `ogl` |

### Hooks — `glintkit add --category hooks`

| Hook | Description |
|------|-------------|
| `use-countdown` | Countdown timer (days, hours, minutes, seconds) |
| `use-scroll-animation` | IntersectionObserver-based scroll trigger |
| `use-media-query` | Responsive breakpoint detection with helpers |

### Utils — `glintkit add --category utils`

| Utility | Description |
|---------|-------------|
| `cn` | Tailwind CSS class merge (`clsx` + `tailwind-merge`) |

## CLI Reference

```bash
# Initialize configuration
glintkit init              # Interactive setup
glintkit init -y           # Accept defaults

# Add components
glintkit add 3d-card       # Single component
glintkit add 3d-card modal # Multiple components
glintkit add -c 3d         # Entire category
glintkit add -c 3d,glass   # Multiple categories
glintkit add --all         # Everything
glintkit add --overwrite   # Replace existing files

# Browse components
glintkit list              # All components
glintkit list -c motion    # Filter by category
```

## Configuration

`glintkit init` creates `glintkit.json`:

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

glintkit reads your `tsconfig.json` to auto-detect path aliases:

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
│(glintkit.json)│     │  (markers)   │     │ (aliases)    │
└──────────────┘     └──────────────┘     └──────────────┘
```

## Requirements

- **Node.js** >= 18
- **React** >= 18
- **Tailwind CSS** v3 or v4
- **TypeScript** (recommended)

## Comparison

| Feature | glintkit | Traditional UI Libraries |
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
