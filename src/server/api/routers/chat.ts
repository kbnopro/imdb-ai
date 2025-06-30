import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { createChat } from "@chat/utils/createChat";
import { getChats } from "@chat/utils/getChats";
import { renameChat } from "@chat/utils/renameChat";

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
  rename: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      }),
    )
    .mutation(({ input, ctx }) => {
      return renameChat({
        userId: ctx.session.user.id,
        id: input.id,
        name: input.name,
      });
    }),
});

export const chatRouter = createTRPCRouter({
  chat: chatRouterInternal,
});
