"use client";

import { useSettingModalStore } from "@settings/stores/settingModalStore";
import type { ButtonProps } from "@/types/HTMLProps";

export const ToggleSettingButton = ({
  children,
  onClick,
  newIsOpen,
  ...props
}: ButtonProps & { newIsOpen?: boolean }) => {
  const setIsOpen = useSettingModalStore((state) => state.setIsOpen);
  return (
    <button
      onClick={(e) => {
        setIsOpen(newIsOpen);
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </button>
  );
};
