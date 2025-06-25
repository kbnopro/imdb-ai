"use client";

import { useColorSchemeStore } from "@/features/settings/stores/colorSchemeStore";
import { LaptopIcon, SunIcon, MoonIcon } from "lucide-react";
import { clsx } from "clsx";
import { isColorScheme } from "@/utils/isColorScheme";

const SCHEME_OPTIONS = ["system", "light", "dark"] as const;
const SCHEME_ICONS = {
  system: LaptopIcon,
  light: SunIcon,
  dark: MoonIcon,
};

export const ColorMode = () => {
  const { selectedScheme, isSystemScheme, setSelectedColorScheme } =
    useColorSchemeStore((state) => state);
  const activeScheme = isSystemScheme ? "system" : selectedScheme;

  return (
    <div className="text-md flex flex-col justify-between gap-2 px-1 py-3">
      <div className="font-semibold">Color mode</div>
      <div>
        Choose whether to set the color mode or use the computer&apos;s system
        settings
      </div>
      <div className="flex justify-between gap-2">
        {SCHEME_OPTIONS.map((scheme) => {
          const isActive = activeScheme === scheme;
          const Icon = SCHEME_ICONS[scheme];
          return (
            <button
              key={scheme}
              className={clsx(
                "flex grow cursor-pointer items-center justify-center gap-2 rounded-lg py-1.5",
                isActive ? "ring-2 ring-blue-500" : "ring ring-neutral-500",
              )}
              onClick={() => {
                setSelectedColorScheme(isColorScheme(scheme) ? scheme : null);
              }}
            >
              <Icon className="relative bottom-px size-4 stroke-2" />
              <div className="w-fit">
                {scheme.charAt(0).toUpperCase() + scheme.slice(1)}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
