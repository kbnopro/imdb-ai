"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useSettingModalStore } from "@settings/stores/settingModalStore";
import { ColorMode } from "./ColorMode";

export const SettingsModal = () => {
  const isOpen = useSettingModalStore((state) => state.isOpen);
  const setIsOpen = useSettingModalStore((state) => state.setIsOpen);
  if (!isOpen) {
    return <></>;
  }
  return (
    <Dialog onClose={() => setIsOpen(false)} open={isOpen}>
      <DialogBackdrop className="fixed inset-0 z-20 bg-black/20 backdrop-blur-sm" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 z-50 flex w-screen items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <DialogPanel className="h-fit w-full max-w-lg rounded-lg bg-neutral-50 p-4 dark:bg-neutral-700/50">
          <DialogTitle className="border-b border-neutral-400 pb-2 text-lg font-bold">
            Settings
          </DialogTitle>
          <div className="flex flex-col">
            <ColorMode />
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
