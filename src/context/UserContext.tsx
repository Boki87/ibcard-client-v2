import { ReactNode, createContext, useContext, useState } from "react";
import { User } from "../types/User";
import { useDarkMode } from "../hooks/useDarkMode";

interface IUserContext {
  user: null | User;
  setUser: (user: User | null) => void;
  theme: string;
  setTheme: (val: "light" | "dark") => void;
}

const initialState: IUserContext = {
  user: null,
  setUser: () => {},
  theme: "light",
  setTheme: () => {},
};

const UserContext = createContext(initialState);
export const useUserContext = () => useContext(UserContext);

export default function UserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<null | User>(null);
  const { theme, setTheme } = useDarkMode();

  return (
    <UserContext.Provider value={{ user, setUser, theme, setTheme }}>
      {children}
    </UserContext.Provider>
  );
}
