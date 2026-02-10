"use client";

import { PageNumber, states } from "@dummy-products/ui-kit";
import { useState } from "react";

export function WithControl() {
  const base = states.pageNumber.Default;
  const [value, setValue] = useState<string>(String(base.value));
  const [selected, setSelected] = useState<boolean>(base.selected);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <PageNumber selected={selected} value={value} />
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <label style={{ display: "grid", gap: 4 }}>
          <span>Value</span>
          <input
            onChange={(event) => setValue(event.target.value)}
            value={value}
          />
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <input
            checked={selected}
            onChange={(event) => setSelected(event.target.checked)}
            type="checkbox"
          />
          Selected
        </label>
      </div>
    </div>
  );
}

export const story = { WithControl };
