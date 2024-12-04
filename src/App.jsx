import { SettingsProvider } from "./context/SettingsContext";
import PageRoutes from "./PageRoutes";

const App = () => {
  return (
    <SettingsProvider>
      <PageRoutes />
    </SettingsProvider>
  );
};

export default App;
