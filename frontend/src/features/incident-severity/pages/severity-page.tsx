import { useState } from "react";
import {
  Plus,
  ShieldAlert,
  CheckCircle,
  Info,
  RotateCcw,
  Clock
} from "lucide-react";
import { AdminLayout } from "@/layouts/admin-layout";
import { SeverityList } from "../components/severity-list";
import { SeverityModal } from "../components/severity-modal";
import { ConfirmDeleteModal } from "../components/confirm-delete-modal";
import type { SeverityLevel } from "../types/severity.types";

const INITIAL_SEVERITY_LEVELS: SeverityLevel[] = [
  {
    id: "sev-1",
    name: "Low",
    description: "Minor occurrences that do not impact resident safety or standard care protocols. Examples include administrative errors or minor property damage.",
    color: "white",
    colorHex: "#FFFFFF",
    chartLockTrigger: false,
    createdAt: "2026-06-01T08:00:00.000Z"
  },
  {
    id: "sev-2",
    name: "Medium",
    description: "Incidents that require internal investigation but no immediate medical intervention. Examples include medication timing variances or minor falls without injury.",
    color: "white",
    colorHex: "#FFFFFF",
    chartLockTrigger: false,
    createdAt: "2026-06-01T08:30:00.000Z"
  },
  {
    id: "sev-3",
    name: "High",
    description: "Significant events requiring immediate medical assessment or shift supervisor intervention. Examples include injuries requiring first aid or aggressive behavior.",
    color: "orange",
    colorHex: "#F97316",
    chartLockTrigger: true,
    createdAt: "2026-06-01T09:00:00.000Z"
  },
  {
    id: "sev-4",
    name: "Critical",
    description: "Life-threatening events or regulatory breaches requiring immediate notification of authorities. Examples include medical emergencies or elopement.",
    color: "red",
    colorHex: "#EF4444",
    chartLockTrigger: true,
    createdAt: "2026-06-01T09:30:00.000Z"
  }
];

interface ToastState {
  message: string;
  type: "success" | "info" | "warning";
  visible: boolean;
}

