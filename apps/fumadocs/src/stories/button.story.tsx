"use client";

import * as React from "react";
import { Button, states } from "@dummy-products/ui-kit";

export const story = {
  WithControl() {
    const base = states.button.Default;
    const [text, setText] = React.useState(base.text);
    const [showIcon, setShowIcon] = React.useState(Boolean(base.showIcon));
    const [showLabel, setShowLabel] = React.useState(Boolean(base.showBadgeLabel));
    const [showCount, setShowCount] = React.useState(Boolean(base.showBadgeCount));

    return (
      <div style={{ display: "grid", gap: 16 }}>
        <Button
          {...base}
          text={text}
          showIcon={showIcon}
          showBadgeLabel={showLabel}
          showBadgeCount={showCount}
        />
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <label style={{ display: "grid", gap: 4 }}>
            <span>Text</span>
            <input
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input
              type="checkbox"
              checked={showIcon}
              onChange={(event) => setShowIcon(event.target.checked)}
            />
            Icon
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input
              type="checkbox"
              checked={showLabel}
              onChange={(event) => setShowLabel(event.target.checked)}
            />
            Label
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input
              type="checkbox"
              checked={showCount}
              onChange={(event) => setShowCount(event.target.checked)}
            />
            Count
          </label>
        </div>
      </div>
    );
  },
};
