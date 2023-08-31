import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import UserContextProvider from "./context/UserContext.tsx";
import "./index.css";
import ModalsContextProvider from "./context/ModalsContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <UserContextProvider>
    <ModalsContextProvider>
      <App />
    </ModalsContextProvider>
  </UserContextProvider>
);
