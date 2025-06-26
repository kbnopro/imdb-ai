import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { createChat } from "@chat/utils/createChat";
import { getChats } from "@/features/chat/utils/getChats";

const chatRouterInternal = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
      }),
    )
    .mutation(({ input, ctx }) => {
      return createChat({
        name: input.name,
        userId: ctx.session.user.id,
      });
    }),
  getList: protectedProcedure.query(({ ctx }) => {
    return getChats({
      userId: ctx.session.user.id,
    });
  }),
});

export const chatRouter = createTRPCRouter({
  chat: chatRouterInternal,
});
