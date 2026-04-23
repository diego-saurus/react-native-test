const light = {
  background: "#F2F4F7",
  foreground: "#1D2939",

  primary: "#429BF4",
  "primary-foreground": "#FFFFFF",

  destructive: "#F4212E",

  muted: "#98A2B3",
  "muted-foreground": "#0f1419",

  card: "#FFFFFF",

  icon: "#687076",
  input: "#FCFCFD",
  border: "#D0D5DD",
}

const dark: typeof light = {
  background: "#151718",
  foreground: "#e7e9ea",

  primary: light.primary,
  "primary-foreground": light.primary,

  destructive: light.destructive,

  muted: "#E5E5E6",
  "muted-foreground": "#72767a",

  card: "#0000000",

  icon: "#9BA1A6",
  input: "#22303c",
  border: "#242628",
}

export const SPACING_BASE = 4 as const
export const RADIUS_BASE = 8 as const

export const radius = {
  sm: RADIUS_BASE - 4,
  md: RADIUS_BASE - 2,
  lg: RADIUS_BASE,
  xl: RADIUS_BASE + 2,
  "2xl": RADIUS_BASE + 4,
  "3xl": RADIUS_BASE + 6,
  "4xl": RADIUS_BASE + RADIUS_BASE,
  full: 9999,
} as const

export const fontSize = {
  xs: 12,
  sm: 14,
  normal: 16,
  lg: 18,
  xl: 20,
  "2xl": 24,
} as const

export type ColorName = keyof typeof Colors.light
export const Colors = { light, dark }
