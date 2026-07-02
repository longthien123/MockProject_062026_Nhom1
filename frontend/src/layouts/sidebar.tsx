// layouts/sidebar.tsx
import { LogOut, Menu } from "lucide-react";
import { NAV_ITEMS } from "../config/nav-config";
import { SidebarNavItem } from "./sidebar-nav-item";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onLogout?: () => void;
}

export function Sidebar({ isOpen, onToggle, onLogout }: SidebarProps) {
  return (
    <>
      {/* Overlay cho mobile khi sidebar mở */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 lg:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-[min(18rem,100%)] shrink-0 flex-col border-r border-gray-200 bg-white shadow-xl transition-transform lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-gray-100 px-4">
          <button
            type="button"
            onClick={onToggle}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <Menu size={20} />
          </button>
          <span className="text-lg font-bold tracking-tight text-gray-900">NHMS</span>
        </div>

        {/* Menu */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4 pb-6">
          {NAV_ITEMS.map((item) => (
            <SidebarNavItem key={item.path} item={item} />
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-gray-100 p-3">
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
