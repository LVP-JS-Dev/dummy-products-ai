# Login Form UI Design

## Context

The project already has auth-session behavior requirements and implementation for login/logout, but visual and interaction details for the login form are not yet specified as a Figma-driven contract. The target change introduces a deterministic UI specification for the login screen while preserving existing session behavior and API integration.

## Goals / Non-Goals

**Goals:**
- Deliver a login form implementation contract aligned to the provided Figma file and node.
- Keep existing auth flow semantics (validation, error handling, remember-me/session behavior) while defining exact UI state rendering rules.
- Ensure responsive and accessible structure so the form is testable in desktop and mobile breakpoints.

**Non-Goals:**
- Redesigning post-login screens (products list, catalog, CRUD flows).
- Changing backend auth API contract or session token format.
- Introducing new authentication methods (OAuth, SSO, MFA) in this change.

## Decisions

1. Add a dedicated capability `web-login-form-ui` instead of overloading `web-auth-session`.
   - Rationale: Visual and layout requirements have different lifecycle and acceptance criteria than session rules; separating capabilities keeps archive deltas cleaner.
   - Alternative considered: Put all new UI requirements into `web-auth-session`. Rejected because that couples behavior and visual spec evolution.

2. Modify only the login-form requirement in `web-auth-session` and keep all other session requirements unchanged.
   - Rationale: The requested change is login form implementation according to design; remember-me, logout, and unauthorized handling are already defined and remain valid.
   - Alternative considered: Rewriting all auth requirements in one delta. Rejected to avoid noisy diffs and accidental semantic drift.

3. Define Figma alignment as testable constraints (structure, states, responsive behavior), not raw pixel snapshots.
   - Rationale: The implementation should remain robust across runtime rendering environments while still matching design intent.
   - Alternative considered: Encode exact pixel values only. Rejected because it is brittle and hard to maintain when tokens/theme evolve.

## Risks / Trade-offs

- [Risk] Figma details may include assets/variables not yet present in the codebase. -> Mitigation: implement with existing design tokens where available and add local component-level styles only for missing values.
- [Risk] Ambiguity in interpreting visual spacing/typography from Figma can cause review churn. -> Mitigation: codify key acceptance attributes in specs and validate with screenshot comparisons in PR.
- [Risk] UI changes may unintentionally regress login validation/error behavior. -> Mitigation: keep auth behavior under existing tests and add focused interaction tests for form states.
