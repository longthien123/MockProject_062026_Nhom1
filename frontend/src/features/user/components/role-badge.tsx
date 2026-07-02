// features/user/components/role-badge.tsx
import { USER_ROLE_CONFIG } from "../constants/user-role";
import type { UserRole } from "../types/user-type";

interface RoleBadgeProps {
  role: UserRole;
}

export function RoleBadge({ role }: RoleBadgeProps) {
  const config = USER_ROLE_CONFIG[role];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}
