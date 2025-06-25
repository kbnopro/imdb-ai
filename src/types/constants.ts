export const COLOR_SCHEMES = ["light", "dark"] as const;

export type ColorSchemes = (typeof COLOR_SCHEMES)[number];
