## Context

`apps/web` lacks E2E coverage for core user journeys. The monorepo already uses pnpm and Turborepo; existing specs describe functional requirements for web flows. We need a deterministic, CI-friendly E2E layer that aligns with those requirements without coupling to implementation details.

## Goals / Non-Goals

**Goals:**
- Provide Playwright-based E2E tests for critical `apps/web` user journeys.
- Use stable selectors (`data-testid`, roles/labels) and clear fixtures to keep tests deterministic.
- Enable local and CI execution via pnpm scripts and standard Playwright config.

**Non-Goals:**
- Comprehensive coverage of all edge cases (kept to critical paths).
- Unit/integration test replacement.
- Performance benchmarking or load testing.

## Decisions

- **Playwright as the E2E runner**: Chosen for multi-browser support, built-in waits, and strong tooling (traces, videos) compared to Cypress.
- **Selectors strategy**: Prefer `getByRole`/`getByLabel` with `data-testid` fallback to avoid brittle CSS selectors and align with accessibility.
- **Test structure**: Organize by user journey with optional page objects/fixtures to reduce duplication and isolate setup/teardown.
- **Data strategy**: Use deterministic test data via seeded fixtures or API setup/cleanup hooks to avoid flaky shared state.

## Risks / Trade-offs

- **Flaky tests due to async UI or shared data** → Use Playwright auto-waits, explicit assertions, and isolated test data setup/cleanup.
- **Selector instability when UI changes** → Standardize `data-testid` usage for critical elements and document selector conventions.
- **CI runtime increase** → Keep suite focused on critical paths and parallelize where feasible.
