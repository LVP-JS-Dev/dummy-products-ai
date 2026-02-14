# Checkbox Size Parity Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make UI-kit checkboxes default to 22px (Figma parity) via a size prop and update docs/tests, then re-run parity diff.

**Architecture:** UI-kit owns checkbox sizing through contract + component; default size is `sm` (22px). Apps should rely on the default unless explicitly overridden later. Generated artifacts and docs must be updated per AGENT workflow.

**Tech Stack:** React, TypeScript, pnpm, UI-kit generator, Fumadocs.

---

### Task 1: Add size to Checkbox contract

**Files:**
- Modify: `/Users/leonidpetrov/Projects/tests/dummy-products/.tmp/worktrees/20260214-002412/packages/ui-kit/src/contracts/CheckboxContract.ts`

**Step 1: Write failing type expectation (if tests exist)**

```ts
// If there are contract/type tests, add an example using size.
// Otherwise skip to implementation.
```

**Step 2: Implement size prop**

```ts
export type CheckboxSize = "sm" | "md";

export interface CheckboxContract {
  // ...existing props
  size?: CheckboxSize; // default is "sm" (22px)
}
```

**Step 3: Commit**

```bash
git add /Users/leonidpetrov/Projects/tests/dummy-products/.tmp/worktrees/20260214-002412/packages/ui-kit/src/contracts/CheckboxContract.ts
git commit -m "feat(ui-kit): add checkbox size prop"
```

### Task 2: Implement size mapping in Checkbox component

**Files:**
- Modify: `/Users/leonidpetrov/Projects/tests/dummy-products/.tmp/worktrees/20260214-002412/packages/ui-kit/src/components/Checkbox.tsx`

**Step 1: Update implementation to use size map**

```ts
const sizeMap = {
  sm: 22,
  md: 24,
} as const;

const sizePx = sizeMap[size ?? "sm"];
```

Apply `sizePx` to width/height/border-radius line-height where applicable.

**Step 2: Run targeted UI-kit tests (optional)**

```bash
pnpm -C /Users/leonidpetrov/Projects/tests/dummy-products/.tmp/worktrees/20260214-002412/packages/ui-kit test
```

Expected: PASS

**Step 3: Commit**

```bash
git add /Users/leonidpetrov/Projects/tests/dummy-products/.tmp/worktrees/20260214-002412/packages/ui-kit/src/components/Checkbox.tsx
git commit -m "feat(ui-kit): support checkbox size map"
```

### Task 3: Update Checkbox states

**Files:**
- Modify: `/Users/leonidpetrov/Projects/tests/dummy-products/.tmp/worktrees/20260214-002412/packages/ui-kit/src/states/CheckboxStates.ts`

**Step 1: Add/adjust states**

```ts
// Ensure default state uses size "sm" or omits size (defaults to sm)
// Optionally add a "md" state for documentation completeness
```

**Step 2: Commit**

```bash
git add /Users/leonidpetrov/Projects/tests/dummy-products/.tmp/worktrees/20260214-002412/packages/ui-kit/src/states/CheckboxStates.ts
git commit -m "docs(ui-kit): update checkbox states for size"
```

### Task 4: Regenerate UI-kit artifacts

**Files:**
- Modify: generated files under `/Users/leonidpetrov/Projects/tests/dummy-products/.tmp/worktrees/20260214-002412/packages/ui-kit/src/generated/**`

**Step 1: Run generator**

```bash
pnpm -C /Users/leonidpetrov/Projects/tests/dummy-products/.tmp/worktrees/20260214-002412/packages/ui-kit gen
```

Expected: generated artifacts updated

**Step 2: Commit**

```bash
git add /Users/leonidpetrov/Projects/tests/dummy-products/.tmp/worktrees/20260214-002412/packages/ui-kit/src/generated
git commit -m "chore(ui-kit): regenerate after checkbox size"
```

### Task 5: Update docs to mention size

**Files:**
- Modify: `/Users/leonidpetrov/Projects/tests/dummy-products/.tmp/worktrees/20260214-002412/apps/fumadocs/content/components/checkbox.mdx`
- Modify: `/Users/leonidpetrov/Projects/tests/dummy-products/.tmp/worktrees/20260214-002412/apps/fumadocs/src/stories/CheckboxStory.tsx`

**Step 1: Update docs and story**

```mdx
// Mention size prop and default to sm (22px)
```

**Step 2: Commit**

```bash
git add /Users/leonidpetrov/Projects/tests/dummy-products/.tmp/worktrees/20260214-002412/apps/fumadocs/content/components/checkbox.mdx \
  /Users/leonidpetrov/Projects/tests/dummy-products/.tmp/worktrees/20260214-002412/apps/fumadocs/src/stories/CheckboxStory.tsx
git commit -m "docs(fumadocs): document checkbox size"
```

### Task 6: Run UI-kit tests

**Step 1: Execute**

```bash
pnpm -C /Users/leonidpetrov/Projects/tests/dummy-products/.tmp/worktrees/20260214-002412/packages/ui-kit test
```

Expected: PASS

### Task 7: Rerun parity capture

**Files:**
- Output: `/Users/leonidpetrov/Projects/tests/dummy-products/.tmp/worktrees/20260214-002412/openspec/changes/ui-kit-figma-playwright-parity/**`

**Step 1: Start web app (parity mode)**

```bash
VITE_FIGMA_PARITY=true pnpm -C /Users/leonidpetrov/Projects/tests/dummy-products/.tmp/worktrees/20260214-002412/apps/web dev
```

**Step 2: Run capture script (in another terminal)**

```bash
node /Users/leonidpetrov/Projects/tests/dummy-products/.tmp/worktrees/20260214-002412/scripts/ui-kit-parity/capture-web-figma-state.mjs --round 11
```

**Step 3: Commit parity outputs**

```bash
git add /Users/leonidpetrov/Projects/tests/dummy-products/.tmp/worktrees/20260214-002412/openspec/changes/ui-kit-figma-playwright-parity
git commit -m "test(parity): capture round 11 after checkbox size"
```

### Task 8: Final checks

**Step 1: Run repo checks**

```bash
pnpm -C /Users/leonidpetrov/Projects/tests/dummy-products/.tmp/worktrees/20260214-002412 check
```

Expected: PASS (or known warnings only)

**Step 2: Summarize diff delta**

```bash
git status -sb
```

Expected: clean
