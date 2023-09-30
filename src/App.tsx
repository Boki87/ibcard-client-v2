import { Router } from "./Router";
import { AppShellLayout } from "./components/layout/AppShellLayout";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AppShellLayout>
      <Router />
      <Toaster toastOptions={{ position: "top-center", duration: 4000 }} />
    </AppShellLayout>
  );
}

export default App;
