import { Router } from "./Router";
import { MainMenu } from "./components/MainMenu";
import { AppShellLayout } from "./components/layout/AppShellLayout";

function App() {
  return (
    <AppShellLayout>
      <Router />
    </AppShellLayout>
  );
}

export default App;
