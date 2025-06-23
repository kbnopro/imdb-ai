import { AccountButton } from "@/components/AccountButton";

export const TopBar = () => {
  return (
    <div className="w-full">
      <div className="flex h-fit w-full items-center justify-between px-3 py-2">
        <h1 className="text-lg font-bold">IMDB Chat</h1>
        <AccountButton />
      </div>
    </div>
  );
};
