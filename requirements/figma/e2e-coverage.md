# E2E Coverage Report (FR-1..FR-7)

This report maps functional requirements to existing automated E2E tests.

| FR | Requirement summary | E2E spec | Coverage status | Notes |
|---|---|---|---|---|
| FR-1 | Login validation + API error | `e2e/Auth.spec.ts` | Partial | Required-field + API error covered. |
| FR-2 | Remember me persistence | `e2e/Auth.spec.ts` | Full | Storage target + persistence across contexts asserted. |
| FR-3 | Products list + progress | `e2e/Products.spec.ts` | Full | Loading indicator asserted during and after fetch. |
| FR-4 | Sorting + stored state | `e2e/Products.spec.ts` | Full | Sorting toggle + reload persistence asserted. |
| FR-5 | Add product + toast | `e2e/Products.spec.ts` | Full | Validation, toast, and modal close asserted. |
| FR-6 | Rating highlight `< 3` | `e2e/Products.spec.ts` | Full | Red color assertion exists. |
| FR-7 | Search via API | `e2e/Products.spec.ts` | Full | API search + results rendering covered. |

## Recommended follow-ups

- None for FR-1..FR-7. Expand only if new functional requirements are added.
