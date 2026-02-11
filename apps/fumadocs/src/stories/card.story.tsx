"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  states,
} from "@dummy-products/ui-kit";

export function WithControl() {
  const base = states.card.Default;

  return (
    <Card {...base} style={{ maxWidth: 420 }}>
      <CardHeader>
        <CardTitle>{base.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div>Контент карточки</div>
      </CardContent>
      <CardFooter>
        <button
          style={{
            border: "1px solid var(--ui-color-border)",
            borderRadius: "var(--ui-radius-sm)",
            background: "var(--ui-color-surface)",
            padding: "2px var(--ui-space-sm)",
          }}
          type="button"
        >
          Действие
        </button>
      </CardFooter>
    </Card>
  );
}

export const story = { WithControl };
