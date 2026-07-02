import { Edit2, Trash2 } from "lucide-react";
import type { SeverityLevel } from "../types/severity.types";

interface SeverityListProps {
  levels: SeverityLevel[];
  onEdit: (level: SeverityLevel) => void;
  onDelete: (level: SeverityLevel) => void;
  onToggleChartLock: (id: string, currentStatus: boolean) => void;
}

export function SeverityList({ levels, onEdit, onDelete, onToggleChartLock }: SeverityListProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/50">
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Severity Name
              </th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Color Indicator
              </th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Description
              </th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-center">
                Chart Lock Trigger
              </th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {levels.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-sm text-slate-400 font-medium">
                  No severity levels configured. Click "+ Add Severity Level" to create one.
                </td>
              </tr>
            ) : (
              levels.map((level) => {
                // Determine background color style for the color box
                let bgStyle = "";
                let borderStyle = "border-transparent";

                if (level.color === "red") {
                  bgStyle = "bg-[#ef4444]";
                } else if (level.color === "orange") {
                  bgStyle = "bg-[#f97316]";
                } else if (level.color === "amber") {
                  bgStyle = "bg-[#f59e0b]";
                } else if (level.color === "blue") {
                  bgStyle = "bg-[#3b82f6]";
                } else if (level.color === "green") {
                  bgStyle = "bg-[#10b981]";
                } else if (level.color === "white" || !level.color) {
                  bgStyle = "bg-white";
                  borderStyle = "border-slate-200";
                } else {
                  // Fallback to custom color hex
                  bgStyle = `bg-[${level.colorHex}]`;
                }

                // If name is Low or Medium, we want to match the figma image where color is white/transparent with border
                if (level.name.toLowerCase() === "low" || level.name.toLowerCase() === "medium") {
                  bgStyle = "bg-white";
                  borderStyle = "border-slate-350";
                }

                return (
                  <tr key={level.id} className="hover:bg-slate-50/20 transition-colors">
                    {/* Severity Name */}
                    <td className="px-6 py-6 whitespace-nowrap">
                      <span className="text-sm font-bold text-slate-800">
                        {level.name}
                      </span>
                    </td>

                    {/* Color Indicator */}
                    <td className="px-6 py-6 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div
                          className={`size-6 rounded border ${borderStyle} ${bgStyle.startsWith("bg-") ? bgStyle : ""} shadow-xs shrink-0`}
                          style={(!bgStyle.startsWith("bg-") && level.colorHex) ? { backgroundColor: level.colorHex } : undefined}
                        />
                        <span className="text-[11px] font-semibold text-slate-400 tracking-wide">
                          HEX Mapped
                        </span>
                      </div>
                    </td>

                    {/* Description */}
                    <td className="px-6 py-6">
                      <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
                        {level.description}
                      </p>
                    </td>

                    {/* Chart Lock Trigger */}
                    <td className="px-6 py-6 whitespace-nowrap text-center">
                      <div className="flex flex-col items-center justify-center gap-1.5">
                        <button
                          type="button"
                          role="switch"
                          aria-checked={level.chartLockTrigger}
                          onClick={() => onToggleChartLock(level.id, level.chartLockTrigger)}
                          className={`relative inline-flex h-[22px] w-11 shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            level.chartLockTrigger ? "bg-sky-500" : "bg-slate-300"
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className={`pointer-events-none inline-block size-4.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              level.chartLockTrigger ? "translate-x-[20px]" : "translate-x-0"
                            }`}
                          />
                        </button>
                        <span className={`text-[9px] font-bold tracking-wider leading-none uppercase select-none ${
                          level.chartLockTrigger ? "text-sky-500" : "text-slate-400"
                        }`}>
                          {level.chartLockTrigger ? "ACTIVE" : "DISABLED"}
                        </span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-6 whitespace-nowrap text-right">
                      <div className="inline-flex items-center gap-3">
                        <button
                          onClick={() => onEdit(level)}
                          className="text-slate-450 hover:text-slate-700 transition-colors"
                          title="Edit severity level"
                        >
                          <Edit2 className="size-4" />
                        </button>
                        <button
                          onClick={() => onDelete(level)}
                          className="text-slate-450 hover:text-slate-700 transition-colors"
                          title="Delete severity level"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
