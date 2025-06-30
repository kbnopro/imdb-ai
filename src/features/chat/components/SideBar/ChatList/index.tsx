"use client";

import { chatApi } from "@/trpc/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { ChatsProvider } from "./ChatsContext";
import { Chat } from "./Chat";

const Chats = () => {
  const chatListQuery = useSuspenseQuery(chatApi.chat.getList.queryOptions());
  const pathname = usePathname();

  return (
    <div className="flex w-full flex-col items-start justify-start gap-1">
      <ChatsProvider pathname={pathname}>
        {chatListQuery.data.map((chat) => (
          <Chat key={chat.id} chat={chat} />
        ))}
      </ChatsProvider>
    </div>
  );
};

export const ChatList = () => {
  return (
    <div className="flex size-full flex-col items-start gap-3 px-2">
      <div className="ml-4 font-semibold text-neutral-500 dark:text-neutral-400">
        Chats
      </div>
      <Chats />
    </div>
  );
};
