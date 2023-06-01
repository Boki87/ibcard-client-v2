import { Router } from "./Router";
import { AppShellLayout } from "./components/layout/AppShellLayout";

function App() {
  return (
    <AppShellLayout>
      <Router />
    </AppShellLayout>
  );
}

export default App;
