## Context

`apps/web` is a Vite + React + TypeScript application with TanStack Router and shared UI primitives already present, but it currently renders only a placeholder home route. The assignment requires two production-like screens (login and products), integration with DummyJSON auth/products APIs, strict TypeScript, and browser behavior differences for remembered vs non-remembered sessions.

## Goals / Non-Goals

**Goals:**
- Deliver end-to-end flow: login -> authorized products view -> search/sort -> local add product.
- Keep auth/session behavior deterministic with explicit storage policy (`localStorage` vs `sessionStorage`).
- Keep the implementation modular enough to test and evolve (API clients, auth/session helpers, table state, form state).
- Preserve architectural boundaries: `apps/web` consumes shared UI components and does not redefine UI kit contracts.

**Non-Goals:**
- Backend ownership, token refresh orchestration, or production security hardening beyond assignment scope.
- Persisting new products to DummyJSON API.
- Implementing edit/delete workflows not explicitly required by the assignment.

## Decisions

### 1. Route-gated app structure with explicit auth boundary

Decision:
- Introduce dedicated route structure for unauthenticated and authenticated states (`/login` and `/products`), with navigation guards that redirect unauthenticated users to login.

Why:
- Makes access rules explicit and prevents accidental rendering of products UI without a session.

Alternatives considered:
- Single route with conditional rendering: simpler file count but weaker isolation for route-level navigation and deep links.

### 2. Storage abstraction for remember-me semantics

Decision:
- Implement a small session storage adapter that reads/writes auth session data (token) and last-used username to `localStorage` when remember-me is checked and `sessionStorage` otherwise, with a unified API. On logout, clear both storages. If both storages contain data, prefer `sessionStorage`.

Why:
- Centralizes storage policy and avoids scattering persistence logic across components/forms.

Alternatives considered:
- Store token only in memory and serialize conditionally on unload: fragile and harder to reason about across reloads.

### 3. API layer separated from UI components

Decision:
- Add typed API helpers for auth, product list, and product search; UI components consume typed results and map error states to user-facing messages.

Why:
- Keeps UI components focused on rendering/interaction while allowing predictable error handling and easier test coverage.

Alternatives considered:
- Inline fetch logic in route components: fast initially but increases duplication and error-handling drift.

### 4. Local state strategy (no extra async state library)

Decision:
- Use React state/hooks for loading/data/error/sort/search and TanStack Form (already installed) for login/add-product forms.

Why:
- The assignment scope is small enough for local state, and existing dependencies already support robust form validation without introducing another global state abstraction.

Alternatives considered:
- Add React Query or another server-state library: valuable at scale, but unnecessary overhead for this bounded flow.

### 5. Product table state model with deterministic sorting

Decision:
- Persist current sort descriptor (`field`, `direction`) in component/route state and apply deterministic sorting for displayed items; apply sort to both list and search results.

Why:
- Meets the requirement to retain sorting state and avoids inconsistent ordering when result source changes.

Alternatives considered:
- Rely exclusively on API-side sorting/query params: not guaranteed for all required combinations and can complicate client UX consistency.

### 6. Add-product flow is UI-only (no list mutation)

Decision:
- Treat add-product as a UI demonstration only: validate fields, show success toast, and close/reset the form WITHOUT writing to API and WITHOUT mutating the products list/search results.

Why:
- Matches the assignment intent for v1 (form + feedback), keeps scope small, and avoids ambiguous behavior around search/sort integration.

Alternatives considered:
- Append locally to list: useful feedback, but creates extra questions (persistence, search inclusion, id conflicts) not required for v1.

## Risks / Trade-offs

- [DummyJSON auth/token contract differs from assumptions] -> Validate response shape with runtime guards and provide fallback user-readable error text.
- [Search requests on every keystroke create noisy network traffic] -> Debounce search input before firing API calls.
- [Session source ambiguity when both storages contain stale data] -> Define strict precedence and cleanup on login/logout.
- [Figma visual mismatch due to missing exact design tokens] -> Prioritize structural parity (layout/columns/hierarchy) and document minor token-level deviations.
- [Users expect added item to appear in the table] -> Make this explicit in UI copy (e.g., helper text) and keep success feedback via toast.

## Migration Plan

1. Introduce typed API and session helper modules.
2. Build login route/form and enforce auth redirect behavior.
3. Build products route with list loading/progress/error states.
4. Add sorting/search interactions and persisted sort state.
5. Add local add-product modal/form with toast success.
6. Validate against PRD/requirements and perform type checks.

Rollback:
- Revert route wiring to current placeholder and remove added feature modules; no data migration is required because storage usage is client-side only.

## Open Questions

- Confirm the exact DummyJSON auth endpoint/fields to use for this repo version (legacy `/auth/login` vs current auth path conventions).
- Confirm whether "вендор" should map to `brand` in product rows and add form payload.
- Confirm acceptable visual tolerance for Figma parity (pixel-perfect vs structurally equivalent with existing component primitives).
