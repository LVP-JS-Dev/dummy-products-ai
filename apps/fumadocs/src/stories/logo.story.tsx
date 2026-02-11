"use client";

import { Logo, states } from "@dummy-products/ui-kit";

export function WithControl() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Logo {...states.logo.Default} />
      <Logo {...states.logo.DecorativeSmall} />
      <Logo {...states.logo.Large} />
    </div>
  );
}

export const story = { WithControl };
