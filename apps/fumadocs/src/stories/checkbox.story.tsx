"use client";

import * as React from "react";
import { Checkbox, states } from "@dummy-products/ui-kit";

export const story = {
  WithControl() {
    const base = states.checkbox.Default;
    const [checked, setChecked] = React.useState(base.checked);
    const [label, setLabel] = React.useState(base.label ?? "");

    return (
      <div style={{ display: "grid", gap: 16 }}>
        <Checkbox checked={checked} label={label} />
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input
              type="checkbox"
              checked={checked}
              onChange={(event) => setChecked(event.target.checked)}
            />
            Checked
          </label>
          <label style={{ display: "grid", gap: 4 }}>
            <span>Label</span>
            <input
              value={label}
              onChange={(event) => setLabel(event.target.value)}
            />
          </label>
        </div>
      </div>
    );
  },
};
