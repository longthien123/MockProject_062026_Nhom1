// features/user/components/search-filter.tsx
import { Search, RotateCcw } from "lucide-react";
import { USER_ROLE_OPTIONS } from "../constants/user-role";
import { USER_STATUS_OPTIONS } from "../constants/user-status";
import type { UserRole, UserStatus } from "../types/user-type";

interface SearchFilterProps {
  search: string;
  role: UserRole | "ALL";
  status: UserStatus | "ALL";
  onSearchChange: (value: string) => void;
  onRoleChange: (value: UserRole | "ALL") => void;
  onStatusChange: (value: UserStatus | "ALL") => void;
  onReset: () => void;
}

export function SearchFilter({
  search,
  role,
  status,
  onSearchChange,
  onRoleChange,
  onStatusChange,
  onReset,
}: SearchFilterProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-end">
        <div className="relative flex-1 min-w-0">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full rounded-lg border border-gray-300 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Role</label>
          <select
            value={role}
            onChange={(e) => onRoleChange(e.target.value as UserRole | "ALL")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            {USER_ROLE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <label className="text-xs font-medium text-gray-500">Status</label>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value as UserStatus | "ALL")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            {USER_STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="w-full justify-center rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 md:w-auto"
      >
        <RotateCcw className="h-4 w-4" />
        Reset Filters
      </button>
    </div>
  );
}
