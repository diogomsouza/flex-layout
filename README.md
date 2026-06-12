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

Current version: `0.1.5`

License: MIT

Basic usage:

```html
<div data-layout="row wrap space-between p-stretch" data-gap="16px">
  <aside data-flex="basis" data-flex-xs="w100%" data-flex-align="center" style="--fl-basis: 320px">
    Filters
  </aside>
  <main data-flex data-flex-align="stretch">Results</main>
</div>
```

Use `data-flex-align` to apply `align-self` to one flex item without changing the container alignment. Responsive suffixes are supported, such as `data-flex-align-xs="stretch"` and `data-flex-align-gt-md="start"`.

Publish after building:

```bash
cd dist/flex-layout
npm publish --access public
```

See [projects/flex-layout/README.md](projects/flex-layout/README.md) for installation and API usage.
