# UI-kit Pagination Proposal

## Why

Products screens need reusable pagination controls that match the approved UI and interaction behavior. Implementing pagination once in `ui-kit` keeps visual consistency and avoids re-implementing page navigation logic in app code.

## What Changes

- Add a new public `Pagination` component to `packages/ui-kit` for previous/next navigation and direct page selection.
- Define a contract-first API (props, events, states) for pagination and include generated schemas/manifest entries.
- Integrate the component in the products page flow so application pagination uses the shared UI-kit control.
- Add automated tests following TDD, including behavior tests and Playwright-driven interaction validation.
- Add docs/story coverage for the new component in `apps/fumadocs`.

## Capabilities

### New Capabilities
- `ui-kit-pagination`: Reusable, contract-defined pagination control with accessible page navigation interactions and documented states.

### Modified Capabilities
- `web-products-catalog`: The products list pagination UI requirement is fulfilled through the new shared `ui-kit` pagination component instead of ad-hoc page-number buttons.

## Impact

- Affected code: `packages/ui-kit` components/contracts/states/generated artifacts; `apps/web` products route; `apps/fumadocs` stories/docs.
- APIs: adds new public UI-kit export `Pagination` and `PaginationProps`.
- Dependencies/tooling: no new runtime dependency required; test coverage extends to include Playwright-based validation in the implementation phase.
