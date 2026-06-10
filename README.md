# Flex Layout

Workspace for `@stagyra/flex-layout`, a small SCSS utility package that recreates the most useful Angular Flex-Layout style APIs with data attributes.

Demo: https://diogomsouza.github.io/flex-layout/

## Projects

- `projects/flex-layout`: publishable npm package with SCSS and compiled CSS.
- `projects/demo`: responsive demo app with live layout, breakpoint, gap, sizing, and visibility examples.

## Commands

```bash
npm install
npm run build:lib
npm run build:demo
npm start
```

The package is prepared for manual npm publication, but this workspace does not run `npm publish` automatically.

## Package

Package name: `@stagyra/flex-layout`

Current version: `0.1.3`

License: MIT

Publish after building:

```bash
cd dist/flex-layout
npm publish --access public
```

See [projects/flex-layout/README.md](projects/flex-layout/README.md) for installation and API usage.
