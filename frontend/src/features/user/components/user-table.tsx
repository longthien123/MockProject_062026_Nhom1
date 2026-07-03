// features/user/components/user-table.tsx
import type { User } from "../types/user-type";
import { UserTableRow } from "./user-table-row";

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
}

const COLUMNS: Column[] = [
  { key: "fullName", label: "Full Name", sortable: true },
  { key: "email", label: "Email" },
  { key: "role", label: "Role", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "lastLogin", label: "Last Login", sortable: true },
  { key: "actions", label: "Actions" },
];

interface UserTableProps {
  users: User[];
  isLoading: boolean;
  selectedIds: string[];
  isAllSelected: boolean;
  onToggleOne: (id: string) => void;
  onToggleAll: () => void;
  onView?: (user: User) => void;
  onEdit?: (user: User) => void;
  onToggleStatus?: (user: User) => void;
}

export function UserTable({
  users,
  isLoading,
  selectedIds,
  isAllSelected,
  onToggleOne,
  onToggleAll,
  onView,
  onEdit,
  onToggleStatus,
}: UserTableProps) {
  return (
    <div className="overflow-x-auto bg-white">
      <table className="min-w-[720px] w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/60">
            <th className="w-10 px-4 py-3">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={onToggleAll}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </th>
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={COLUMNS.length + 1} className="px-4 py-10 text-center text-sm text-gray-400">
                Loading users...
              </td>
            </tr>
          ) : users.length === 0 ? (
            <tr>
              <td colSpan={COLUMNS.length + 1} className="px-4 py-10 text-center text-sm text-gray-400">
                No users found. Try adjusting your search or filters.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <UserTableRow
                key={user.id}
                user={user}
                checked={selectedIds.includes(user.id)}
                onToggle={onToggleOne}
                onView={onView}
                onEdit={onEdit}
                onToggleStatus={onToggleStatus}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
