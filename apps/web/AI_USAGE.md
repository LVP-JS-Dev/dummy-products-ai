# AI Usage

This project was implemented with assistance from an AI coding agent.

## Model

- GPT-5.2 (Codex)

## Prompts / Instructions Used

- "Start a new change using the experimental artifact-driven approach."
- "Fast-forward through artifact creation - generate everything needed to start implementation."
- "Implement tasks from an OpenSpec change."
- Follow-up clarifications provided during the session, including:
  - add-product is UI-only (no API write, no list/search mutation, not persisted across reload)
  - auth remember-me stores token + username; logout clears all; force-logout on 401
  - products field mapping (vendor=brand, article=sku or id), pagination via limit/skip
  - sorting includes name/price/rating; applies to current page only; persisted per remember-me
  - search is debounced, empty query shows full list, query stored in URL

