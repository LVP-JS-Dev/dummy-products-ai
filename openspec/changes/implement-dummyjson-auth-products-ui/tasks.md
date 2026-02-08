## 1. Foundation and Data Contracts

- [ ] 1.1 Add typed API client modules for DummyJSON auth, product list, and product search responses
- [ ] 1.2 Add auth session storage helpers with explicit `localStorage` vs `sessionStorage` policy based on remember-me
- [ ] 1.3 Add shared domain types for auth session, product row model, and sort descriptor

## 2. Authentication Flow

- [ ] 2.1 Implement `/login` route UI with required-field validation and submit/loading states
- [ ] 2.2 Integrate login submission with auth API and render API error feedback in the login screen
- [ ] 2.3 Persist auth token and last-used username via remember-me policy and wire post-login navigation to products route
- [ ] 2.4 Prefill login username from stored last-used username (no password persistence)
- [ ] 2.5 Add route guard/redirect logic so products routes require an active session
- [ ] 2.6 Add logout button/action to clear session data from both storages and navigate to `/login`

## 3. Products List and Sorting

- [ ] 3.1 Implement `/products` route with initial products fetch and visible loading progress indicator
- [ ] 3.2 Render products table with required columns (name, price, vendor/brand, article/SKU, rating)
- [ ] 3.3 Implement sortable columns (including price and rating) with persisted sort descriptor in screen state
- [ ] 3.4 Apply rating styling rule so values below `3` render in red

## 4. Search and Local Product Creation

- [ ] 4.1 Implement product search input and API search request flow with retryable error handling
- [ ] 4.2 Merge/render search results in the products table while preserving active sort behavior
- [ ] 4.3 Implement add-product modal/form with required fields (name, price, vendor, article/SKU)
- [ ] 4.4 On successful add, show success toast and close/reset the form without API write and without mutating the products list/search results

## 5. UX Fidelity and Verification

- [ ] 5.1 Align login/products screen structure and primary UI hierarchy with the provided Figma layouts
- [ ] 5.2 Verify session behavior across browser restart vs tab session for remember-me on/off
- [ ] 5.3 Run web type checks and fix strict TypeScript issues introduced by the change
- [ ] 5.4 Do a requirements trace check against `requirements/requirement.md` and `apps/web/PRD.md`
