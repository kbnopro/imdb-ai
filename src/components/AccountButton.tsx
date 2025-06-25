import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { redirect } from "next/navigation";
import { LogOutIcon, SettingsIcon } from "lucide-react";

import { auth, signOut } from "@/server/auth";
import { ToggleSettingButton } from "@/features/settings/components/SettingModal/ToggleSettingButton";

export const AccountButton = async () => {
  const session = await auth();
  if (!session) redirect("/login");
  return (
    <Popover>
      <PopoverButton className="cursor-pointer overflow-hidden rounded-full">
        {session.user.name ? (
          <div className="size-fit p-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-600">
            <div className="flex size-8 items-center justify-center rounded-full bg-sky-500 text-white">
              <div className="h-fit grow">{session.user.name[0]}</div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </PopoverButton>
      <PopoverPanel
        className="z-50 w-64 rounded-lg border border-neutral-300 bg-white px-2 pt-3 pb-2 shadow-md dark:border-neutral-600 dark:bg-neutral-800 dark:shadow-neutral-700"
        anchor={{
          to: "bottom end",
          gap: "5px",
        }}
      >
        <div className="flex h-fit w-full flex-col items-stretch justify-start gap-1">
          <div className="mb-1 flex h-fit w-full flex-col items-start justify-start border-b border-b-neutral-200 px-2 pb-2 dark:border-neutral-600">
            <div className="text-xs text-neutral-800 dark:text-white">
              {session.user.name}
            </div>
            <div className="text-xs text-neutral-800 dark:text-white">
              {session.user.email}
            </div>
          </div>
          <ToggleSettingButton>
            <div className="flex w-full cursor-pointer items-center justify-start gap-2 rounded-lg p-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-700">
              <SettingsIcon className="size-4" />
              <div className="text-sm">Settings</div>
            </div>
          </ToggleSettingButton>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button
              type="submit"
              className="flex w-full cursor-pointer items-center justify-start gap-2 rounded-lg p-2 text-sm text-neutral-700 hover:bg-neutral-100 dark:text-neutral-100 dark:hover:bg-neutral-700"
            >
              <LogOutIcon className="size-4" />
              <div className="text-sm">Log out</div>
            </button>
          </form>
        </div>
      </PopoverPanel>
    </Popover>
  );
};
