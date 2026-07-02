// src/features/dashboard/layout/DashboardLayout.tsx
import React from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;