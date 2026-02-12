## Context

The login route (`apps/web/src/routes/login.tsx`) renders a centered card with a title (“Добро пожаловать!”) and subtitle (“Пожалуйста, авторизируйтесь”). The desired visual design specifies two inner-shadow treatments for these texts and a much narrower card width constraint than the current `min(100%, 420px)` container.

## Goals / Non-Goals

**Goals:**
- Define reusable CSS classes that implement the specified inner-shadow text treatments.
- Apply the classes to the exact title/subtitle strings on the login screen.
- Constrain the login card/container to an adaptive `max-width: 180px` while keeping it responsive on small viewports (`width: 100%`).

**Non-Goals:**
- Changing auth/session behavior, validation rules, or API integration.
- Updating `packages/ui-kit` component contracts/states.
- Refactoring global styling architecture or introducing a new styling system.

## Decisions

1. Implement the “inner shadow” as `text-shadow` for text nodes.
   - Rationale: `box-shadow` applies to element boxes, not glyphs; `text-shadow` maps directly to the Figma offsets/blur/opacity for the text effect.
   - Alternative: Use `box-shadow` on wrappers. Rejected because it does not produce a true text treatment and would require background/masks.

2. Define `.inner-shadow` and `.inner-shadow-top` in `apps/web/src/index.css`.
   - Rationale: These are page-level utility classes used directly by the login route; no UI-kit API changes required.
   - Alternative: Add to UI kit. Rejected to avoid expanding UI-kit surface for a single screen tweak.

3. Apply the width constraint at the login page container that currently uses `width: "min(100%, 420px)"`.
   - Replace it with a `width: "100%"` + `maxWidth: "180px"` (or `width: "min(100%, 180px)"`) so the card remains usable on narrow screens while matching the requested cap.

## Risks / Trade-offs

- [Risk] Text-shadow can reduce text contrast on some backgrounds. → Mitigation: keep opacity values exactly as specified and apply only to the two headline texts.
- [Risk] A strict 180px cap can make the form feel cramped. → Mitigation: keep adaptive behavior (`width: 100%`) and verify input layout remains usable.
