# E2E Coverage Report (FR-1..FR-7)

This report maps functional requirements to existing automated E2E tests.

| FR | Requirement summary | E2E spec | Coverage status | Notes |
|---|---|---|---|---|
| FR-1 | Login validation + API error | `e2e/Auth.spec.ts` | Partial | Required-field + API error covered. |
| FR-2 | Remember me persistence | `e2e/Auth.spec.ts` | Partial | Session persistence across contexts covered; storage target not asserted. |
| FR-3 | Products list + progress | `e2e/Products.spec.ts` | Partial | Progress indicator check only after load; initial visible state not asserted. |
| FR-4 | Sorting + stored state | `e2e/Products.spec.ts` | Partial | Sorting toggle covered; persistence across reload not asserted. |
| FR-5 | Add product + toast | `e2e/Products.spec.ts` | Partial | Validation + toast covered; modal close not asserted. |
| FR-6 | Rating highlight `< 3` | `e2e/Products.spec.ts` | Full | Red color assertion exists. |
| FR-7 | Search via API | `e2e/Products.spec.ts` | Full | API search + results rendering covered. |

## Recommended follow-ups (to reach Full coverage)

1. Add storage target assertions for FR-2 (`localStorage` vs `sessionStorage`).
2. Assert progress indicator visibility during load for FR-3.
3. Add reload persistence check for FR-4.
4. Verify modal closes on success for FR-5.
