
import SearchBox from '../components/SearchBox';
import StatsCard from '../components/StatsCard';

const DashboardSidebar = () => {
  return (
    <div className="w-72 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-3xl font-semibold text-gray-900">Nursing Home</h1>
      </div>

      <div className="p-6">
        <SearchBox />
      </div>

      <div className="px-6 flex flex-col gap-4">
        <StatsCard title="Residents" value="48" />
        <StatsCard title="Review Due" value="4" color="text-orange-500" />
      </div>
    </div>
  );
};

export default DashboardSidebar;