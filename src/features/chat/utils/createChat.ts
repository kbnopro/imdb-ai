import { db } from "@/server/db";

export const createChat = ({
  name,
  userId,
}: {
  name?: string;
  userId: string;
}) => {
  return db.chat.create({
    data: {
      name,
      userId,
    },
  });
};
