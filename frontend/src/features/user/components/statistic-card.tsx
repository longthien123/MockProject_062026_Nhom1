// features/user/components/statistic-card.tsx
import type { ReactNode } from "react";

interface StatisticCardProps {
  label: string;
  value: number | string;
  icon: ReactNode;
  iconBgClassName?: string;
}

export function StatisticCard({
  label,
  value,
  icon,
  iconBgClassName = "bg-gray-100",
}: StatisticCardProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${iconBgClassName}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
