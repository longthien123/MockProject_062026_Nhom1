// features/user/constants/user-status.ts
import type { UserStatus } from "../types/user-type";

export interface StatusConfig {
  label: string;
  className: string;
  dotClassName: string;
}

export const USER_STATUS_CONFIG: Record<UserStatus, StatusConfig> = {
  ACTIVE: {
    label: "Active",
    className: "bg-green-100 text-green-700",
    dotClassName: "bg-green-500",
  },
  INACTIVE: {
    label: "Inactive",
    className: "bg-gray-100 text-gray-500",
    dotClassName: "bg-gray-400",
  },
};

export const USER_STATUS_OPTIONS: { label: string; value: UserStatus | "ALL" }[] = [
  { label: "All Status", value: "ALL" },
  { label: "Active", value: "ACTIVE" },
  { label: "Inactive", value: "INACTIVE" },
];
