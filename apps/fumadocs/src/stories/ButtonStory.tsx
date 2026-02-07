"use client";

import { Button, states } from "@dummy-products/ui-kit";
import { useState } from "react";

export const story = {
  WithControl() {
    const base = states.button.Default;
    const [text, setText] = useState(base.text);
    const [showIcon, setShowIcon] = useState(Boolean(base.showIcon));
    const [showLabel, setShowLabel] = useState(Boolean(base.showBadgeLabel));
    const [showCount, setShowCount] = useState(Boolean(base.showBadgeCount));

    return (
      <div style={{ display: "grid", gap: 16 }}>
        <Button
          {...base}
          showBadgeCount={showCount}
          showBadgeLabel={showLabel}
          showIcon={showIcon}
          text={text}
        />
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <label style={{ display: "grid", gap: 4 }}>
            <span>Text</span>
            <input
              onChange={(event) => setText(event.target.value)}
              value={text}
            />
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input
              checked={showIcon}
              onChange={(event) => setShowIcon(event.target.checked)}
              type="checkbox"
            />
            Icon
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input
              checked={showLabel}
              onChange={(event) => setShowLabel(event.target.checked)}
              type="checkbox"
            />
            Label
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input
              checked={showCount}
              onChange={(event) => setShowCount(event.target.checked)}
              type="checkbox"
            />
            Count
          </label>
        </div>
      </div>
    );
  },
};
