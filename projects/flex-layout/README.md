# @stagyra/flex-layout

SCSS flexbox utilities using responsive data attributes. It is useful for demos, internal apps, and Angular projects that want the ergonomics of Angular Flex-Layout without runtime directives.

The package is framework-agnostic CSS. Angular is used only for this repository's demo and packaging workflow.

## Install

```bash
npm install @stagyra/flex-layout
```

## Import

Use the compiled CSS:

```scss
@import "@stagyra/flex-layout/styles/flex-layout.css";
```

Or import the SCSS source:

```scss
@import "@stagyra/flex-layout/styles/flex-layout";
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

Pixel utilities include common spacing and layout values from `0px` to `1920px`. For values outside the scale, use CSS custom properties:

```html
<div data-layout="row" data-gap="custom" style="--fl-gap: 18px">
  <aside data-flex="basis" style="--fl-basis: 340px">Filters</aside>
  <main data-flex>Results</main>
</div>
```

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
