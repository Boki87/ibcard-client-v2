import { Router } from "./Router";
import { MainMenu } from "./components/MainMenu";
import { AppShellLayout } from "./components/layout/AppShellLayout";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AppShellLayout>
      <Router />
      <Toaster toastOptions={{ position: "bottom-center", duration: 3000 }} />
    </AppShellLayout>
  );
}

export default App;
