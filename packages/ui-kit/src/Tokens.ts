export const tokenCssVars = {
  color: {
    white: "var(--ui-color-white)",
    blue: {
      primary: "var(--ui-color-blue-primary)",
      accent: "var(--ui-color-blue-accent)",
    },
    green: {
      soft: "var(--ui-color-green-soft)",
    },
    gray: {
      200: "var(--ui-color-gray-200)",
      400: "var(--ui-color-gray-400)",
    },
    text: {
      primary: "var(--ui-color-text-primary)",
      placeholder: "var(--ui-color-text-placeholder)",
    },
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
