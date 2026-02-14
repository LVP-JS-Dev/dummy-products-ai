# Design: Figma Source-of-Truth Sync (Auth + Products)

Date: 2026-02-14
Session: 20260214-002412

## Goal

Bring the project in line with Figma as source of truth for this task by:

1. Exporting full Figma design JSON.
2. Extracting and syncing design tokens into UI Kit.
3. Updating UI Kit PRD and token documentation to match Figma.
4. Comparing Products full page and Auth page with current implementation.
5. Fixing visual/structural gaps in `apps/web`.
6. Producing automated screenshot diff report for Auth and Products only.
7. Implementing all functional requirements from `requirements/requirement.md`.

## Inputs and Scope

- Figma file URL: `https://www.figma.com/design/0X0Ez6ixeONpSKwr3njSLd/...`
- Products frame node: `1:368`.
- TalkToFigma channel: `q7ox9jhh`.
- Functional requirements source: `requirements/requirement.md`.
- Visual diff scope: Auth and Products full page only.

## Approved Architecture

1. Export full Figma data and normalize token primitives.
2. Map Figma tokens to UI Kit token system.
3. Update UI Kit tokens and PRD (Figma-first for this task).
4. Regenerate docs artifacts.
5. Run visual parity pass for Auth + Products in web app.
6. Apply UI fixes.
7. Generate automated screenshot diff report.
8. Run project checks (`pnpm gen`, `pnpm test`, `pnpm check`).

## Token Sync Rules

- If token exists in UI Kit and differs from Figma: update value.
- If token is present in Figma and missing in UI Kit: add token and document in PRD.
- If token exists in UI Kit but is absent in Figma: keep unless confirmed obsolete.
- Docs and generated token metadata must be updated after sync.

## Risks and Mitigation

- Figma export may not expose global variables in one structure.
  Fallback: extract from node-level styles (fills, strokes, text styles, effects).
- Visual diff instability due to viewport/render differences.
  Mitigation: fixed viewport, deterministic waits, stable fonts, same scale.

## Validation Plan

1. Verify token changes by diffing UI Kit token files.
2. Verify PRD reflects any new/changed token contracts.
3. Verify app screens match target Figma frames for Auth + Products.
4. Generate and inspect automated diff report artifacts.
5. Run required monorepo checks.

## Deliverables

- Updated token sources and docs in `packages/ui-kit`.
- Updated PRD entries (root/web/ui-kit if required by scope).
- Updated `apps/web` screens for Auth and Products parity.
- Automated screenshot diff report for two pages.
- Confirmation of functional requirements coverage.
