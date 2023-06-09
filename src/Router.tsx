import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { FC, useEffect } from "react";
import { Login } from "./views/Login";
import { Home } from "./views/Home";
import { useUserContext } from "./context/UserContext";
import { api } from "./api";
import { AppLayout } from "./components/layout/AppLayout";
import { FrontPage } from "./views/Front";
import { EditPage } from "./views/Edit";

const authRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="card/:cardId" element={<FrontPage />} />
      <Route path="card/:cardId/edit" element={<EditPage />} />
      <Route path="card/:cardId/stats" element={<div>Stats page</div>} />
      <Route path="card/:cardId/portal" element={<div>portal page</div>} />
    </Route>
  )
);

const publicRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Login />} />
      <Route path="card/:cardId" element={<FrontPage />} />
    </Route>
  )
);

export const Router: FC = () => {
  const { user, setUser } = useUserContext();

  async function autoLogin() {
    try {
      const res = await api.get("/api/me");
      const data = res.data;
      localStorage.setItem("ibcards-user-token", data.token);
      setUser(data.user);
    } catch (e) {
      localStorage.removeItem("ibcards-user-token");
    }
  }

  useEffect(() => {
    if (!user) {
      autoLogin();
    }
  }, [user]);
  return <RouterProvider router={user ? authRouter : publicRouter} />;
};
