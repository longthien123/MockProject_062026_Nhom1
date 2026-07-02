// components/layout/Header.tsx
import { User, Menu } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#2b2b2b] text-white shadow-sm">
      <div className="flex h-16 items-center px-4 md:px-8 justify-between">
        {/* Left Side: Logo/Title */}
        <div className="flex items-center gap-4">
          <Menu className="h-6 w-6 cursor-pointer md:hidden" />
          <h1 className="text-lg font-semibold tracking-tight">
            EHR — Nursing Home Management
          </h1>
        </div>

        {/* Right Side: Admin Profile */}
        <div className="flex items-center gap-2 rounded-full bg-[#3a3a3a] px-4 py-1.5 border border-gray-600">
          <User className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium">Admin User</span>
        </div>
      </div>
    </header>
  );
}