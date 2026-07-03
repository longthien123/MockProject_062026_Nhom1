// features/user/constants/user-role.ts
import type { UserRole } from "../types/user-type";

export interface RoleConfig {
  label: string;
  className: string; // tailwind classes cho badge
}

export const USER_ROLE_CONFIG: Record<UserRole, RoleConfig> = {
  DON: {
    label: "DON",
    className: "bg-purple-100 text-purple-700",
  },
  NURSE_RN: {
    label: "Nurse (RN)",
    className: "bg-blue-100 text-blue-700",
  },
  NURSE_LPN: {
    label: "Nurse (LPN)",
    className: "bg-sky-100 text-sky-700",
  },
  CNA: {
    label: "CNA",
    className: "bg-teal-100 text-teal-700",
  },
  ADMISSION_STAFF: {
    label: "Admission Staff",
    className: "bg-amber-100 text-amber-700",
  },
  SYSTEM_ADMIN: {
    label: "System Admin",
    className: "bg-rose-100 text-rose-700",
  },
};

// Options dùng cho dropdown filter "Role"
export const USER_ROLE_OPTIONS: { label: string; value: UserRole | "ALL" }[] = [
  { label: "All Roles", value: "ALL" },
  { label: "DON", value: "DON" },
  { label: "Nurse (RN)", value: "NURSE_RN" },
  { label: "Nurse (LPN)", value: "NURSE_LPN" },
  { label: "CNA", value: "CNA" },
  { label: "Admission Staff", value: "ADMISSION_STAFF" },
  { label: "System Admin", value: "SYSTEM_ADMIN" },
];
