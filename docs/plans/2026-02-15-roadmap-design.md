---
title: Roadmap Source + Generated View
date: 2026-02-15
status: approved
---

# Summary

Add a simple roadmap system where `docs/ROADMAP.md` is the human-edited source of truth and `docs/ROADMAP.generated.md` is a generated view. A small Node `.mjs` generator keeps the view in sync. CI/`pnpm check` will fail if the generated file is out of date. Rules for agents live in `.ruler/roadmap.md`, and the README links to the roadmap.

# Goals

- Keep roadmap editing simple (Markdown source).
- Provide a consistent generated view for docs.
- Ensure CI fails when the generated view is stale.
- Document rules for agents in `.ruler/roadmap.md`.

# Non-Goals

- No complex schema or external tooling.
- No automatic task completion or integration with issue trackers.

# Architecture

- **Source:** `docs/ROADMAP.md`
- **Generated view:** `docs/ROADMAP.generated.md`
- **Generator:** `scripts/roadmap/generate.mjs`
- **Check:** `pnpm roadmap:check` in existing checks pipeline
- **Rules:** `.ruler/roadmap.md`

# Roadmap Source Format

`docs/ROADMAP.md` uses a strict, parseable format:

- Sections: `## In Progress`, `## Planned`, `## Done`
- Items: markdown checkboxes with area tags
  - `- [ ] [area:ci] CI for GHCR images`
  - `- [x] [area:docs] Document local fallback`

# Generated View

`docs/ROADMAP.generated.md` contains:

- A header indicating it is generated
- A table with columns `Area | Item | Status`
- Grouped in the order: In Progress → Planned → Done

# CI / Check Integration

Add commands:

- `pnpm roadmap:gen` to regenerate the view
- `pnpm roadmap:check` to fail if `docs/ROADMAP.generated.md` is stale

Include `pnpm roadmap:check` in existing `pnpm check` (no new pipeline).

# Documentation

- Update `README.md` with a short Roadmap section and links.
- Add `.ruler/roadmap.md` with rules for agents and contributors.

# Testing

- Validate by running `pnpm roadmap:check`
