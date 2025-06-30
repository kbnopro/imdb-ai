import { createContext, useContext, type PropsWithChildren } from "react";

export interface ChatsProps {
  pathname: string;
}

const ChatsContext = createContext<ChatsProps | null>(null);

type ChatsProviderProps = PropsWithChildren<ChatsProps>;

export const ChatsProvider = ({ children, ...props }: ChatsProviderProps) => {
  return (
    <ChatsContext.Provider value={props}>{children}</ChatsContext.Provider>
  );
};

export const useChatsContext = () => {
  const props = useContext(ChatsContext);
  if (!props) {
    throw new Error("useChatsContext must be used within a ChatsProvider");
  }
  return props;
};
