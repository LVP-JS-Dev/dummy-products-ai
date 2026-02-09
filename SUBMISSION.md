# Submission: Dummy Products Admin

This repository implements the test task from `requirements/requirement.md`:
login → products list → search/sort → add product (local).

## How to run

```bash
pnpm i
pnpm dev
```

What starts:
- **Web app** (`apps/web`): `http://localhost:3001`.
- **Docs** (`apps/fumadocs`): `http://localhost:4000`.

Environment:
- No `.env` is required (DummyJSON base URL is `https://dummyjson.com`).

## Quick verification (2–3 minutes)

### 1) Login (`/login`)

- Submit with empty fields → required validation errors.
- Submit with invalid credentials → API error is shown on the form.
- Remember me:
  - OFF → auth is stored in `sessionStorage` (key: `dummy-products.auth`)
  - ON  → auth is stored in `localStorage` (key: `dummy-products.auth`)

### 2) Products (`/products`)

- Without a session, opening `/products` redirects to `/login`.
- Products load from DummyJSON and show a progress indicator while loading.
- Sorting: click sortable headers; sorting state is preserved (per requirements/PRD).
- Search: uses DummyJSON search API; results update after submitting the query.
- Rating highlight: rating `< 3` is rendered in red.
- Add product:
  - “Добавить” opens a modal with fields: name, price, vendor, article.
  - Validation on required fields.
  - Success shows a toast and closes the modal (no API save, per requirements).

## Known limitations (by scope)

- Added product is local only (not persisted via API).
- Sorting is applied to the current page of data.

## Useful commands

```bash
pnpm gen
pnpm test
pnpm check
```

## AI usage disclosure

See `AI_USAGE.md`.

## Optional: “as-built” screenshots

If you want to attach actual UI screenshots (not only the provided Figma references),
place them under `screenshots/` and reference them from this file.
