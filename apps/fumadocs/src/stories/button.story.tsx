"use client";

import { Button, states } from "@dummy-products/ui-kit";
import { useState } from "react";

export function WithControl() {
  const base = states.button.Default;
  const [text, setText] = useState<string>(base.text);
  const [showIcon, setShowIcon] = useState<boolean>(Boolean(base.showIcon));
  const [showLabel, setShowLabel] = useState<boolean>(
    Boolean(base.showBadgeLabel)
  );
  const [showCount, setShowCount] = useState<boolean>(
    Boolean(base.showBadgeCount)
  );
  const [childMode, setChildMode] = useState<boolean>(false);
  const [variant, setVariant] = useState<
    "blue" | "secondary" | "icon" | "ghost"
  >(base.variant ?? "blue");

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Button
        {...base}
        showBadgeCount={showCount}
        showBadgeLabel={showLabel}
        showIcon={showIcon}
        text={text}
        variant={variant}
      >
        {childMode ? (
          <>
            <span aria-hidden>★</span>
            <span>{text || "Button"}</span>
          </>
        ) : undefined}
      </Button>
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
          <span>Variant</span>
          <select
            onChange={(event) =>
              setVariant(
                event.target.value as "blue" | "secondary" | "icon" | "ghost"
              )
            }
            value={variant}
          >
            <option value="blue">blue</option>
            <option value="secondary">secondary</option>
            <option value="icon">icon</option>
            <option value="ghost">ghost</option>
          </select>
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
        <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <input
            checked={childMode}
            onChange={(event) => setChildMode(event.target.checked)}
            type="checkbox"
          />
          Children mode
        </label>
      </div>
    </div>
  );
}

export const story = { WithControl };
