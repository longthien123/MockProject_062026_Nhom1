import "./App.css";
import AppProviders from "./config/app-provider";
import AppRouter from "./config/app-router";

function App() {
  return (
    <>
      <AppProviders>
        <AppRouter></AppRouter>
      </AppProviders>
    </>
  );
}

export default App;
