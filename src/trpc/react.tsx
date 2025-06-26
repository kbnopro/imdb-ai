"use client";

import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import {
  createTRPCClient,
  httpBatchStreamLink,
  loggerLink,
} from "@trpc/client";
import { type AnyRouter } from "@trpc/server";
import SuperJSON from "superjson";

import { createQueryClient } from "./query-client";
import { type chatRouter } from "@/server/api/routers/chat";

let clientQueryClientSingleton: QueryClient | undefined = undefined;
const getQueryClient = () => {
  if (typeof window === "undefined") {
    // Server: always make a new query client
    return createQueryClient();
  }
  // Browser: use singleton pattern to keep the same query client
  clientQueryClientSingleton ??= createQueryClient();
  return clientQueryClientSingleton;
};

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={getQueryClient()}>
      {props.children}
    </QueryClientProvider>
  );
}

function getBaseUrl() {
  if (typeof window !== "undefined") return window.location.origin;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

const trpcClient = createTRPCClient<AnyRouter>({
  links: [
    loggerLink({
      enabled: (op) =>
        process.env.NODE_ENV === "development" ||
        (op.direction === "down" && op.result instanceof Error),
    }),
    httpBatchStreamLink({
      transformer: SuperJSON,
      url: getBaseUrl() + "/api/trpc",
      headers: () => {
        const headers = new Headers();
        headers.set("x-trpc-source", "nextjs-react");
        return headers;
      },
    }),
  ],
});

const createApi = <TRouter extends AnyRouter>() => {
  return createTRPCOptionsProxy<TRouter>({
    client: trpcClient,
    queryClient: getQueryClient,
  });
};

export const chatApi = createApi<typeof chatRouter>();
