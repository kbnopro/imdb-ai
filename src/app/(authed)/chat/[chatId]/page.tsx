import { redirect } from "next/navigation";

import { auth } from "@/server/auth";

export default async function ChatPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return <main>This is chat page</main>;
}
