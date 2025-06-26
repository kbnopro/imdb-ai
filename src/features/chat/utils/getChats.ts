import { db } from "@/server/db";

export const getChats = ({ userId }: { userId: string }) => {
  return db.chat.findMany({
    where: {
      userId,
    },
  });
};
