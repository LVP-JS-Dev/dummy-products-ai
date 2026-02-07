"use client";

import * as React from "react";
import { SearchInput, states } from "@dummy-products/ui-kit";

export const story = {
  WithControl() {
    const base = states.searchInput.Default;
    const [value, setValue] = React.useState(base.value);
    const [state, setState] = React.useState(base.state);

    return (
      <div style={{ display: "grid", gap: 16 }}>
        <SearchInput
          {...base}
          value={value}
          state={state}
        />
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <label style={{ display: "grid", gap: 4 }}>
            <span>Value</span>
            <input
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          </label>
          <label style={{ display: "grid", gap: 4 }}>
            <span>State</span>
            <select
              value={state}
              onChange={(event) => setState(event.target.value as typeof state)}
            >
              <option value="inactive">Inactive</option>
              <option value="active">Active</option>
              <option value="disabled">Disabled</option>
            </select>
          </label>
        </div>
      </div>
    );
  },
};
