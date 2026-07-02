// layouts/user-menu.tsx
import { useEffect, useRef, useState } from "react";
import { ChevronDown, LogOut, User as UserIcon, Settings } from "lucide-react";
import type { CurrentUser } from "./types/layout-type";

interface UserMenuProps {
  user: CurrentUser;
  onLogout?: () => void;
}

function getInitials(fullName: string): string {
  return fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function UserMenu({ user, onLogout }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-gray-100"
      >
        {user.avatarUrl ? (
          <img src={user.avatarUrl} alt={user.fullName} className="h-8 w-8 rounded-full object-cover" />
        ) : (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
            {getInitials(user.fullName)}
          </span>
        )}
        <span className="hidden text-left sm:block">
          <span className="block text-sm font-medium leading-tight text-gray-900">
            {user.fullName}
          </span>
          <span className="block text-xs leading-tight text-gray-500">{user.role}</span>
        </span>
        <ChevronDown size={16} className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 z-10 mt-1 w-48 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          <button
            type="button"
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
          >
            <UserIcon className="h-4 w-4" /> My Profile
          </button>
          <button
            type="button"
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
          >
            <Settings className="h-4 w-4" /> Account Settings
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 hover:bg-gray-50"
          >
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      )}
    </div>
  );
}
