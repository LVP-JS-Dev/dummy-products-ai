"use client";

import * as React from "react";
import { Icon, states } from "@dummy-products/ui-kit";

const options = [
  states.icon.Search.name,
  states.icon.UserLarge.name,
  states.icon.Alert.name,
] as const;

export const story = {
  WithControl() {
    const base = states.icon.Search;
    const [name, setName] = React.useState(base.name);
    const [size, setSize] = React.useState(base.size ?? 24);

    return (
      <div style={{ display: "grid", gap: 16 }}>
        <Icon name={name} size={size} />
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <label style={{ display: "grid", gap: 4 }}>
            <span>Name</span>
            <select
              value={name}
              onChange={(event) => setName(event.target.value as typeof name)}
            >
              {options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label style={{ display: "grid", gap: 4 }}>
            <span>Size</span>
            <input
              type="number"
              value={size}
              onChange={(event) => setSize(Number(event.target.value))}
            />
          </label>
        </div>
      </div>
    );
  },
};
