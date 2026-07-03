// layouts/main-layout.tsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import type { CurrentUser } from "./types/layout-type";

// Tạm thời hardcode current user - sau này lấy từ context/redux/auth store
const CURRENT_USER: CurrentUser = {
  fullName: "Anna Lee, RN",
  role: "DON",
};

export function MainLayout() { 
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    // TODO: nối logic logout thật (clear token, redirect...)
    console.log("Logout clicked");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
        onLogout={handleLogout}
      />

      <div className="flex min-h-screen flex-1 flex-col lg:ml-0">
        <Header
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          currentUser={CURRENT_USER}
          notificationCount={3}
          onLogout={handleLogout}
        />

        <main className="flex-1">
          <Outlet />
        </main>

        <footer className="flex flex-col items-center justify-between gap-2 border-t border-gray-200 bg-white px-6 py-4 text-xs text-gray-400 sm:flex-row">
          <span>© 2026 NHMS. All rights reserved.</span>
          <div className="flex items-center gap-3">
            <a href="#" className="hover:text-gray-600">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-gray-600">Terms of Use</a>
            <span>|</span>
            <a href="#" className="hover:text-gray-600">Support</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
