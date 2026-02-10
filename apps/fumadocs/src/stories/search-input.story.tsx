"use client";

import { SearchInput, states } from "@dummy-products/ui-kit";
import { useState } from "react";

export function WithControl() {
  const base = states.searchInput.Default;
  const [value, setValue] = useState<string>(base.value);
  const [state, setState] = useState<"inactive" | "active" | "disabled">(
    base.state
  );

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <SearchInput {...base} state={state} value={value} />
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <label style={{ display: "grid", gap: 4 }}>
          <span>Value</span>
          <input
            onChange={(event) => setValue(event.target.value)}
            value={value}
          />
        </label>
        <label style={{ display: "grid", gap: 4 }}>
          <span>State</span>
          <select
            onChange={(event) => setState(event.target.value as typeof state)}
            value={state}
          >
            <option value="inactive">Inactive</option>
            <option value="active">Active</option>
            <option value="disabled">Disabled</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export const story = { WithControl };
