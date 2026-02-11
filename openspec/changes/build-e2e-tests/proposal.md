## Why

Critical user journeys in `apps/web` are currently unprotected by end-to-end tests, making regressions likely and slowing confident releases. We need a focused E2E suite now to cover the main product flows aligned with the app's functional requirements.

## What Changes

- Add a defined E2E testing capability for `apps/web` focused on key user journeys.
- Establish Playwright-based test structure, selectors strategy, and CI-ready execution paths.
- Document required test data setup and teardown for deterministic runs.

## Capabilities

### New Capabilities
- `web-e2e-user-flows`: End-to-end test coverage for core `apps/web` user journeys aligned with functional requirements.

### Modified Capabilities
- (none)

## Impact

- `apps/web` user flows covered by E2E tests
- Test infrastructure (Playwright config, fixtures, selectors)
- CI/test scripts to run E2E suite
