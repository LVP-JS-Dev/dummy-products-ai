"use client";

import * as React from "react";
import { PageNumber, states } from "@dummy-products/ui-kit";

export const story = {
  WithControl() {
    const base = states.pageNumber.Default;
    const [value, setValue] = React.useState(String(base.value));
    const [selected, setSelected] = React.useState(base.selected);

    return (
      <div style={{ display: "grid", gap: 16 }}>
        <PageNumber value={value} selected={selected} />
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <label style={{ display: "grid", gap: 4 }}>
            <span>Value</span>
            <input
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input
              type="checkbox"
              checked={selected}
              onChange={(event) => setSelected(event.target.checked)}
            />
            Selected
          </label>
        </div>
      </div>
    );
  },
};
