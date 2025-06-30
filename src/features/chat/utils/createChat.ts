import { db } from "@/server/db";

export const createChat = async ({
  name,
  userId,
}: {
  name?: string;
  userId: string;
}) => {
  return await db.chat.create({
    data: {
      name,
      userId,
    },
  });
};
