import { AccountButton } from "@/components/AccountButton";

export const TopBar = () => {
  return (
    <div className="w-full">
      <div className="flex h-fit w-full items-center justify-between px-3 py-2">
        <h1 className="text-xl font-medium">IMDB Chat</h1>
        <AccountButton />
      </div>
    </div>
  );
};