export default function SeverityPage() {
  const [levels, setLevels] = useState<SeverityLevel[]>(INITIAL_SEVERITY_LEVELS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<SeverityLevel | null>(null);
  const [toast, setToast] = useState<ToastState>({ message: "", type: "success", visible: false });

  // Helper to trigger custom Toast notifications
  const showToast = (message: string, type: "success" | "info" | "warning" = "success") => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 4000);
  };

  // Toggle Chart Lock immediately
  const handleToggleChartLock = (id: string, currentStatus: boolean) => {
    setLevels((prev) =>
      prev.map((level) =>
        level.id === id ? { ...level, chartLockTrigger: !currentStatus } : level
      )
    );
    const affectedLevel = levels.find((l) => l.id === id);
    if (affectedLevel) {
      const action = !currentStatus ? "ENABLED" : "DISABLED";
      showToast(
        `Chart Lock trigger is now ${action} for ${affectedLevel.name} severity.`,
        !currentStatus ? "warning" : "success"
      );
    }
  };

  // Save Add/Edit
  const handleSaveLevel = (newLevelData: Omit<SeverityLevel, "id" | "createdAt"> & { id?: string }) => {
    if (newLevelData.id) {
      // Edit
      setLevels((prev) =>
        prev.map((level) =>
          level.id === newLevelData.id
            ? {
                ...level,
                name: newLevelData.name,
                description: newLevelData.description,
                color: newLevelData.color,
                colorHex: newLevelData.colorHex,
                chartLockTrigger: newLevelData.chartLockTrigger,
              }
            : level
        )
      );
      showToast(`Severity level "${newLevelData.name}" has been updated successfully.`);
    } else {
      // Add
      const newLevel: SeverityLevel = {
        id: `sev-${Date.now()}`,
        name: newLevelData.name,
        description: newLevelData.description,
        color: newLevelData.color,
        colorHex: newLevelData.colorHex,
        chartLockTrigger: newLevelData.chartLockTrigger,
        createdAt: new Date().toISOString(),
      };
      setLevels((prev) => [...prev, newLevel]);
      showToast(`Severity level "${newLevelData.name}" created successfully.`);
    }
  };

  // Delete Severity Level
  const handleDeleteConfirm = () => {
    if (selectedLevel) {
      setLevels((prev) => prev.filter((level) => level.id !== selectedLevel.id));
      showToast(`Severity level "${selectedLevel.name}" was permanently deleted.`, "info");
      setIsDeleteOpen(false);
      setSelectedLevel(null);
    }
  };

  // Reset to Defaults function
  const handleResetToDefaults = () => {
    setLevels(INITIAL_SEVERITY_LEVELS);
    showToast("Severity levels reset to default configurations.", "info");
  };

  return (
    <AdminLayout activeTab="severity">
      {/* Toast Notification Container */}
      {toast.visible && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-xl bg-white ${
            toast.type === "warning"
              ? "border-amber-200 text-amber-800"
              : toast.type === "info"
              ? "border-blue-200 text-blue-800"
              : "border-green-200 text-green-800"
          }`}>
            {toast.type === "warning" ? (
              <ShieldAlert className="size-5 text-amber-500 shrink-0" />
            ) : toast.type === "info" ? (
              <Info className="size-5 text-blue-500 shrink-0" />
            ) : (
              <CheckCircle className="size-5 text-green-500 shrink-0" />
            )}
            <span className="text-xs font-semibold">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800">
            Incident Severity Level Configuration
          </h1>
        </div>
        <button
          onClick={() => {
            setSelectedLevel(null);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 bg-[#0f172a] hover:bg-slate-800 text-white rounded-lg px-4 py-2.5 text-xs font-bold shadow-xs transition-colors self-start md:self-auto"
        >
          <Plus className="size-4" /> Add Severity Level
        </button>
      </div>

      {/* Configuration Policy Warning Card */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5 mb-8 flex items-start gap-3">
        <Info className="size-4.5 text-slate-650 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-xs font-bold text-slate-800">Configuration Policy (NFR-02)</h4>
          <p className="text-[11px] text-slate-450 leading-relaxed mt-1">
            Changing severity levels affects all active incident reports. The "Chart Lock Trigger" automatically restricts resident record modifications until the Director of Nursing (DON) approves the incident report.
          </p>
        </div>
      </div>

      {/* Severity Levels Table */}
      <SeverityList
        levels={levels}
        onEdit={(level) => {
          setSelectedLevel(level);
          setIsModalOpen(true);
        }}
        onDelete={(level) => {
          setSelectedLevel(level);
          setIsDeleteOpen(true);
        }}
        onToggleChartLock={handleToggleChartLock}
      />

      {/* Reset to Defaults & Last Modified Panel */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 mb-8 text-xs text-slate-400">
        <button
          onClick={handleResetToDefaults}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold shadow-2xs transition-colors"
        >
          <RotateCcw className="size-3.5" />
          Reset to Defaults
        </button>
        <span className="flex items-center gap-1.5 font-medium italic text-slate-400">
          <Clock className="size-3.5" />
          Last modified by Admin User on Oct 24, 2024 at 09:42 AM
        </span>
      </div>

      {/* Grid: Automation Logic & Visual Compliance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Automation Logic Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
            AUTOMATION LOGIC
          </h3>
          <ul className="space-y-3.5 text-xs text-slate-650 font-medium">
            <li className="flex items-start gap-2.5">
              <span className="size-1.5 rounded-full bg-sky-500 shrink-0 mt-1.5" />
              <span>Locked charts prevent all SOAP note additions until the incident is marked "Reviewed".</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="size-1.5 rounded-full bg-sky-500 shrink-0 mt-1.5" />
              <span>Critical severity triggers a 15-minute escalation SMS to the on-call medical director.</span>
            </li>
          </ul>
        </div>

        {/* Visual Compliance Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              VISUAL COMPLIANCE
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium mb-6">
              These color mappings are used throughout the Dashboard, Resident Profile, and EMAR screens to maintain visual consistency.
            </p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1.5 text-[10px] font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-md">
              Compliant
            </span>
            <span className="px-3 py-1.5 text-[10px] font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-md">
              ISO-27001
            </span>
            <span className="px-3 py-1.5 text-[10px] font-bold text-slate-600 bg-slate-50 border border-slate-200 rounded-md">
              HIPAA Safe
            </span>
          </div>
        </div>
      </div>

      {/* Modals */}
      <SeverityModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedLevel(null);
        }}
        onSave={handleSaveLevel}
        editLevel={selectedLevel}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedLevel(null);
        }}
        onConfirm={handleDeleteConfirm}
        level={selectedLevel}
      />
    </AdminLayout>
  );
}
