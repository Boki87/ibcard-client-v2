import { ReactNode, useEffect } from "react";
import { useUserContext } from "../../context/UserContext";
import { Login } from "../../views/Login";

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { user, setUser } = useUserContext();

  useEffect(() => {
    console.log("auth layout");
  }, []);

  if (!user) {
    return <Login />;
  }

  return <>{children}</>;
};
