import { COLOR_SCHEMES, type ColorSchemes } from "@/types/constants";

export const isColorScheme = (scheme: string | null): scheme is ColorSchemes =>
  !!scheme && (COLOR_SCHEMES as readonly string[]).includes(scheme);
