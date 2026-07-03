// features/user/hooks/use-user.ts
import { useCallback, useEffect, useMemo, useState } from "react";
import { userService } from "../services/user-service";
import type { User, UserFilterParams, UserRole, UserStatus } from "../types/user-type";

const PAGE_SIZE = 10;

export function useUser() {
  const [users, setUsers] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [totalActive, setTotalActive] = useState(0);
  const [totalInactive, setTotalInactive] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState<UserRole | "ALL">("ALL");
  const [status, setStatus] = useState<UserStatus | "ALL">("ALL");
  const [page, setPage] = useState(1);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params: UserFilterParams = { search, role, status, page, pageSize: PAGE_SIZE };
      const result = await userService.getUsers(params);
      setUsers(result.data);
      setTotal(result.total);
      setTotalActive(result.totalActive);
      setTotalInactive(result.totalInactive);
      setTotalPages(result.totalPages);
    } catch (e) {
      setError("Không thể tải danh sách người dùng. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  }, [search, role, status, page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Reset về trang 1 mỗi khi filter/search thay đổi
  useEffect(() => {
    setPage(1);
  }, [search, role, status]);

  const toggleSelectOne = useCallback((id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const toggleSelectAll = useCallback(() => {
    setSelectedIds((prev) => (prev.length === users.length ? [] : users.map((u) => u.id)));
  }, [users]);

  const resetFilters = useCallback(() => {
    setSearch("");
    setRole("ALL");
    setStatus("ALL");
    setPage(1);
  }, []);

  const deactivateSelected = useCallback(async () => {
    if (selectedIds.length === 0) return;
    await userService.deactivateUsers(selectedIds);
    setSelectedIds([]);
    await fetchUsers();
  }, [selectedIds, fetchUsers]);

  const isAllSelected = useMemo(
    () => users.length > 0 && selectedIds.length === users.length,
    [users, selectedIds]
  );

  return {
    // data
    users,
    total,
    totalActive,
    totalInactive,
    totalPages,
    page,
    isLoading,
    error,
    // filters
    search,
    role,
    status,
    setSearch,
    setRole,
    setStatus,
    setPage,
    resetFilters,
    // selection
    selectedIds,
    isAllSelected,
    toggleSelectOne,
    toggleSelectAll,
    deactivateSelected,
    // actions
    refetch: fetchUsers,
  };
}
