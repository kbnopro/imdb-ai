import { create } from "zustand";

interface SettingModalStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean | undefined) => void;
}

export const useSettingModalStore = create<SettingModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean | undefined) =>
    set((state) => {
      if (isOpen !== undefined) {
        return { isOpen };
      }
      return { isOpen: !state.isOpen };
    }),
}));
