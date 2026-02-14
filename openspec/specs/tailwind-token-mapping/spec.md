# Tailwind Token Mapping Specification

## Purpose

Define how **UI Kit CSS variable tokens** map to **Tailwind theme extension keys** so product code can use Tailwind utilities while still being driven by runtime CSS variables (theming).

## Sources of truth

- UI Kit public token surface: `packages/ui-kit/src/tokens.css`
- Pencil-derived token inventory (Auth + Products): `packages/ui-kit/src/tokens.spec.json`

## Requirement: every token is mappable

Every token name listed in `packages/ui-kit/src/tokens.spec.json` MUST have a Tailwind mapping that references its CSS variable (e.g. `var(--ui-color-surface)`).

## Mapping (Tailwind `theme.extend`)

> All values below intentionally reference CSS variables via `var(--ui-…)`.

### `theme.extend.colors`

```js
{
  surface: "var(--ui-color-surface)",
  "surface-muted": "var(--ui-color-surface-muted)",
  "page-background": "var(--ui-color-page-background)",
  "auth-background": "var(--ui-color-auth-background)",

  text: "var(--ui-color-text)",
  "text-dark": "var(--ui-color-text-dark)",
  "text-darker": "var(--ui-color-text-darker)",
  "text-tertiary": "var(--ui-color-text-tertiary)",
  "text-muted": "var(--ui-color-text-muted)",
  "text-placeholder": "var(--ui-color-text-placeholder)",
  "text-subtle": "var(--ui-color-text-subtle)",
  "text-faint": "var(--ui-color-text-faint)",
  "text-body": "var(--ui-color-text-body)",
  "text-black": "var(--ui-color-text-black)",

  border: "var(--ui-color-border)",
  "border-subtle": "var(--ui-color-border-subtle)",
  "border-row": "var(--ui-color-border-row)",

  "icon-muted": "var(--ui-color-icon-muted)",
  "icon-light": "var(--ui-color-icon-light)",
  "icon-lock": "var(--ui-color-icon-lock)",

  primary: "var(--ui-color-primary)",
  "primary-border": "var(--ui-color-primary-border)",
  accent: "var(--ui-color-accent)",
  "selection-stripe": "var(--ui-color-selection-stripe)",
  "checkbox-selected": "var(--ui-color-checkbox-selected)",
  "on-primary": "var(--ui-color-on-primary)",
  "photo-placeholder": "var(--ui-color-photo-placeholder)"
}
```

### `theme.extend.boxShadow`

```js
{
  page: "var(--ui-effect-shadow-page)",
  card: "var(--ui-effect-shadow-card)",
  button: "var(--ui-effect-shadow-button)",
  "logo-1": "var(--ui-effect-shadow-logo-1)",
  "logo-2": "var(--ui-effect-shadow-logo-2)",
  pagination: "var(--ui-effect-shadow-pagination)"
}
```

### `theme.extend.backgroundImage`

```js
{
  "auth-inner-bg": "var(--ui-effect-gradient-auth-inner-bg)",
  "auth-inner-stroke": "var(--ui-effect-gradient-auth-inner-stroke)",
  "auth-outer-stroke": "var(--ui-effect-gradient-auth-outer-stroke)",
  logo: "var(--ui-effect-gradient-logo)",
  button: "var(--ui-effect-gradient-button)"
}
```

### `theme.extend.borderColor`

```js
{
  border: "var(--ui-color-border)",
  "border-subtle": "var(--ui-color-border-subtle)",
  "border-row": "var(--ui-color-border-row)",
  "primary-border": "var(--ui-color-primary-border)"
}
```

### `theme.extend.spacing`

```js
{
  "3xs": "var(--ui-space-3xs)",
  "2xs": "var(--ui-space-2xs)",
  xs: "var(--ui-space-xs)",
  sm: "var(--ui-space-sm)",
  md: "var(--ui-space-md)",
  lg: "var(--ui-space-lg)",
  xl: "var(--ui-space-xl)",
  "2xl": "var(--ui-space-2xl)",
  "3xl": "var(--ui-space-3xl)",
  "4xl": "var(--ui-space-4xl)",
  "5xl": "var(--ui-space-5xl)",
  "6xl": "var(--ui-space-6xl)",
  "7xl": "var(--ui-space-7xl)",
  "8xl": "var(--ui-space-8xl)",
  "9xl": "var(--ui-space-9xl)"
}
```

### `theme.extend.borderRadius`

```js
{
  xs: "var(--ui-radius-xs)",
  sm: "var(--ui-radius-sm)",
  md: "var(--ui-radius-md)",
  lg: "var(--ui-radius-lg)",
  xl: "var(--ui-radius-xl)",
  "2xl": "var(--ui-radius-2xl)",
  "3xl": "var(--ui-radius-3xl)",
  pill: "var(--ui-radius-pill)"
}
```

### `theme.extend.fontFamily`

```js
{
  heading: "var(--ui-font-heading)",
  ui: "var(--ui-font-ui)",
  body: "var(--ui-font-body)",
  roboto: "var(--ui-font-roboto)",
  mono: "var(--ui-font-mono)"
}
```

### `theme.extend.fontSize`

```js
{
  xs: "var(--ui-font-size-xs)",
  sm: "var(--ui-font-size-sm)",
  md: "var(--ui-font-size-md)",
  lg: "var(--ui-font-size-lg)",
  xl: "var(--ui-font-size-xl)",
  "2xl": "var(--ui-font-size-2xl)",
  "3xl": "var(--ui-font-size-3xl)"
}
```

### `theme.extend.fontWeight`

```js
{
  normal: "var(--ui-font-weight-normal)",
  medium: "var(--ui-font-weight-medium)",
  semibold: "var(--ui-font-weight-semibold)",
  bold: "var(--ui-font-weight-bold)"
}
```

### `theme.extend.lineHeight`

```js
{
  tight: "var(--ui-line-height-tight)",
  normal: "var(--ui-line-height-normal)",
  relaxed: "var(--ui-line-height-relaxed)",
  loose: "var(--ui-line-height-loose)"
}
```

### `theme.extend.letterSpacing`

```js
{
  tight: "var(--ui-letter-spacing-tight)",
  "normal-tight": "var(--ui-letter-spacing-normal-tight)",
  button: "var(--ui-letter-spacing-button)"
}
```

## Stroke tokens (border shorthand)

Stroke tokens are **border shorthands** (width + style + color). Tailwind does not provide a built-in theme key that can be consumed as a `border` shorthand via standard utilities.

### Mapping (custom `theme.extend.stroke`)

```js
{
  input: "var(--ui-stroke-input)",
  "table-row": "var(--ui-stroke-table-row)",
  checkbox: "var(--ui-stroke-checkbox)",
  photo: "var(--ui-stroke-photo)",
  button: "var(--ui-stroke-button)",
  "icon-muted": "var(--ui-stroke-icon-muted)"
}
```

### Usage (recommended)

Use Tailwind arbitrary properties to apply the full shorthand:

- `[border:var(--ui-stroke-input)]`
- `[border:var(--ui-stroke-photo)]`

