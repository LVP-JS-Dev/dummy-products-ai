import * as React from "react";
import { icons } from "../icons";
import type { IconProps } from "../contracts/icon.contract";

export function Icon({ name, size = 24, color, title }: IconProps) {
  const svg = icons[name];

  return (
    <span
      aria-hidden={title ? undefined : true}
      aria-label={title}
      role={title ? "img" : undefined}
      style={{
        display: "inline-flex",
        width: size,
        height: size,
        color,
        lineHeight: 0,
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
