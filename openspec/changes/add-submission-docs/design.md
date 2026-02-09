## Context

This repo implements a contract-first UI monorepo with a demo app (`apps/web`) and docs (`apps/fumadocs`). Functional requirements for the assignment live in `requirements/requirement.md` and are expanded in `apps/web/PRD.md`.

The project is demo-ready, but submission readiness is reduced by:

- Missing reviewer-facing run + verification guide (no single “how to check” entrypoint).
- Missing explicit AI usage disclosure (requested by the assignment).
- Broken process pointer: `README.md` references `AGENT.md`, while the operational rules file currently lives at `.ruler/agent.md`.

Constraints:

- Documentation-only change; no runtime behavior changes.
- Keep instructions concise and aligned with the existing PRD/DoD language.

## Goals / Non-Goals

**Goals:**

- Add `SUBMISSION.md` as the primary reviewer entrypoint:
  - how to run (`pnpm i`, `pnpm dev`);
  - what URLs/ports to open;
  - quick verification script mapping directly to requirements (login, remember-me, products list, sort, search, add modal, rating highlight).
- Add `AI_USAGE.md` that records:
  - model/tool used;
  - what AI was used for vs what was done manually;
  - representative prompts (not full transcripts).
- Update `README.md` to:
  - link to `SUBMISSION.md`;
  - point “operational rules” to `.ruler/agent.md` (or a new stable alias file if preferred).

**Non-Goals:**

- Changing the application behavior, UI, contracts, states, or generated schemas.
- Adding CI, deployment, or production hardening.
- Reworking requirements/PRD wording beyond small clarifications needed for submission docs.

## Decisions

- **Docs live at repo root**: `SUBMISSION.md` and `AI_USAGE.md` are root-level so a reviewer sees them immediately without navigating into apps/packages.
- **Verification script is requirement-driven**: the quick-check section in `SUBMISSION.md` is written as a deterministic flow tied to items in `requirements/requirement.md` / `apps/web/PRD.md`, not as generic QA notes.
- **Fix broken process pointer**: `README.md` should not mention a nonexistent `AGENT.md`. Prefer linking to the existing `.ruler/agent.md` to avoid duplicating process sources.
- **Optional screenshots guidance only**: if “as-built” screenshots are desired, document it as optional; do not add/modify app code for screenshotting.

## Risks / Trade-offs

- [Ports can vary on different machines] → Mitigation: document docs port explicitly (`4000`) and instruct that Vite prints the web URL in the terminal.
- [AI disclosure can be underspecified] → Mitigation: provide a clear `AI_USAGE.md` template that makes omissions obvious (model + representative prompts required).
- [README process link could drift again] → Mitigation: keep a single canonical pointer (either `.ruler/agent.md` or an alias file in root) and reference that consistently.
