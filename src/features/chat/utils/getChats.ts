import { db } from "@/server/db";

export const getChats = async ({ userId }: { userId: string }) => {
  return await db.chat.findMany({
    where: {
      userId,
    },
  });
};
