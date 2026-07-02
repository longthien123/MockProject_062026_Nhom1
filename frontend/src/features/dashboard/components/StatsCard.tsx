
import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  color?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, color = "text-gray-900" }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6">
      <div className="text-sm text-gray-500 font-medium">{title}</div>
      <div className={`text-5xl font-semibold mt-2 ${color}`}>{value}</div>
    </div>
  );
};

export default StatsCard;