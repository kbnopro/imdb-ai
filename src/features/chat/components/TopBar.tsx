import { AccountButton } from "@/components/AccountButton";

export const TopBar = () => {
  return (
    <div className="w-full">
      <div className="flex h-fit w-full items-center justify-between border-b border-neutral-200 px-3 py-2 dark:border-neutral-700">
        <h1 className="text-xl font-medium">IMDB Chat</h1>
        <AccountButton />
      </div>
    </div>
  );
};
