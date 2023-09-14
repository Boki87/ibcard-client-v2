import {
  Navigate,
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
import { Stats } from "./components/Stats";
import { FrontPage } from "./views/Front";
import { EditPage } from "./views/Edit";
import { CompanyPortal } from "./views/CompanyPortal";
import { Contacts } from "./views/Contacts";
import { RegisterCardPage } from "./views/RegisterCard";
import { HelpPage } from "./views/Help";
import { TermsPage } from "./views/Terms";

const authRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />} errorElement={<Navigate to="/" />}>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register/:token" element={<RegisterCardPage />} />
      <Route path="contacts" element={<Contacts />} />
      <Route path="card/:cardId" element={<FrontPage />} />
      <Route path="card/:cardId/edit" element={<EditPage />} />
      <Route path="card/:cardId/stats" element={<Stats />} />
      <Route path="card/:cardId/portal" element={<CompanyPortal />} />
      <Route path="help" element={<HelpPage />} />
      <Route path="terms" element={<TermsPage />} />
    </Route>
  )
);

const publicRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Login />} />
      <Route path="register/:token" element={<RegisterCardPage />} />
      <Route path="card/:cardId" element={<FrontPage />} />
      <Route path="help" element={<HelpPage />} />
      <Route path="terms" element={<TermsPage />} />
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
