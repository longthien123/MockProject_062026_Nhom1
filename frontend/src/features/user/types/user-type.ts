// features/user/types/user-type.ts

export type UserRole =
  | "DON" // Director of Nursing
  | "NURSE_RN"
  | "NURSE_LPN"
  | "CNA"
  | "ADMISSION_STAFF"
  | "SYSTEM_ADMIN";

export type UserStatus = "ACTIVE" | "INACTIVE";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastLogin: string; // ISO string
  avatarUrl?: string;
}

export interface UserFilterParams {
  search: string;
  role: UserRole | "ALL";
  status: UserStatus | "ALL";
  page: number;
  pageSize: number;
}

export interface UserListResult {
  data: User[];
  total: number;
  totalActive: number;
  totalInactive: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
