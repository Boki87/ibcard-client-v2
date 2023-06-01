import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { User } from "../types/User";

interface IUserContext {
  user: null | User;
  setUser: (user: User | null) => void;
}

const initialState: IUserContext = {
  user: null,
  setUser: () => {},
};

const UserContext = createContext(initialState);
export const useUserContext = () => useContext(UserContext);

export default function UserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<null | User>(null);

  useEffect(() => {
    console.log("User context");
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
