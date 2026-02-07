export const colors = {
  blue: {
    primary: "#242EDB",
    accent: "#367AFF",
    muted: "#797FEA",
    deep: "#3C538E",
  },
  text: {
    primary: "#222222",
    secondary: "#333333",
    muted: "#6C6C6C",
    placeholder: "#999999",
  },
  gray: {
    100: "#F9F9F9",
    200: "#ECECEB",
    300: "#E2E2E2",
    400: "#B2B3B9",
    500: "#C4C4C4",
  },
  white: "#FFFFFF",
  black: "#000000",
  green: {
    soft: "#EBF3EA",
  },
} as const;

export const radii = {
  sm: 4,
  md: 6,
  lg: 8,
  xl: 10,
  xxl: 12,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 16,
  xxl: 20,
  xxxl: 30,
} as const;

export const typography = {
  heading: "Cairo, sans-serif",
  body: "Open Sans, sans-serif",
  ui: "Inter, sans-serif",
  mono: "Roboto Mono, monospace",
} as const;

export const shadows = {
  soft: "0px 24px 32px 0px rgba(0, 0, 0, 0.04)",
  deep: "0px 20px 50px 0px rgba(0, 0, 0, 0.12)",
} as const;
