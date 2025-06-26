import { chatApi, HydrateClient, prefetch } from "@/trpc/server";
import { ExpandedSideBar, SmallSideBar } from "./SideBars";

export const SideBar = () => {
  prefetch(chatApi.chat.getList.queryOptions());

  return (
    <>
      <HydrateClient>
        <SmallSideBar />
        <ExpandedSideBar />
      </HydrateClient>
    </>
  );
};
