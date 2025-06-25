"use client";

import { IMDBIcon } from "@/components/icons/IMDBIcon";
import { useSideBarStore } from "@chat/stores/sideBarStore";
import {
  PencilLineIcon,
  SidebarCloseIcon,
  SidebarOpenIcon,
} from "lucide-react";
import Link from "next/link";

const SmallSideBar = () => {
  const { isOpen, setIsOpen } = useSideBarStore((state) => state);
  if (isOpen) {
    return <></>;
  }
  return (
    <div className="flex h-screen w-fit flex-col items-center justify-start gap-5 border-r border-gray-300 px-2 text-neutral-900 dark:border-neutral-900 dark:text-neutral-200">
      <button
        onClick={() => setIsOpen(true)}
        className="group mt-3.5 flex w-fit cursor-pointer items-center justify-center rounded-lg p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-700"
      >
        <IMDBIcon className="inline size-5 group-hover:hidden" />
        <SidebarOpenIcon className="hidden size-5 group-hover:inline" />
      </button>
      <div className="flex w-full flex-col items-center justify-start gap-2">
        <Link
          href="/"
          className="rounded-lg p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-700"
        >
          <PencilLineIcon className="size-5" />
        </Link>
      </div>
    </div>
  );
};

const ExpandedSideBar = () => {
  const { isOpen, setIsOpen } = useSideBarStore((state) => state);
  if (!isOpen) {
    return <></>;
  }
  return (
    <div className="flex h-screen w-72 flex-col items-start justify-start gap-5 border-r border-gray-300 px-2 text-neutral-900 dark:border-neutral-900 dark:bg-neutral-900 dark:text-neutral-200">
      <div className="mt-3.5 flex w-full items-center justify-between">
        <IMDBIcon className="ml-1.5 inline size-5" />
        <button
          onClick={() => setIsOpen(false)}
          className="flex w-fit cursor-pointer items-center justify-center rounded-lg p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-700"
        >
          <SidebarCloseIcon className="size-5" />
        </button>
      </div>
      <div className="flex w-full flex-col items-start justify-start gap-2">
        <Link
          href="/"
          className="flex gap-3 rounded-lg p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-700"
        >
          <PencilLineIcon className="size-5" />
          <div>New chat</div>
        </Link>
      </div>
    </div>
  );
};

export const SideBar = () => {
  return (
    <>
      <SmallSideBar />
      <ExpandedSideBar />
    </>
  );
};
