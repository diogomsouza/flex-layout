# @stagyra/flex-layout

SCSS flexbox utilities using responsive data attributes. It is useful for demos, internal apps, and Angular projects that want the ergonomics of Angular Flex-Layout without runtime directives.

The package is framework-agnostic CSS. Angular is used only for this repository's demo and packaging workflow.

## Install

```bash
npm install @stagyra/flex-layout
```

## Import

Use the complete compiled CSS:

```scss
@import "@stagyra/flex-layout/styles/flex-layout.css";
```

Or import a smaller compiled entrypoint:

```scss
@import "@stagyra/flex-layout/styles/flex-layout-core.css";
@import "@stagyra/flex-layout/styles/flex-layout-percent.css";
@import "@stagyra/flex-layout/styles/flex-layout-pixels.css";
```

| Entrypoint | Includes | Use when |
| --- | --- | --- |
| `flex-layout-core.css` | Layout directions, wrap, alignments, fill, hide, basic `data-flex`, `basis`, and `data-gap="custom"`. | You mainly use `data-flex`, `auto`, `basis`, and custom CSS variables. |
| `flex-layout-percent.css` | Core plus percentage `data-flex` and percentage `data-offset`; no pixel flex/offset utilities. | Your layouts use mostly `w50%`, `w100%`, responsive percentages, and custom basis for exact pixel values. |
| `flex-layout-pixels.css` | Core plus pixel `data-flex`, pixel `data-offset`, and generated pixel gaps; no percentage flex/offset utilities. | Your layouts use fixed pixel widths/heights and offsets. |
| `flex-layout.css` | Full package: core, percentages, pixels, and generated pixel gaps. | You want every utility available without tuning. |

Or import and configure the SCSS source:

```scss
@import "@stagyra/flex-layout/styles/flex-layout";
```

```scss
@use "@stagyra/flex-layout/styles/flex-layout" with (
  $fl-pixel-sizes: 0, 8, 16, 24, 32, 64, 128, 256, 512,
  $fl-responsive-pixel-sizes: 0, 8, 16, 24, 32, 64, 128, 256, 512,
  $fl-gap-sizes: 0, 8, 16, 24, 32
);
```

## Layout

```html
<div data-layout="row wrap center p-stretch" data-gap="16px">
  <div data-flex="w50%" data-flex-xs="w100%">Left</div>
  <div data-flex="w50%" data-flex-xs="w100%">Right</div>
</div>
```

## Attribute API

| Attribute | Example | Description |
| --- | --- | --- |
| `data-layout` | `row wrap center p-center` | Enables flex layout, direction, wrap, main-axis, and cross-axis alignment. |
| `data-layout-{breakpoint}` | `data-layout-xs="column"` | Overrides layout on a responsive breakpoint. |
| `data-layout-align` | `space-between p-stretch` | Applies alignment without changing direction. |
| `data-flex` | `w50%`, `w320px`, `auto`, `basis` | Controls an item basis, width, height, growth, shrink, or self alignment. |
| `data-flex-{breakpoint}` | `data-flex-lt-md="w100%"` | Overrides flex item behavior by breakpoint. |
| `data-gap` | `16px`, `custom` | Applies native flex `gap`. Use `custom` with `--fl-gap`. |
| `data-offset` | `w25%`, `w24px` | Applies `margin-left`. |
| `data-fill` | empty attribute | Sets width and height to `100%`. |
| `data-hide` | empty, `true`, `false` | Hides when present unless value is explicitly `false`. |
| `data-hide-{breakpoint}` | `data-hide-lt-md` | Hides only inside a breakpoint. |

## Directions

- `row`
- `row-reverse`
- `column`
- `column-reverse`

## Main-Axis Alignment

- `start`
- `center`
- `end`
- `space-between`
- `space-around`
- `space-evenly`

## Cross-Axis Alignment

Prefix cross-axis values with `p-`:

- `p-start`
- `p-center`
- `p-end`
- `p-stretch`
- `p-baseline`
- `p-space-between`
- `p-space-around`
- `p-space-evenly`

## Wrap

- `wrap`
- `nowrap`
- `wrap-reverse`

## Breakpoints

| Suffix | Media query |
| --- | --- |
| `xs` | `max-width: 599.98px` |
| `sm` | `600px - 959.98px` |
| `md` | `960px - 1279.98px` |
| `lg` | `1280px - 1919.98px` |
| `xl` | `min-width: 1920px` |
| `gt-xs` | `min-width: 600px` |
| `gt-sm` | `min-width: 960px` |
| `gt-md` | `min-width: 1280px` |
| `gt-lg` | `min-width: 1920px` |
| `lt-sm` | `max-width: 599.98px` |
| `lt-md` | `max-width: 959.98px` |
| `lt-lg` | `max-width: 1279.98px` |
| `lt-xl` | `max-width: 1919.98px` |

## Size Scale

Percentage utilities include common layout sizes from `w5%` to `w100%`, including thirds (`w33%`, `w34%`, `w66%`, `w67%`).

Pixel utilities for `data-flex` and `data-offset` include even pixel values from `0px` through `1024px`, then every `10px` from `1030px` through `1920px`. The responsive suffixes use the same pixel scale, so values such as `data-flex-gt-md="w1440px"` are generated.

Gap utilities support every pixel from `0px` through `100px`, plus `custom`.

For values outside the generated scale, or values that should not be generated globally, use CSS custom properties:

```html
<div data-layout="row" data-gap="custom" style="--fl-gap: 18px">
  <aside data-flex="basis" style="--fl-basis: 340px">Filters</aside>
  <main data-flex>Results</main>
</div>
```

`--fl-basis` accepts any valid CSS size value, including `520px`, `32rem`, `45%`, `calc(100% - 280px)`, and `clamp(280px, 32vw, 520px)`. Inline styles apply the same custom value wherever `data-flex*="basis"` is active. If you need different custom basis values per breakpoint, define the variable in CSS with media queries.

## Reducing CSS in Consumer Apps

Do not run PurgeCSS while building this package, because the package cannot know which utilities a consuming application will use. Run PurgeCSS in the final application build instead, scanning that application's templates and TypeScript files.

Example PurgeCSS configuration:

```js
import { PurgeCSS } from 'purgecss';

const results = await new PurgeCSS().purge({
  content: [
    './src/**/*.{html,ts}',
    './projects/**/*.{html,ts}',
  ],
  css: [
    './node_modules/@stagyra/flex-layout/styles/flex-layout.css',
  ],
  defaultExtractor: (content) =>
    content.match(/[A-Za-z0-9_:%./#()[\]-]+/g) || [],
});
```

If your app builds attribute values dynamically, safelist the generated patterns that cannot be found as literal strings:

```js
safelist: {
  greedy: [
    /data-layout/,
    /data-flex/,
    /data-gap/,
    /data-offset/,
    /data-hide/,
  ],
}
```

For best results, prefer literal template values such as `data-flex-gt-md="w1440px"` when possible. Literal values let PurgeCSS keep only the utilities actually used by the application.

## Publish

Build first:

```bash
npm run build:lib
```

Publish manually from the generated package:

```bash
cd dist/flex-layout
npm publish --access public
```
