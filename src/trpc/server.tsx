import "server-only";

import { headers } from "next/headers";
import { cache } from "react";

import { createTRPCContext } from "@/server/api/trpc";
import { createQueryClient } from "./query-client";
import {
  createTRPCOptionsProxy,
  type TRPCQueryOptions,
} from "@trpc/tanstack-react-query";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { AnyRouter } from "@trpc/server";
import { chatRouter } from "@/server/api/routers/chat";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = new Headers(await headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
  });
});

export const getQueryClient = cache(createQueryClient);

export function HydrateClient(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  );
}

export function prefetch<T extends ReturnType<TRPCQueryOptions<any>>>(
  queryOptions: T,
) {
  const queryClient = getQueryClient();
  if (queryOptions.queryKey[1]?.type === "infinite") {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    void queryClient.prefetchInfiniteQuery(queryOptions as any);
  } else {
    void queryClient.prefetchQuery(queryOptions);
  }
}

const createApi = <TRouter extends AnyRouter>(router: TRouter) => {
  return createTRPCOptionsProxy({
    ctx: createContext,
    router: router,
    queryClient: getQueryClient,
  });
};

// Callers to call from server components
export const chatCaller = chatRouter.createCaller(createContext);

// Used in prefetch on server components
export const chatApi = createApi(chatRouter);
