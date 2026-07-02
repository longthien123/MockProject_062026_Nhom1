// features/user/pages/user-management-page.tsx
import { Users, UserCheck, UserX, Plus } from "lucide-react";
import { useUser } from "../hooks/use-user";
import { StatisticCard } from "../components/statistic-card";
import { SearchFilter } from "../components/search-filter";
import { UserTable } from "../components/user-table";
import { Pagination } from "../components/pagination";

const PAGE_SIZE = 10;

export function UserManagementPage() {
  const {
    users,
    total,
    totalActive,
    totalInactive,
    totalPages,
    page,
    isLoading,
    error,
    search,
    role,
    status,
    setSearch,
    setRole,
    setStatus,
    setPage,
    resetFilters,
    selectedIds,
    isAllSelected,
    toggleSelectOne,
    toggleSelectAll,
    deactivateSelected,
  } = useUser();

  return (
    <div className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-8">
      {/* Breadcrumb */}
      <p className="mb-2 text-sm text-gray-400">Admin &gt; User Management</p>

      {/* Header */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">User Management</h1>
          <p className="text-sm text-gray-500">Manage system users, roles, and account status.</p>
        </div>
        <button
          type="button"
          className="w-full justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          Add New User
        </button>
      </div>

      {/* Statistic cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <StatisticCard
          label="Total Users"
          value={total}
          icon={<Users className="h-5 w-5 text-blue-600" />}
          iconBgClassName="bg-blue-50"
        />
        <StatisticCard
          label="Active Users"
          value={totalActive}
          icon={<UserCheck className="h-5 w-5 text-green-600" />}
          iconBgClassName="bg-green-50"
        />
        <StatisticCard
          label="Inactive Users"
          value={totalInactive}
          icon={<UserX className="h-5 w-5 text-gray-500" />}
          iconBgClassName="bg-gray-100"
        />
      </div>

      {/* Search + Filters */}
      <div className="mb-4">
        <SearchFilter
          search={search}
          role={role}
          status={status}
          onSearchChange={setSearch}
          onRoleChange={setRole}
          onStatusChange={setStatus}
          onReset={resetFilters}
        />
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Table card */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <UserTable
          users={users}
          isLoading={isLoading}
          selectedIds={selectedIds}
          isAllSelected={isAllSelected}
          onToggleOne={toggleSelectOne}
          onToggleAll={toggleSelectAll}
        />

        {/* Bulk action bar */}
        <div className="flex flex-col gap-3 border-t border-gray-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500">{selectedIds.length} selected</span>
          <button
            type="button"
            disabled={selectedIds.length === 0}
            onClick={deactivateSelected}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 disabled:cursor-not-allowed disabled:opacity-40 hover:enabled:bg-gray-50"
          >
            <UserX className="h-4 w-4" />
            Deactivate Selected
          </button>
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          total={total}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

export default UserManagementPage;
