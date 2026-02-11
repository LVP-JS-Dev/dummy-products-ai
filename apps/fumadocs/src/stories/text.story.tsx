"use client";

import { Text } from "@dummy-products/ui-kit";
import { useState } from "react";

export function WithControl() {
  const [content, setContent] = useState("Текст компонента");
  const [variant, setVariant] = useState<
    "body" | "muted" | "heading" | "label" | "caption" | "ui"
  >("body");

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Text variant={variant}>{content}</Text>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <label style={{ display: "grid", gap: 4 }}>
          <span>Content</span>
          <input
            onChange={(event) => setContent(event.target.value)}
            value={content}
          />
        </label>
        <label style={{ display: "grid", gap: 4 }}>
          <span>Variant</span>
          <select
            onChange={(event) =>
              setVariant(event.target.value as typeof variant)
            }
            value={variant}
          >
            <option value="body">body</option>
            <option value="muted">muted</option>
            <option value="heading">heading</option>
            <option value="label">label</option>
            <option value="caption">caption</option>
            <option value="ui">ui</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export const story = { WithControl };
