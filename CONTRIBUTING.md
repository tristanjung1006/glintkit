# Contributing to glint-ui

Thanks for your interest in contributing! Here's how to get started.

## Development Setup

```bash
git clone https://github.com/tristanjung1006/glint-ui.git
cd glint-ui
npm install
npm run build
```

## Project Structure

```
src/
  cli/              # CLI entry point and commands
    commands/       # init, add, list commands
  registry/         # Component registry and CSS presets
    __generated__/  # Auto-generated template bundle
  utils/            # Config, file writer, CSS injector, etc.
templates/          # Source component templates
scripts/            # Build scripts (template bundler)
```

## Adding a New Component

1. Create the component template in `templates/components/<category>/`
2. Register it in `src/registry/components.ts`
3. If it needs CSS presets, add them to `src/registry/css-presets.ts`
4. Run `npm run build` to bundle templates
5. Test with `node dist/index.js add <component-name> --yes`

## Running Tests

```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # With coverage report
```

## Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation
- `refactor:` — Code refactoring
- `test:` — Adding or updating tests
- `chore:` — Maintenance tasks

## Pull Request Process

1. Fork the repo and create a feature branch
2. Make your changes
3. Add/update tests as needed
4. Ensure `npm run build && npm test` passes
5. Submit a PR with a clear description

## Code Style

- TypeScript strict mode
- No `any` types unless absolutely necessary
- Prefer explicit return types on exported functions
