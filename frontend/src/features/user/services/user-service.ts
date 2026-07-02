// features/user/services/user-service.ts
// Lớp service giả lập gọi API. Khi có backend thật, chỉ cần thay nội dung
// bên trong các hàm này bằng axios/fetch, giữ nguyên chữ ký hàm để không
// phải sửa hook/component đang dùng.

import { MOCK_USERS } from "../mock/users.ts";
import type { User, UserFilterParams, UserListResult } from "../types/user-type";

const FAKE_DELAY_MS = 300;

function delay<T>(value: T, ms = FAKE_DELAY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

// "Database" giả lập nằm trong bộ nhớ, để deactivate có thể thay đổi state
let DB: User[] = [...MOCK_USERS];

function normalize(text: string) {
  return text.trim().toLowerCase();
}

export const userService = {
  /**
   * Lấy danh sách user có search + filter + phân trang
   */
  async getUsers(params: UserFilterParams): Promise<UserListResult> {
    const { search, role, status, page, pageSize } = params;

    let filtered = DB;

    if (search.trim()) {
      const keyword = normalize(search);
      filtered = filtered.filter(
        (u) =>
          normalize(u.fullName).includes(keyword) ||
          normalize(u.email).includes(keyword)
      );
    }

    if (role !== "ALL") {
      filtered = filtered.filter((u) => u.role === role);
    }

    if (status !== "ALL") {
      filtered = filtered.filter((u) => u.status === status);
    }

    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const safePage = Math.min(Math.max(1, page), totalPages);
    const start = (safePage - 1) * pageSize;
    const data = filtered.slice(start, start + pageSize);

    return delay({
      data,
      total,
      totalActive: DB.filter((u) => u.status === "ACTIVE").length,
      totalInactive: DB.filter((u) => u.status === "INACTIVE").length,
      page: safePage,
      pageSize,
      totalPages,
    });
  },

  /**
   * Vô hiệu hoá (deactivate) danh sách user theo id
   */
  async deactivateUsers(ids: string[]): Promise<{ success: boolean }> {
    DB = DB.map((u) => (ids.includes(u.id) ? { ...u, status: "INACTIVE" } : u));
    return delay({ success: true });
  },

  /**
   * Kích hoạt lại user
   */
  async activateUsers(ids: string[]): Promise<{ success: boolean }> {
    DB = DB.map((u) => (ids.includes(u.id) ? { ...u, status: "ACTIVE" } : u));
    return delay({ success: true });
  },
};
