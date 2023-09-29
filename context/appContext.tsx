import React, {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";
import { UserTypes } from "@/types/types";

interface Props {
  children: ReactNode;
}

interface ContextProviderProps {
  users: UserTypes | null;
  setUsers: Dispatch<SetStateAction<UserTypes | null>>;
}

export const MainContext = createContext<ContextProviderProps | null>(null);

const ContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [users, setUsers] = useState<UserTypes | null>(null);

  return (
    <MainContext.Provider value={{ users, setUsers }}>
      {children}
    </MainContext.Provider>
  );
};

export default ContextProvider;
