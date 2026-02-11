"use client";

import { Spinner } from "@dummy-products/ui-kit";
import { useState } from "react";

export function WithControl() {
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Spinner label="Loading" size={size} />
      <label style={{ display: "grid", gap: 4, width: 160 }}>
        <span>Size</span>
        <select
          onChange={(event) => setSize(event.target.value as typeof size)}
          value={size}
        >
          <option value="sm">sm</option>
          <option value="md">md</option>
          <option value="lg">lg</option>
        </select>
      </label>
    </div>
  );
}

export const story = { WithControl };
