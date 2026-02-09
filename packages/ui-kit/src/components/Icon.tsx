import type { IconProps } from "../contracts/IconContract";
import { icons } from "../Icons";

export function Icon({ name, size = 24, color, title }: IconProps) {
  const svg = icons[name as keyof typeof icons];

  if (title) {
    return (
      <span
        aria-label={title}
        // biome-ignore lint/security/noDangerouslySetInnerHtml: SVGs are static, internal assets (no user input).
        dangerouslySetInnerHTML={{ __html: svg }}
        role="img"
        style={{
          display: "inline-flex",
          width: size,
          height: size,
          color,
          lineHeight: 0,
        }}
      />
    );
  }

  return (
    <span
      aria-hidden
      // biome-ignore lint/security/noDangerouslySetInnerHtml: SVGs are static, internal assets (no user input).
      dangerouslySetInnerHTML={{ __html: svg }}
      style={{
        display: "inline-flex",
        width: size,
        height: size,
        color,
        lineHeight: 0,
      }}
    />
  );
}
