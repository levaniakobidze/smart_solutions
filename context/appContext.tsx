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
  users: UserTypes[];
  setUsers: Dispatch<SetStateAction<UserTypes[]>>;
  getUsers: () => void;
}
export const GlobalContext = createContext<ContextProviderProps>({
  users: [],
  setUsers: () => [],
  getUsers: () => [],
});

export const GlobalContextProvider: FC<Props> = ({ children }) => {
  const api = "https://jsonplaceholder.typicode.com/users";
  const [users, setUsers] = useState<UserTypes[]>([]);

  const getUsers = async () => {
    try {
      const resp = await axios.get(api);
      setUsers(resp.data);
      console.log(resp.data.length, "length");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <GlobalContext.Provider value={{ users, setUsers, getUsers }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
