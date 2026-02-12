<!-- Context: project-intelligence/technical | Priority: critical | Version: 1.0 | Updated: 2025-02-11 -->

# Technical Domain

**Purpose**: Tech stack, architecture, and development patterns for contract-first UI monorepo.
**Last Updated**: 2025-02-11

## Quick Reference

**Update Triggers**: Tech stack changes | New component patterns | Architecture decisions
**Audience**: Developers, AI agents

## Primary Stack

| Layer | Technology | Version | Rationale |
|-------|-----------|---------|-----------|
| Framework | React | 19.2.3 | Latest stable, concurrent rendering |
| Build Tool | Vite | 6.2.2 | Fast dev server, optimized builds |
| Router | TanStack Router | 1.141.1 | Type-safe routing, loaders |
| Styling | Tailwind CSS | 4.0.15 | Utility-first, CSS variables |
| State Management | TanStack Form/Table | latest | Server-state optimization |
| Validation | Zod | catalog | Runtime type safety |
| Package Manager | pnpm | 10.27.0 | Efficient workspace management |
| Testing | Vitest + RTL | latest | Fast unit + integration tests |

## Code Patterns

### Programmatic Route

```typescript
import { createRoute } from "@tanstack/react-router";

export const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/products",
  beforeLoad: async () => {
    const session = await loadAuthSession();
    if (!session) throw redirect({ to: "/login" });
  },
  loader: async () => await fetchProducts(),
  component: ProductsPage,
});
```

### Contract-First Component

```typescript
// Contract: packages/ui-kit/src/contracts/CardContract.ts
export const cardContract = z.object({
  size: z.enum(["default", "sm"]).optional(),
  outlined: z.boolean().optional(),
  title: z.string().optional(),
});

// Component: packages/ui-kit/src/components/Card.tsx
import type { CardProps } from "../contracts/CardContract";

"use client";
export function Card({ size, outlined, title, children }: CardProps) {
  return <div>{title}{children}</div>;
}
```

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | Card.tsx, Button.tsx |
| Contracts | PascalCase + "Contract" | CardContract.ts |
| States | PascalCase + "States" | CardStates.ts |
| Stories | kebab-case + ".story.tsx" | card.story.tsx |
| Routes | PascalCase + "Route" | productsRoute, loginRoute |

## Code Standards

- Contract-first: Contract → Type → Component → States (one-way flow)
- React imports: Named only (`useState`, not `* as React`)
- "use client" directive in `.tsx` when client-side needed
- Component props MUST come from contracts
- States as public API, not demo examples
- Run `pnpm gen` after contract/component changes
- Generated files must stay in sync (no drift)
- Ternary operators forbidden in `.ts` files, allowed in JSX
- UI tokens via CSS variables (var(--ui-space-md))
- TypeScript strict mode enabled

## Security Requirements

- Session-based authentication for protected routes
- Zod validation for all user input
- Environment variables for secrets
- Parameterized queries for database access

## 📂 Codebase References

**Component Pattern**: `packages/ui-kit/src/components/Card.tsx` - Contract-first component structure
**Contract Example**: `packages/ui-kit/src/contracts/CardContract.ts` - Zod schema definition
**States Pattern**: `packages/ui-kit/src/states/CardStates.ts` - Public API states
**Route Pattern**: `apps/web/src/routes/index.tsx` - TanStack Router usage
**Story Pattern**: `apps/fumadocs/src/stories/card.story.tsx` - Component documentation
**Config**: `package.json`, `pnpm-workspace.yaml`, `turbo.json`

## Related Files

- [Business Domain](business-domain.md)
- [Decisions Log](decisions-log.md)
