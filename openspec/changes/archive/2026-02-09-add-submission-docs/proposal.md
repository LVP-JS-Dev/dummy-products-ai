## Why

The project is functionally ready for a test-task demo, but submission-critical information is fragmented: the repo lacks a clear verification guide, AI-usage disclosure, and has a broken process pointer (`AGENT.md` vs actual location). This change makes the submission experience deterministic for reviewers.

## What Changes

- Add `SUBMISSION.md` with a short, reviewer-friendly run + verification checklist aligned to `requirements/requirement.md` and `apps/web/PRD.md`.
- Add `AI_USAGE.md` capturing the model/tooling and representative prompts used (as requested in the assignment requirements).
- Update `README.md` to remove broken references and point to the correct operational rules file (currently `.ruler/agent.md`), and to link to `SUBMISSION.md`.
- (Optional) Add a small `screenshots/` section and guidance for "as-built" screenshots (without changing app code).

## Capabilities

### New Capabilities

- `submission-docs`: A standard, minimal submission documentation bundle (run steps, quick verification flow, known limitations, and AI usage disclosure) for this repo.

### Modified Capabilities

<!-- None. -->

## Impact

- Documentation-only changes in the repo root (`README.md`, new `SUBMISSION.md`, new `AI_USAGE.md`).
- No changes to runtime behavior, build outputs, or UI Kit contracts.
