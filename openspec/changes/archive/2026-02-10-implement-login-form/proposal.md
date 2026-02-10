## Why

Current authentication behavior exists, but the login screen does not yet guarantee conformance to the provided Figma design used for acceptance in this assignment. We need a clear spec for visual structure, states, and interactions so implementation can be reviewed against a stable UI contract.

## What Changes

- Add a dedicated login UI capability that defines required layout, styling tokens, and interactive states based on the provided Figma node.
- Extend authentication requirements to bind existing login behavior (validation, API errors, submit lifecycle) to explicit UI state rendering in the login form.
- Define acceptance-level requirements for responsive behavior and accessibility semantics for the login form.

## Capabilities

### New Capabilities
- `web-login-form-ui`: Defines Figma-aligned login form layout, visual tokens, interactive states, and responsive behavior.

### Modified Capabilities
- `web-auth-session`: Clarifies how validation, submit progress, and authentication errors MUST be represented in the login UI.

## Impact

- Affected frontend login page/component structure and styling.
- Potential updates to shared UI primitives and form utilities used by auth screens.
- Additional UI and integration test coverage for login states and regression protection.
