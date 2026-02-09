## 1. Foundation and Data Contracts

- [x] 1.1 Add typed API client modules for DummyJSON auth, product list, and product search responses
- [x] 1.2 Add auth session storage helpers with explicit `localStorage` vs `sessionStorage` policy based on remember-me
- [x] 1.3 Add shared domain types for auth session, product row model, and sort descriptor

## 2. Authentication Flow

- [x] 2.1 Implement `/login` route UI with required-field validation and submit/loading states
- [x] 2.2 Integrate login submission with auth API and render API error feedback in the login screen
- [x] 2.3 Persist auth token and last-used username via remember-me policy and wire post-login navigation to products route
- [x] 2.4 Prefill login username from stored last-used username (no password persistence)
- [x] 2.5 Add route guard/redirect logic so products routes require an active session
- [x] 2.6 Add logout button/action to clear all auth-related data (token + stored username) from both storages and navigate to `/login`
- [x] 2.7 Handle `401 Unauthorized` from protected APIs by forcing logout, redirecting to `/login`, and showing a session-expired message

## 3. Products List and Sorting

- [x] 3.1 Implement `/products` route with initial products fetch and visible loading progress indicator
- [x] 3.2 Render products table with required columns (name, price, vendor/brand, article/SKU, rating)
- [x] 3.3 Implement sortable columns (including name, price, rating) with persisted sort descriptor in screen state
- [x] 3.4 Apply rating styling rule so values below `3` render in red
- [x] 3.5 Implement paginated products loading via API `limit/skip` with next/prev (or page) controls and loading indicator on page change
- [x] 3.6 Persist sort descriptor using remember-me storage policy and document “sorting applies to current page only” in the UI to avoid confusion

## 4. Search and Local Product Creation

- [x] 4.1 Implement debounced product search input and API search request flow with retryable error handling
- [x] 4.2 Store active search query in the URL (e.g., `q` param) and restore from URL on reload
- [x] 4.3 Render search results in the products table while preserving active sort behavior
- [x] 4.4 When query is empty, show default (non-search) paginated product list
- [x] 4.5 Implement paginated search results via API `limit/skip` while query is active
- [x] 4.6 Implement add-product modal/form with required fields (name, price, vendor, article/SKU)
- [x] 4.7 On successful add, show success toast and close/reset the form without API write and without mutating the products list/search results

## 5. UX Fidelity and Verification

- [x] 5.1 Match login/products screens pixel-close to the provided Figma (excluding non-mock elements like logout)
- [x] 5.2 Verify session behavior across browser restart vs tab session for remember-me on/off
- [x] 5.3 Run web type checks and fix strict TypeScript issues introduced by the change
- [x] 5.4 Do a requirements trace check against `requirements/requirement.md` and `apps/web/PRD.md`
