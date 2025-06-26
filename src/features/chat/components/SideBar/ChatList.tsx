"use client";

import { chatApi } from "@/trpc/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CustomLink } from "./CustomLink";

const Chats = () => {
  const chatListQuery = useSuspenseQuery(chatApi.chat.getList.queryOptions());
  return (
    <div className="flex w-full flex-col items-start justify-start gap-1">
      {chatListQuery.data.map((chat) => (
        <CustomLink href={`/chat/${chat.id}`} key={chat.id}>
          <div className="line-clamp-1">
            <p>{chat.name}</p>
          </div>
        </CustomLink>
      ))}
    </div>
  );
};

export const ChatList = () => {
  return (
    <div className="flex size-full flex-col items-start gap-3 px-2">
      <div className="ml-2 font-medium dark:text-neutral-400">Chats</div>
      <Chats />
    </div>
  );
};
