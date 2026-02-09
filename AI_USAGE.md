# AI Usage

The assignment requirements request that AI usage is disclosed (model and prompts used).

## Model(s) / Tooling

- OpenAI ChatGPT (Codex) — GPT-5.2
- TODO: If you used additional models/tools, list them here.

## What AI was used for

- Drafting/refining React + TypeScript code for the login/products flows.
- Generating and adjusting UI details to match the provided Figma screenshots.
- Suggesting test cases and improving edge-case handling.
- Refactoring for consistency (naming, structure, formatting).

## What was done manually

- Architecture decisions (contract-first UI kit boundaries and monorepo structure).
- Mapping requirements → PRD/DoD and verifying coverage.
- Final UI/UX tweaks and visual alignment.
- Running and verifying the app in the browser.

## Representative prompts (examples)

1. “Implement a login form in React + TS with required validation and API error handling.”
2. “Design remember-me behavior: session vs local storage; implement load/save/clear helpers.”
3. “Build products list with DummyJSON: pagination, loading state, and error handling.”
4. “Add sorting with TanStack Table and persist sorting state.”
5. “Implement products search via API with debounced query and a submit action.”
6. “Implement add-product modal: focus trap, ESC close, required validation, toast on success (no API save).”
7. “Ensure rating values below 3 are highlighted in red in the table.”
8. “Implement contract-first UI kit: Zod contracts, states fixtures, JSON Schema generation, manifest.”
9. “Write contract tests to validate states against generated schemas and detect drift.”
10. “Create docs pages and stories that consume UI kit states via the public API.”

## Notes

- AI-assisted code was reviewed and adapted to the repo’s invariants and requirements.
- No secrets or credentials were generated or stored.
