import React from 'react';
import DashboardHeader from '../dashboard/layout/DashboardHeader';
import DashboardSidebar from '../dashboard/layout/DashboardSidebar';
import ResidentCard from '../dashboard/components/ResidentCard';

const NursingHomeDashboard: React.FC = () => {
  const residents = [
    {
      name: "John Smith",
      status: "Care Plan Active",
      statusColor: "text-green-500",
      fallRisk: "High",
      fallRiskColor: "text-red-500",
      loc: "Tier 3"
    },
    {
      name: "Mary Brown",
      status: "Review Due",
      statusColor: "text-orange-500",
      fallRisk: "Medium",
      loc: "Tier 2"
    },
    {
      name: "Robert Lee",
      status: "Needs Update",
      statusColor: "text-red-500",
      fallRisk: "Low",
      fallRiskColor: "text-green-500",
      loc: "Tier 1"
    },
    {
      name: "John Smith",
      status: "Care Plan Active",
      statusColor: "text-green-500",
      fallRisk: "High",
      fallRiskColor: "text-red-500",
      loc: "Tier 3"
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <DashboardSidebar />
      
      <div className="flex-1 overflow-auto">
        <DashboardHeader />
        
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">All Residents</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
            {residents.map((resident, index) => (
              <ResidentCard key={index} {...resident} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NursingHomeDashboard;