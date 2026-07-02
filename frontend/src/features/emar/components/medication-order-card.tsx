import * as React from "react";

import { Badge } from "@/components/ui/emar-badge";
import { Card } from "@/components/ui/emar-card";
import type { MedicationOrder } from "../types/emar-types";

type MedicationOrderCardProps = {
  order: MedicationOrder;
};

export function MedicationOrderCard({ order }: MedicationOrderCardProps) {
  return (
    <Card>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg text-slate-900">{order.title}</h3>
        <div className="flex items-center gap-3">
          <Badge>{order.status}</Badge>
          <svg
            className="w-5 h-5 text-slate-400 group-hover:text-primary transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              d="M9 5l7 7-7 7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>

      <div className="text-sm text-slate-600 space-y-1 mb-4">
        <p>
          <strong>Dose:</strong> {order.dose} | <strong>Route:</strong> {order.route} | <strong>Frequency:</strong> {order.frequency}
        </p>
        <p>
          <strong>Start:</strong> {order.start} | <strong>Prescriber:</strong> {order.prescriber}
        </p>
      </div>

      {order.hasAlert && (
        <div className="bg-red-50 border-l-4 border-red-600 p-3 rounded-r-[1.125rem] flex items-start gap-3 mt-4">
          <svg
            className="w-5 h-5 text-red-600 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              fillRule="evenodd"
            />
          </svg>

          <div className="flex-1">
            <p className="text-red-600 font-bold text-sm">Allergy conflict:</p>
            <p className="text-slate-700 text-sm">{order.note}</p>
          </div>
        </div>
      )}

      {order.note && !order.hasAlert && (
        <div className="bg-slate-100 rounded-[1.125rem] p-4 space-y-3">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full prescription notes:</p>
            <p className="text-sm text-slate-700 mt-1">{order.note}</p>
          </div>
          {order.lastAdministered && (
            <div className="pt-2 border-t border-slate-300">
              <p className="text-xs text-slate-600">Last administered timestamp: {order.lastAdministered}</p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
