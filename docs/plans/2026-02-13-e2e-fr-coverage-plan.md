# E2E FR Coverage Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Close FR-2/3/4/5 gaps in E2E coverage and add stable test IDs without altering UX.

**Architecture:** Add `data-testid` attributes for key elements (progress, toast, modal, sortable headers). Extend existing Playwright specs to assert storage target, loading visibility, sort persistence, and modal close on success.

**Tech Stack:** Playwright, React, TypeScript, pnpm.

---

### Task 1: Add test IDs to UI elements

**Files:**
- Modify: `/Users/leonidpetrov/Projects/tests/dummy-products/.tmp/worktrees/20260214-002412/apps/web/src/routes/products.tsx`
- Modify: `/Users/leonidpetrov/Projects/tests/dummy-products/.tmp/worktrees/20260214-002412/apps/web/src/routes/login.tsx`
- Modify: `/Users/leonidpetrov/Projects/tests/dummy-products/.tmp/worktrees/20260214-002412/apps/web/src/components/*` (only if needed for toast/modal)

**Step 1: Locate elements**
Identify progress indicator element, add-product modal container, toast container, and sortable headers.

**Step 2: Add `data-testid`**
Examples:
- `data-testid="products-loading-indicator"` (if not already present)
- `data-testid="add-product-modal"`
- `data-testid="add-product-toast"` or toast container
- `data-testid="sort-price"`, `data-testid="sort-rating"` on header buttons

**Step 3: Commit**

```bash
git add /Users/leonidpetrov/Projects/tests/dummy-products/.tmp/worktrees/20260214-002412/apps/web/src
git commit -m "test(web): add data-testid hooks for e2e"
```

### Task 2: Extend Auth E2E for storage target

**Files:**
- Modify: `/Users/leonidpetrov/Projects/tests/dummy-products/.tmp/worktrees/20260214-002412/e2e/Auth.spec.ts`

**Step 1: Add assertions**
- After login with remember me ON: assert `localStorage` has `dummy-products.auth` and `sessionStorage` empty.
- After login with remember me OFF: assert `sessionStorage` has key and `localStorage` empty.

**Step 2: Commit**

```bash
git add /Users/leonidpetrov/Projects/tests/dummy-products/.tmp/worktrees/20260214-002412/e2e/Auth.spec.ts
git commit -m "test(e2e): assert remember-me storage target"
```

### Task 3: Extend Products E2E for loading, sorting persistence, modal close

**Files:**
- Modify: `/Users/leonidpetrov/Projects/tests/dummy-products/.tmp/worktrees/20260214-002412/e2e/Products.spec.ts`

**Step 1: Loading indicator visible while fetching**
- Assert indicator is visible during delayed fetch and then resolves.

**Step 2: Sorting persists after reload**
- Click sort, verify `aria-sort` and row order, reload, re-assert.

**Step 3: Modal closes after success**
- After toast, assert modal hidden.

**Step 4: Commit**

```bash
git add /Users/leonidpetrov/Projects/tests/dummy-products/.tmp/worktrees/20260214-002412/e2e/Products.spec.ts
git commit -m "test(e2e): close FR-3/4/5 gaps"
```

### Task 4: Update E2E coverage report

**Files:**
- Modify: `/Users/leonidpetrov/Projects/tests/dummy-products/.tmp/worktrees/20260214-002412/requirements/figma/e2e-coverage.md`

**Step 1: Mark FR-2/3/4/5 as Full**
Update notes to reflect added assertions.

**Step 2: Commit**

```bash
git add /Users/leonidpetrov/Projects/tests/dummy-products/.tmp/worktrees/20260214-002412/requirements/figma/e2e-coverage.md
git commit -m "docs: update FR e2e coverage report"
```

### Task 5: Run E2E tests

**Step 1: Execute**

```bash
pnpm -C /Users/leonidpetrov/Projects/tests/dummy-products/.tmp/worktrees/20260214-002412 test --filter ./e2e
```

Expected: all E2E tests pass.
