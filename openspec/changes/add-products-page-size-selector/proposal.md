# Add Products Page Size Selector

## Why

The products table footer currently supports pagination but uses a fixed `limit=10`. The requirements list calls for a way to select how many products are shown per page from the table footer. This is a UX feature that also affects API parameters and pagination math.

## What Changes

- Add a page-size selector to the products table footer (e.g. `10/20/50`).
- Changing page size updates API `limit`, resets or clamps the current page, and preserves existing loading/disabled behavior.
- Define persistence policy (URL vs storage) explicitly.

## Scope

### In scope

- UI control in footer
- Wiring into API request params and pagination
- Disabled state while loading

### Out of scope

- Infinite scrolling
- Table virtualization (separate concern)
- New UI-kit `Select` unless it becomes a cross-app invariant

## Capabilities

### Modified capabilities

- `web-products-catalog`: add normative requirement for page size selection and `limit` changes
- `web-products-search-and-create`: ensure search mode uses the same page-size selector behavior

## PRD impact

- [ ] Root PRD
- [ ] UI Kit PRD
- [ ] Docs PRD
- [x] Web PRD

