export const tokenCssVars = {
  color: {
    surface: "var(--ui-color-surface)",
    surfaceMuted: "var(--ui-color-surface-muted)",
    border: "var(--ui-color-border)",
    primary: "var(--ui-color-primary)",
    onPrimary: "var(--ui-color-on-primary)",
    focusRing: "var(--ui-color-focus-ring)",
    text: "var(--ui-color-text)",
    textMuted: "var(--ui-color-text-muted)",
    successSurface: "var(--ui-color-success-surface)",
  },
  space: {
    sm: "var(--ui-space-sm)",
    md: "var(--ui-space-md)",
    lg: "var(--ui-space-lg)",
    xxl: "var(--ui-space-xxl)",
  },
  radius: {
    sm: "var(--ui-radius-sm)",
    md: "var(--ui-radius-md)",
    lg: "var(--ui-radius-lg)",
  },
  font: {
    heading: "var(--ui-font-heading)",
    ui: "var(--ui-font-ui)",
    body: "var(--ui-font-body)",
  },
} as const;
