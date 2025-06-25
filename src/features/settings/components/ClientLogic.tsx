"use client";
import { useEffect } from "react";
import { useColorSchemeStore } from "@settings/stores/colorSchemeStore";
import { isColorScheme } from "@/utils/isColorScheme";

let didCheckInitialTheme = false;

export const ClientLogic = () => {
  const setSelectedScheme = useColorSchemeStore(
    (state) => state.setSelectedColorScheme,
  );
  useEffect(() => {
    if (!didCheckInitialTheme) {
      didCheckInitialTheme = true;
      const theme = localStorage.getItem("theme");
      setSelectedScheme(isColorScheme(theme) ? theme : null);
    }
  });
  return <></>;
};
