"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useSettingModalStore } from "@settings/stores/settingModalStore";

export const SettingsModal = () => {
  const isOpen = useSettingModalStore((state) => state.isOpen);
  const setIsOpen = useSettingModalStore((state) => state.setIsOpen);
  if (!isOpen) {
    return <></>;
  }
  return (
    <Dialog onClose={() => setIsOpen(false)} open={isOpen}>
      <DialogBackdrop className="fixed inset-0 bg-black/20 backdrop-blur-sm" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <DialogPanel className="h-72 w-full max-w-lg rounded-lg bg-gray-50 p-4">
          <DialogTitle className="border-b border-gray-400 pb-2 text-lg font-bold">
            Settings
          </DialogTitle>
          <div className="flex flex-col">
            <div className="text-md text-md flex justify-between border-b border-gray-200 px-1 py-3">
              <div>Theme</div>
              <div>Dark Light System</div>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
