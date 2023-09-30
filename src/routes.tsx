import { ReactElement, ReactNode } from "react";
import { Home } from "./views/Home";
import { RegisterCardPage } from "./views/RegisterCard";
import { Contacts } from "./views/Contacts";
import { FrontPage } from "./views/Front";
import { EditPage } from "./views/Edit";
import { Stats } from "./components/Stats";
import { Login } from "./views/Login";
import { HelpPage } from "./views/Help";
import { TermsPage } from "./views/Terms";
import { ForgotPassword } from "./views/ForgotPasswrod";
import { ResetPassword } from "./views/ResetPassword";
import { CompanyPortal } from "./views/CompanyPortal";

type RouteItem = {
  path: string;
  element: ReactElement;
};

export const privateRoutes: RouteItem[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/contacts",
    element: <Contacts />,
  },
  {
    path: "/contacts/:cardId",
    element: <Contacts />,
  },
  {
    path: "/edit/:cardId",
    element: <EditPage />,
  },
  {
    path: "/stats/:cardId",
    element: <Stats />,
  },
  {
    path: "/portal/:cardId",
    element: <CompanyPortal />,
  },
];

export const publicRoutes: RouteItem[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register/:token",
    element: <RegisterCardPage />,
  },
  {
    path: "/card/:cardId",
    element: <FrontPage />,
  },
  {
    path: "help",
    element: <HelpPage />,
  },
  {
    path: "terms",
    element: <TermsPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
  {
    path: "*",
    element: <div>Not found</div>,
  },
];
