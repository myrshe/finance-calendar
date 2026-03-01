import { MainLayout } from "./layouts/MainLayout";
import { AppRouter } from "./providers/AppRouter";

function App() {
  return (
    <MainLayout>
      <AppRouter />
    </MainLayout>
  );
}

export default App
