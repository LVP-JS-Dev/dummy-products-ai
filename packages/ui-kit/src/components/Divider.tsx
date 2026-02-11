"use client";

import type { DividerProps } from "../contracts/DividerContract";

export function Divider({
  text,
  tone = "default",
  thickness = 1,
  children,
  className,
  style,
}: DividerProps) {
  const content = children ?? text;
  const lineColor =
    tone === "muted"
      ? "var(--ui-color-border-subtle)"
      : "var(--ui-color-border-subtle)";

  const lineStyle = {
    border: 0,
    borderTop: `${thickness}px solid ${lineColor}`,
    height: 0,
    margin: 0,
    width: "100%",
  } as const;

  if (!content) {
    return <hr className={className} style={{ ...lineStyle, ...style }} />;
  }

  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        gap: "var(--ui-space-md)",
        ...style,
      }}
    >
      <hr aria-hidden style={lineStyle} />
      <span
        style={{
          color: "var(--ui-color-text-muted)",
          fontSize: 16,
          fontWeight: 500,
          fontFamily: "var(--ui-font-ui)",
        }}
      >
        {content}
      </span>
      <hr aria-hidden style={lineStyle} />
    </div>
  );
}
