## Context

UI kit components currently consume design tokens directly from JS/TS constants. This makes token usage hard to enforce and obscures the contract between tokens and the final CSS output. The proposal establishes a new capability requiring tokens to be consumed through CSS, with lint rules enforcing this boundary.

Constraints:
- The monorepo uses Ultracite/Biome for checks.
- The UI kit is the source of truth for component styling and tokens.

## Goals / Non-Goals

**Goals:**
- Establish CSS as the only approved consumption path for UI kit tokens in component code.
- Provide a predictable, documented CSS token surface (e.g., CSS variables) for UI kit consumers.
- Enforce the rule via linting so violations are caught in CI and locally.

**Non-Goals:**
- Redesign of token values or naming schemes beyond what is needed for CSS exposure.
- Rewriting the entire styling system or introducing a new CSS framework.
- Runtime theming or dynamic token overrides beyond the initial CSS exposure.

## Decisions

1. **CSS variables are the canonical token consumption mechanism.**
   - Rationale: CSS variables are standard, composable, and can be used consistently across components and apps.
   - Alternatives: direct JS token constants (rejected; not enforceable) or inline literals (rejected; loses token contract).

2. **Enforcement via lint rule on token imports/usage in TS/TSX.**
   - Rationale: Linting provides immediate feedback and prevents drift.
   - Alternatives: code review only (rejected; unreliable) or build-time grep (rejected; brittle).

3. **Allow-listed exceptions for token definition/generation files.**
   - Rationale: Token source files must define values before CSS generation.
   - Alternatives: banning all imports (rejected; would block generation).

## Risks / Trade-offs

- **Risk:** False positives in linting (e.g., tests or story files). → **Mitigation:** Explicit allowlist patterns and documented escape hatches.
- **Risk:** Migration churn in existing components. → **Mitigation:** Provide a clear migration guide and incremental rollout.
- **Risk:** CSS variable naming mismatches with existing tokens. → **Mitigation:** Define and document a deterministic mapping strategy.

## Migration Plan

1. Define and publish the CSS token surface (variables and entrypoint).
2. Introduce lint rules in warning mode (if supported) or apply to new/changed files first.
3. Migrate existing UI kit component styles to CSS variable usage.
4. Flip lint rules to strict enforcement in CI.

## Open Questions

- Where should the CSS token entrypoint live and how should it be imported by apps?
- Do we need a versioned namespace for token variables to avoid breaking changes?
