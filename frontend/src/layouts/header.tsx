// layouts/header.tsx
import { Bell, HelpCircle, Menu } from "lucide-react";
import { UserMenu } from "./user-menu";
import type { CurrentUser } from "./types/layout-type";

interface HeaderProps {
  onToggleSidebar: () => void;
  currentUser: CurrentUser;
  notificationCount?: number;
  onLogout?: () => void;
}

export function Header({
  onToggleSidebar,
  currentUser,
  notificationCount = 0,
  onLogout,
}: HeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-200 bg-white px-4 py-3 sm:px-6 sm:py-0">
      {/* Left: hamburger + tên hệ thống */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <div className="hidden sm:block">
          <span className="text-sm font-semibold text-gray-900">NHMS</span>
          <span className="ml-2 text-sm text-gray-400">Nursing Home Management System</span>
        </div>
      </div>

      {/* Right: notification, help, user menu */}
      <div className="flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          aria-label="Notifications"
        >
          <Bell size={18} />
          {notificationCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          )}
        </button>

        <button
          type="button"
          className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          aria-label="Help"
        >
          <HelpCircle size={18} />
        </button>

        <div className="mx-1 h-6 w-px bg-gray-200" />

        <UserMenu user={currentUser} onLogout={onLogout} />
      </div>
    </header>
  );
}
