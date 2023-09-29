"use client";
import React, {
  FC,
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useContext,
} from "react";
import axios from "axios";
import { UserTypes } from "@/types/types";

interface Props {
  children: ReactNode;
}

interface ContextProviderProps {
  users: UserTypes[] | null;
  setUsers: Dispatch<SetStateAction<UserTypes[] | null>>;
}

export const GlobalContext = createContext<ContextProviderProps | null>({
  users: null,
  setUsers: (): UserTypes[] => [],
});

export const GlobalContextProvider: FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<UserTypes[] | null>(null);

  return (
    <GlobalContext.Provider value={{ users, setUsers }}>
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => useContext(GlobalContext);
