// features/user/components/user-table-row.tsx
import type { User } from "../types/user-type";
import { RoleBadge } from "./role-badge";
import { StatusBadge } from "./status-badge";
import { UserAction } from "./user-action";

interface UserTableRowProps {
  user: User;
  checked: boolean;
  onToggle: (id: string) => void;
  onView?: (user: User) => void;
  onEdit?: (user: User) => void;
  onToggleStatus?: (user: User) => void;
}

export function UserTableRow({
  user,
  checked,
  onToggle,
  onView,
  onEdit,
  onToggleStatus,
}: UserTableRowProps) {
  return (
    <tr className="border-b border-gray-100 last:border-0 hover:bg-gray-50/60">
      <td className="w-10 px-4 py-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(user.id)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
      </td>
      <td className="px-4 py-3 text-sm font-medium text-gray-900">{user.fullName}</td>
      <td className="px-4 py-3 text-sm text-blue-600">{user.email}</td>
      <td className="px-4 py-3">
        <RoleBadge role={user.role} />
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={user.status} />
      </td>
      <td className="px-4 py-3 text-sm text-gray-500">{user.lastLogin}</td>
      <td className="px-4 py-3 text-right">
        <UserAction user={user} onView={onView} onEdit={onEdit} onToggleStatus={onToggleStatus} />
      </td>
    </tr>
  );
}
