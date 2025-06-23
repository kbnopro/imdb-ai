import { create } from "zustand";

const COLOR_SCHEMES = ["light", "dark"];
type ColorSchemes = (typeof COLOR_SCHEMES)[number];

interface ColorSchemeStore {
  selectedScheme: ColorSchemes;
  isSystemScheme: boolean;
  setSelectedColorScheme: (scheme: ColorSchemes | null) => void;
}

export const useColorSchemeStore = create<ColorSchemeStore>((set) => ({
  selectedScheme: "light",
  isSystemScheme: false,
  setSelectedColorScheme: (scheme: ColorSchemes | null) => {
    if (scheme) {
      document.documentElement.dataset.theme = scheme;
      localStorage.setItem("theme", scheme);
      return set({ selectedScheme: scheme, isSystemScheme: false });
    }
    const systemTheme: ColorSchemes = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches
      ? "dark"
      : "light";
    document.documentElement.dataset.theme = systemTheme;
    localStorage.removeItem("theme");
    return set({ selectedScheme: systemTheme, isSystemScheme: true });
  },
}));
