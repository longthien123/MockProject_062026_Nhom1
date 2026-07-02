import TableResident from "../component/ui/resident-table";
import ResidentListTitle from "../component/ui/resident-list-title";
import ResidentListButton from "../component/ui/resident-list-button-add";
import ResidentListSearchBar from "../component/ui/resident-list-search-bar";
import ResidentStatusCategories from "../component/ui/resident-status-categories";
import ResidentListPagination from "../component/ui/resident-list-pagination";

export default function ResidentListPage() {
  return (
    <div className="sm:px-4 md:px-6 lg:px-6 xl:px-8 2xl:px-8">
      <div className="sm:flex sm:justify-between sm:items-center mt-[20px]">
        <ResidentListTitle></ResidentListTitle>
        <ResidentListButton>+ Add New Resident</ResidentListButton>
      </div>
      <div className="flex flex-col mt-[20px] md:mt-0 md:flex-row md:gap-3">
        <ResidentListSearchBar></ResidentListSearchBar>
        <ResidentStatusCategories></ResidentStatusCategories>
      </div>
      <div className="mt-[20px]">
        <TableResident></TableResident>
      </div>
      <div className="flex mt-[20px]">
        <ResidentListPagination></ResidentListPagination>
      </div>
    </div>
  );
}
