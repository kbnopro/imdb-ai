import { type inferRouterOutputs } from "@trpc/server";
import { type chatRouter } from "@/server/api/routers/chat";
import clsx from "clsx";
import Link from "next/link";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useChatsContext } from "./ChatsContext";

type ChatProps = inferRouterOutputs<
  typeof chatRouter
>["chat"]["getList"][number];

export const Chat = ({ chat }: { chat: ChatProps }) => {
  const { pathname } = useChatsContext();
  const href = `/chat/${chat.id}`;
  const active = pathname == href;
  return (
    <div
      key={chat.id}
      className={clsx(
        "group flex w-full items-center gap-0.5 rounded-lg",
        active
          ? "bg-black/10 dark:bg-neutral-700/80"
          : "hover:bg-black/5 dark:hover:bg-neutral-700/40",
      )}
    >
      <Link className="w-0 grow py-1.5 pr-1 pl-2.5" href={href}>
        <div className="line-clamp-1 break-all">
          <div>{chat.name}</div>
        </div>
      </Link>
      <Menu>
        <MenuButton className="mr-1 hidden cursor-pointer rounded-lg p-1 group-focus-within:inline group-hover:inline hover:bg-black/10 data-open:inline dark:hover:bg-neutral-600 pointer-coarse:inline">
          <EllipsisIcon className="size-5" />
        </MenuButton>
        <MenuItems
          as="div"
          className="flex h-fit w-fit flex-col gap-2 space-y-1 rounded-lg border border-gray-200 bg-neutral-100 p-1.5 shadow-md data-open:block dark:border-neutral-600 dark:bg-neutral-700 dark:shadow-neutral-800/80"
          anchor={{ to: "bottom start", gap: "4px" }}
        >
          <MenuItem
            as="button"
            className="flex w-full cursor-pointer items-center justify-start gap-2 rounded-lg px-3 py-2 data-focus:bg-black/10 dark:data-focus:bg-white/10"
          >
            <PencilIcon className="size-5" />
            <div>Rename chat</div>
          </MenuItem>
          <MenuItem
            as="button"
            className="flex w-full cursor-pointer items-center justify-start gap-2 rounded-lg px-3 py-2 text-red-500 data-focus:bg-black/10 dark:text-red-400 dark:data-focus:bg-white/10"
          >
            <TrashIcon className="size-5" />
            <div>Delete chat</div>
          </MenuItem>
        </MenuItems>
      </Menu>
    </div>
  );
};
