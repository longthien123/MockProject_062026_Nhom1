// src/features/dashboard/components/ResidentCard.tsx
import React from 'react';
import type { Resident } from '../types/types';

const ResidentCard: React.FC<Resident> = ({
  name,
  status,
  statusColor,
  fallRisk,
  fallRiskColor = "text-gray-900",
  loc,
}) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:-translate-y-1 transition-all duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className={`text-sm font-medium mt-1 ${statusColor}`}>{status}</p>
          </div>
          <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-3xl">
            👤
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-500 text-xs">Fall Risk</div>
            <div className={`font-medium ${fallRiskColor}`}>{fallRisk}</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs">LOC</div>
            <div className="font-medium">{loc}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResidentCard;