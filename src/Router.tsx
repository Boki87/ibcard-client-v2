import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import { AppLayout } from "./components/layout/AppLayout";
import { useEffect } from "react";
import { api } from "./api";
import { useUserContext } from "./context/UserContext";

export const Router = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUserContext();
  const token = localStorage.getItem("ibcards-user-token");

  async function autoLogin() {
    try {
      const res = await api.get("/api/me");
      const data = res.data;
      localStorage.setItem("ibcards-user-token", data.token);
      setUser(data.user);
      navigate("/");
    } catch (e) {
      //   console.log(e);
      localStorage.removeItem("ibcards-user-token");
    }
  }

  useEffect(() => {
    if (!user && token) {
      autoLogin();
    }
  }, []);

  return (
    <Routes>
      <Route
        element={<AppLayout isPrivate />}
        errorElement={<Navigate to="/" />}
      >
        {privateRoutes.map((route) => {
          return (
            <Route
              index={route.path === "/"}
              path={route.path}
              element={route.element}
              key={route.path}
            />
          );
        })}
      </Route>
      <Route element={<AppLayout />} errorElement={<Navigate to="/" />}>
        {publicRoutes.map((route) => {
          return (
            <Route path={route.path} element={route.element} key={route.path} />
          );
        })}
      </Route>
    </Routes>
  );
};
