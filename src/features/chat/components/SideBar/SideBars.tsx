"use client";

import { IMDBIcon } from "@/components/icons/IMDBIcon";
import { useSideBarStore } from "@chat/stores/sideBarStore";
import {
  PencilLineIcon,
  SidebarCloseIcon,
  SidebarOpenIcon,
} from "lucide-react";
import { ChatList } from "./ChatList";
import { CustomLink } from "./CustomLink";
import { useRef } from "react";
import clsx from "clsx";
import { useScrollPosition } from "@/hooks/useScrollPosition";

export const SmallSideBar = () => {
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
        <CustomLink href="/">
          <PencilLineIcon className="relative size-5" />
        </CustomLink>
      </div>
    </div>
  );
};

export const ExpandedSideBar = () => {
  const { isOpen, setIsOpen } = useSideBarStore((state) => state);
  const ref = useRef<null | HTMLDivElement>(null);
  const scrollPosition = useScrollPosition(ref.current);
  if (!isOpen) {
    return <></>;
  }
  return (
    <div
      ref={ref}
      className={clsx(
        "sidebar-scrollbar dark:sidebar-scrollbar-dark flex h-screen w-86 flex-col items-start justify-start gap-5 overflow-x-auto border-r border-neutral-300 bg-neutral-50 text-neutral-900 dark:border-neutral-900 dark:bg-neutral-900 dark:text-neutral-200",
      )}
    >
      <div
        className={clsx(
          "sticky top-0 z-10 flex w-full flex-col items-start justify-start gap-5 bg-neutral-50 px-2 shadow-sm transition-all duration-300 dark:bg-neutral-900",
          scrollPosition
            ? "shadow-neutral-300 dark:shadow-neutral-700/40"
            : "shadow-transparent",
        )}
      >
        <div className="mt-3.5 flex w-full shrink-0 items-center justify-between">
          <IMDBIcon className="ml-1.5 inline size-5" />
          <button
            onClick={() => setIsOpen(false)}
            className="flex w-fit cursor-pointer items-center justify-center rounded-lg p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-700"
          >
            <SidebarCloseIcon className="size-5" />
          </button>
        </div>
        <div className="flex w-full grow flex-col items-start justify-start gap-2">
          <CustomLink href="/">
            <PencilLineIcon className="relative bottom-px size-5" />
            <div>New chat</div>
          </CustomLink>
        </div>
      </div>
      <ChatList />
    </div>
  );
};
