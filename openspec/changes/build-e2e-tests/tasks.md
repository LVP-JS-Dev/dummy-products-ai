## 1. E2E Test Harness

- [x] 1.1 Review existing test tooling and decide Playwright location and config
- [x] 1.2 Add Playwright config and pnpm scripts for local and CI runs
- [x] 1.3 Define selector strategy and add `data-testid` where needed in `apps/web`
- [x] 1.4 Add test data setup/cleanup helpers or fixtures for deterministic runs

## 2. Auth and Access Coverage

- [x] 2.1 Implement E2E test for login required-field validation
- [x] 2.2 Implement E2E test for Auth API error handling
- [x] 2.3 Implement E2E test for unauthenticated access redirect to login
- [x] 2.4 Implement E2E tests for remember-me persistence (enabled/disabled)

## 3. Products List Coverage

- [x] 3.1 Implement E2E test for products list loading indicator
- [x] 3.2 Implement E2E test for pagination boundaries and disabled controls
- [x] 3.3 Implement E2E test for sorting on a sortable column with indicator
- [x] 3.4 Implement E2E test for search results rendering via API

## 4. Product Add and Rating Rules

- [x] 4.1 Implement E2E test for add-product required fields and success toast
- [x] 4.2 Implement E2E test for rating < 3 red highlight

## 5. Stability and CI

- [x] 5.1 Add trace/screenshot/video settings for failed runs
- [x] 5.2 Document how to run the E2E suite locally
