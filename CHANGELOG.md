# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-02-08

### Added

- CLI with `init`, `add`, and `list` commands
- 18 components across 5 categories:
  - **3D**: 3d-card, prismatic-burst, glass-surface, dome-gallery, holo-card, flip-card
  - **Glass**: button, card, modal, music-player
  - **Motion**: counter, countdown-timer, shiny-text, light-rays
  - **Hooks**: use-countdown, use-scroll-animation, use-media-query
  - **Utils**: cn
- Automatic dependency installation (npm, pnpm, yarn, bun)
- CSS preset injection with idempotent markers
- Alias detection from tsconfig.json
- Interactive and non-interactive modes
