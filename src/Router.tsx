import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  useLocation,
} from "react-router-dom";
import { FC } from "react";
import { AuthLayout } from "./components/layout/AuthLayout";
import { Login } from "./views/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route
        index
        element={
          <AuthLayout>
            <div>Home</div>
          </AuthLayout>
        }
      />
      <Route path="login" element={<Login />} />
      <Route path="d/:cardId" element={<div>Front page</div>} />
      <Route path="test" element={<div>Test page</div>} />
    </Route>
  )
);

export const Router: FC = () => {
  return <RouterProvider router={router} />;
};
