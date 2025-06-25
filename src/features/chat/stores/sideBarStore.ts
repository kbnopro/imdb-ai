import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SideBarStore {
  isOpen: boolean;
  setIsOpen: (isOpen?: boolean) => void;
}

export const useSideBarStore = create<SideBarStore>()(
  persist(
    (set, get) => ({
      isOpen: true,
      setIsOpen: (isOpen?: boolean) => {
        if (isOpen === undefined) {
          set({ isOpen: !get().isOpen });
        }
        set({ isOpen });
      },
    }),
    {
      name: "side-bar-store",
    },
  ),
);
