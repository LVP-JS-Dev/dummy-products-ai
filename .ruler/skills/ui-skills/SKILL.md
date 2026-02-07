---
name: ui-skills
description: This skill should be used when the user asks to "build UI", "create interface", "design components", "implement frontend", or needs guidance on building accessible, performant interfaces with proper animation, typography, and component patterns. Provides opinionated constraints for building better interfaces with agents.
---

# UI Skills

Opinionated constraints for building better interfaces with agents.

## Stack

- MUST use Tailwind CSS defaults (spacing, radius, shadows) before custom values (unless the project has an established design token system; then prefer tokens)
- MUST use `motion/react` (formerly `framer-motion`) when JavaScript animation is required
- MUST use `cn` utility (`clsx` + `tailwind-merge`) for class logic

## Components

- MUST use accessible component primitives for anything with keyboard or focus behavior (`Base UI`, `React Aria`, `Radix`)
- MUST use the project's existing component primitives first
- NEVER mix primitive systems within the same interaction surface
- If the project does not have an established primitive system yet, SHOULD prefer [`Base UI`](https://base-ui.com/react/components)
- MUST add an `aria-label` to icon-only buttons
- NEVER rebuild keyboard or focus behavior by hand unless explicitly requested

## Interaction

- MUST use an `AlertDialog` for destructive or irreversible actions
- SHOULD use structural skeletons for loading states
- NEVER use `h-screen`, use `h-dvh`
- MUST respect `safe-area-inset` for fixed elements
- MUST show errors next to where the action happens
- NEVER block paste in `input` or `textarea` elements

## Animation

- NEVER add animation unless it is explicitly requested
- If animation is explicitly requested, SHOULD use `tw-animate-css` for CSS entrance and micro-animations
- MUST animate only compositor props (`transform`, `opacity`)
- NEVER animate layout properties (`width`, `height`, `top`, `left`, `margin`, `padding`)
- SHOULD avoid animating paint properties (`background`, `color`) except for small, local UI (text, icons)
- If using entrance animations, SHOULD use `ease-out`
- NEVER exceed `200ms` for interaction feedback
- MUST pause looping animations when off-screen
- MUST respect `prefers-reduced-motion`
- NEVER introduce custom easing curves unless explicitly requested (or already defined by the project's established design tokens)
- SHOULD avoid animating large images or full-screen surfaces

## Typography

- MUST use `text-balance` for headings and `text-pretty` for body/paragraphs
- MUST use `tabular-nums` for data
- SHOULD use `truncate` or `line-clamp` for dense UI
- NEVER modify `letter-spacing` (`tracking-`) unless explicitly requested (or already defined by the project's established design tokens)

## Layout

- MUST use a fixed `z-index` scale (no arbitrary `z-x`)
- SHOULD use `size-x` for square elements instead of `w-x` + `h-x`

## Performance

- NEVER animate large `blur()` or `backdrop-filter` surfaces
- NEVER apply `will-change` outside an active animation
- NEVER use `useEffect` for anything that can be expressed as render logic

## Design

- NEVER use gradients unless explicitly requested
- If gradients are explicitly requested, SHOULD keep them subtle and single-hue; avoid purple or multicolor gradients unless explicitly requested
- NEVER use glow effects as primary affordances
- SHOULD use Tailwind CSS default shadow scale unless explicitly requested
- MUST give empty states one clear next action
- SHOULD limit accent color usage to one per view
- SHOULD use existing theme or Tailwind CSS color tokens before introducing new ones
