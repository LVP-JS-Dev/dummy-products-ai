"use client";

import { Icon, states } from "@dummy-products/ui-kit";
import { useState } from "react";

const options = [
  states.icon.Search.name,
  states.icon.UserLarge.name,
  states.icon.Alert.name,
] as const;

export function WithControl() {
  const base = states.icon.Search;
  const [name, setName] = useState<(typeof options)[number]>(base.name);
  const [size, setSize] = useState<number>(base.size ?? 24);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Icon name={name} size={size} />
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <label style={{ display: "grid", gap: 4 }}>
          <span>Name</span>
          <select
            onChange={(event) => setName(event.target.value as typeof name)}
            value={name}
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
            onChange={(event) => setSize(Number(event.target.value))}
            type="number"
            value={size}
          />
        </label>
      </div>
    </div>
  );
}

export const story = { WithControl };
