# Add Products Table Virtualization (TanStack Virtual)

## Why

The requirements list includes a desire to implement the products table using TanStack Virtual. Virtualization is typically justified by large render sets; however, the current app uses API pagination with a default fixed `limit=10`, which makes virtualization optional from a performance perspective.

This change is intentionally framed as a decision spike: we capture the criteria and implementation constraints, then decide whether to adopt it.

## What Changes

- Evaluate `@tanstack/react-virtual` for the products table rendering strategy.
- If adopted, integrate virtualization into the existing TanStack Table-driven rendering without changing user-facing behavior.

## Scope

### In scope

- Spike: measure/estimate benefit for realistic page sizes (10/20/50/100)
- Identify integration approach with current table structure and header/footer layout

### Out of scope

- Infinite scrolling
- Server-driven sorting/search changes
- Changing UI-kit contracts/states

## Capabilities

No new capability is required unless we decide to make virtualization a normative requirement for `apps/web`.

## PRD impact

- [ ] Root PRD
- [ ] UI Kit PRD
- [ ] Docs PRD
- [ ] Web PRD

