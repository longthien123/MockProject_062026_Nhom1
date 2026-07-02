import ResidentListPage from "@/features/resident/page/resident-list";
import MainLayout from "@/layouts/main-layout";
import { Route, Routes } from "react-router-dom";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/resident-list" element={<ResidentListPage />}></Route>
      </Route>
    </Routes>
  );
}
