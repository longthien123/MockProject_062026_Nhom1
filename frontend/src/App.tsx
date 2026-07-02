import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layouts/main-layout";
import { UserManagementPage } from "./features/user/pages/user-management-page";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<UserManagementPage />} />
          <Route path="*" element={<UserManagementPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
