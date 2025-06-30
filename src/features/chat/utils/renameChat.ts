import { db } from "@/server/db";

export const renameChat = async ({
  userId,
  id,
  name,
}: {
  userId: string;
  id: string;
  name: string;
}) => {
  const res = await db.chat.updateMany({
    where: {
      id,
      userId,
    },
    data: {
      name,
    },
  });
  if (!res.count) {
    throw new Error(
      "Chat not found or you do not have permission to rename it.",
    );
  }
  return res;
};
