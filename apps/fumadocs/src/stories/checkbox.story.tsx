"use client";

import { Checkbox, states } from "@dummy-products/ui-kit";
import { useState } from "react";

export const story = {
  WithControl() {
    const base = states.checkbox.Default;
    const [checked, setChecked] = useState(base.checked);
    const [label, setLabel] = useState(base.label ?? "");

    return (
      <div style={{ display: "grid", gap: 16 }}>
        <Checkbox checked={checked} label={label} />
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input
              checked={checked}
              onChange={(event) => setChecked(event.target.checked)}
              type="checkbox"
            />
            Checked
          </label>
          <label style={{ display: "grid", gap: 4 }}>
            <span>Label</span>
            <input
              onChange={(event) => setLabel(event.target.value)}
              value={label}
            />
          </label>
        </div>
      </div>
    );
  },
};
