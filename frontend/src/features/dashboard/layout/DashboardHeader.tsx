// src/features/dashboard/layout/DashboardHeader.tsx


const DashboardHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 md:px-8 py-5 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-6 md:gap-8">
        <a href="#" className="font-medium text-gray-700 hover:text-gray-900">Dashboard</a>
        <a href="#" className="font-medium text-gray-400 hover:text-gray-900">Residents</a>
        <a href="#" className="font-medium text-gray-400 hover:text-gray-900">Care Plans</a>
      </div>

      <div className="flex items-center gap-5">
        <i className="fas fa-bell text-xl cursor-pointer hover:text-gray-600"></i>
        <div className="w-9 h-9 bg-gray-200 rounded-full cursor-pointer"></div>
      </div>
    </header>
  );
};

export default DashboardHeader;