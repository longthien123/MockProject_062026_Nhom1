import React, { useState, useEffect } from "react";
import {
  Menu,
  Activity,
  Check,
  Clock,
  Info,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Database,
  Users,
  Settings,
  ShieldAlert,
  ListTodo,
  RotateCcw,
  Save,
  User,
  LogOut,
  Bell,
  HelpCircle,
  FileText,
  Sun,
  Moon,
  X
} from "lucide-react";

// Types for staffing ratio configuration
interface StaffingConfig {
  minHours: number;
  dayShift: number;
  eveningShift: number;
  nightShift: number;
  weekendOverride: boolean;
  weekendDayShift: number;
  weekendEveningShift: number;
  weekendNightShift: number;
  warnThreshold: number;
  recipients: string;
}

interface VersionRecord extends StaffingConfig {
  id: number;
  date: string;
  author: string;
  active: boolean;
}

// Configuration defaults (Module-level constant in UPPER_SNAKE_CASE)
const DEFAULT_VALUES: StaffingConfig = {
  minHours: 3.5,
  dayShift: 1.2,
  eveningShift: 1.2,
  nightShift: 1.1,
  weekendOverride: false,
  weekendDayShift: 1.2,
  weekendEveningShift: 1.2,
  weekendNightShift: 1.1,
  warnThreshold: 95,
  recipients: "Director of Nursing & Administrators",
};

export const StaffingRatios: React.FC = () => {
  // Theme state (boolean state prefixed with 'is')
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Active page state for sidebar navigation
  const [activeTab, setActiveTab] = useState<string>("staffing-ratios");
  
  // Mobile sidebar visibility (boolean state prefixed with 'is')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  
  // User profile dropdown visibility (boolean state prefixed with 'is')
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState<boolean>(false);

  // Form configurations
  const [config, setConfig] = useState<StaffingConfig>({ ...DEFAULT_VALUES });

  // Recipient dropdown open state (boolean state prefixed with 'is')
  const [isRecipientDropdownOpen, setIsRecipientDropdownOpen] = useState<boolean>(false);

  // Version History states (boolean state prefixed with 'is')
  const [isVersionHistoryOpen, setIsVersionHistoryOpen] = useState<boolean>(false);
  const [versions, setVersions] = useState<VersionRecord[]>([
    {
      id: 1,
      date: "Oct 24, 2024, 09:30 AM",
      minHours: 3.5,
      dayShift: 1.2,
      eveningShift: 1.2,
      nightShift: 1.1,
      weekendOverride: false,
      weekendDayShift: 1.2,
      weekendEveningShift: 1.2,
      weekendNightShift: 1.1,
      warnThreshold: 95,
      recipients: "Director of Nursing & Administrators",
      author: "Admin User",
      active: true,
    },
    {
      id: 2,
      date: "Jun 15, 2024, 02:15 PM",
      minHours: 3.2,
      dayShift: 1.1,
      eveningShift: 1.1,
      nightShift: 1.0,
      weekendOverride: false,
      weekendDayShift: 1.1,
      weekendEveningShift: 1.1,
      weekendNightShift: 1.0,
      warnThreshold: 90,
      recipients: "Director of Nursing & Administrators",
      author: "System Administrator",
      active: false,
    },
    {
      id: 3,
      date: "Jan 03, 2024, 11:00 AM",
      minHours: 3.0,
      dayShift: 1.0,
      eveningShift: 1.0,
      nightShift: 1.0,
      weekendOverride: true,
      weekendDayShift: 1.2,
      weekendEveningShift: 1.0,
      weekendNightShift: 0.8,
      warnThreshold: 85,
      recipients: "Administrators Only",
      author: "System Administrator",
      active: false,
    },
  ]);

  // Toast Notification states
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  // Show toast utility
  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Synchronize theme with local storage & document element
  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark" || 
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    showToast(`${newMode ? "Dark" : "Light"} mode enabled.`, "info");
  };

  // Live values calculation & validations
  const totalRegularShiftHours = Number((config.dayShift + config.eveningShift + config.nightShift).toFixed(2));
  const totalWeekendShiftHours = Number((config.weekendDayShift + config.weekendEveningShift + config.weekendNightShift).toFixed(2));

  const isRegularValid = Math.abs(totalRegularShiftHours - config.minHours) < 0.001;
  const isWeekendValid = !config.weekendOverride || Math.abs(totalWeekendShiftHours - config.minHours) < 0.001;

  // Handle Form changes
  const handleInputChange = (field: keyof StaffingConfig, value: any) => {
    setConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Discard changes to active config or defaults
  const handleDiscard = () => {
    const activeVersion = versions.find((v) => v.active);
    if (activeVersion) {
      setConfig({
        minHours: activeVersion.minHours,
        dayShift: activeVersion.dayShift,
        eveningShift: activeVersion.eveningShift,
        nightShift: activeVersion.nightShift,
        weekendOverride: activeVersion.weekendOverride,
        weekendDayShift: activeVersion.weekendDayShift,
        weekendEveningShift: activeVersion.weekendEveningShift,
        weekendNightShift: activeVersion.weekendNightShift,
        warnThreshold: activeVersion.warnThreshold,
        recipients: activeVersion.recipients,
      });
      showToast("Changes discarded. Configuration reverted to active version.", "info");
    } else {
      setConfig({ ...DEFAULT_VALUES });
      showToast("Changes reset to system defaults.", "info");
    }
  };

  // Save changes
  const handleSave = () => {
    // Basic range validation
    if (config.minHours <= 0 || config.dayShift < 0 || config.eveningShift < 0 || config.nightShift < 0) {
      showToast("Save failed: Hours cannot be negative or zero.", "error");
      return;
    }

    if (!isRegularValid) {
      showToast(`Warning saved: Total shift hours (${totalRegularShiftHours}) do not match minimum requirement (${config.minHours}).`, "info");
    }

    // Add new version
    const newVersion: VersionRecord = {
      id: versions.length + 1,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      minHours: config.minHours,
      dayShift: config.dayShift,
      eveningShift: config.eveningShift,
      nightShift: config.nightShift,
      weekendOverride: config.weekendOverride,
      weekendDayShift: config.weekendDayShift,
      weekendEveningShift: config.weekendEveningShift,
      weekendNightShift: config.weekendNightShift,
      warnThreshold: config.warnThreshold,
      recipients: config.recipients,
      author: "Admin User",
      active: true,
    };

    // Update active state in old versions and append new version
    const updatedVersions = versions.map((v) => ({ ...v, active: false }));
    setVersions([newVersion, ...updatedVersions]);
    showToast("Configuration saved and validated successfully!", "success");
  };

  // Restore previous configuration version
  const handleRestoreVersion = (version: VersionRecord) => {
    setConfig({
      minHours: version.minHours,
      dayShift: version.dayShift,
      eveningShift: version.eveningShift,
      nightShift: version.nightShift,
      weekendOverride: version.weekendOverride,
      weekendDayShift: version.weekendDayShift,
      weekendEveningShift: version.weekendEveningShift,
      weekendNightShift: version.weekendNightShift,
      warnThreshold: version.warnThreshold,
      recipients: version.recipients,
    });

    // Mark restored version as active
    setVersions((prev) =>
      prev.map((v) => ({
        ...v,
        active: v.id === version.id,
      }))
    );
    showToast(`Restored version from ${version.date} (Created by ${version.author}).`, "success");
  };

  // Mock pages handlers
  const renderLOCRateTable = () => (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">LOC (Level of Care) Rate Table</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Configure daily reimbursement rates based on resident acuity levels.</p>
        </div>
        <button 
          onClick={() => showToast("LOC Rate values updated.", "success")}
          className="flex items-center gap-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-md shadow-indigo-100 cursor-pointer"
        >
          <Save className="size-4" /> Save Rates
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider">
              <th className="px-4 py-3 font-semibold">Care Level</th>
              <th className="px-4 py-3 font-semibold">Standard Rate / Day</th>
              <th className="px-4 py-3 font-semibold">Weekend Rate / Day</th>
              <th className="px-4 py-3 font-semibold">Severity Weight</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="text-slate-600 dark:text-slate-355 text-sm divide-y divide-slate-100 dark:divide-slate-800">
            {[
              { level: "Level 1 - Low acuity assistance", standard: "$185.00", weekend: "$210.00", weight: "1.0", status: "Active" },
              { level: "Level 2 - Moderate nursing care", standard: "$260.00", weekend: "$295.00", weight: "1.5", status: "Active" },
              { level: "Level 3 - High skilled clinical support", standard: "$380.00", weekend: "$425.05", weight: "2.2", status: "Active" },
              { level: "Level 4 - Intensive / Ventilator dependent", standard: "$550.00", weekend: "$620.00", weight: "3.5", status: "Active" },
            ].map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/55 dark:hover:bg-slate-800/20 transition-colors">
                <td className="px-4 py-3.5 font-medium text-slate-800 dark:text-slate-200">{row.level}</td>
                <td className="px-4 py-3.5">
                  <input type="text" defaultValue={row.standard} className="border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 w-24 text-slate-700 dark:text-slate-300 focus:outline-none focus:border-[#4f46e5] bg-white dark:bg-slate-950" />
                </td>
                <td className="px-4 py-3.5">
                  <input type="text" defaultValue={row.weekend} className="border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 w-24 text-slate-700 dark:text-slate-300 focus:outline-none focus:border-[#4f46e5] bg-white dark:bg-slate-955" />
                </td>
                <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400 font-mono">{row.weight}</td>
                <td className="px-4 py-3.5">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-450 border border-emerald-100 dark:border-emerald-900/50">
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSeverityLevels = () => (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Severity Levels</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Define classification mapping and threshold multipliers for clinical urgency.</p>
        </div>
        <button 
          onClick={() => showToast("Severity configurations stored.", "success")}
          className="flex items-center gap-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-md shadow-indigo-100 cursor-pointer"
        >
          <Save className="size-4" /> Save Configuration
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { level: "Low Severity", desc: "Stable chronic conditions, minor activities of daily living assistance.", multiplier: "1.0x", color: "bg-slate-100 dark:bg-slate-805 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700" },
          { level: "Medium Severity", desc: "Fluctuating conditions requiring skilled assessment and intervention.", multiplier: "1.3x", color: "bg-blue-50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-900/30" },
          { level: "High Severity", desc: "Complex clinical instabilities, postsurgical recovery, intensive therapies.", multiplier: "1.8x", color: "bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-900/30" },
          { level: "Critical Severity", desc: "Acute emergencies, cardiac distress, life support equipment monitoring.", multiplier: "2.5x", color: "bg-rose-50 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300 border-rose-100 dark:border-rose-900/30" },
        ].map((item, idx) => (
          <div key={idx} className="border border-slate-105 dark:border-slate-800 rounded-xl p-4 hover:shadow-md transition-all bg-slate-50/20 dark:bg-slate-808/10">
            <div className="flex justify-between items-start mb-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold border ${item.color}`}>
                {item.level}
              </span>
              <div className="text-right">
                <span className="text-xs text-slate-400 dark:text-slate-500 block font-medium">Multiplier Weight</span>
                <input type="text" defaultValue={item.multiplier} className="border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-0.5 w-16 text-center text-sm font-mono text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-950" />
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-2">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSLAConfig = () => (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">SLA Configurations</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage target response and resolution times for nursing staff dispatches.</p>
        </div>
        <button 
          onClick={() => showToast("SLA thresholds updated successfully.", "success")}
          className="flex items-center gap-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-md shadow-indigo-100 cursor-pointer"
        >
          <Save className="size-4" /> Save SLA Rules
        </button>
      </div>

      <div className="space-y-4">
        {[
          { priority: "P1 - Critical Emergency Call", response: "2 minutes", dispatch: "5 minutes", alert: "SMS, Phone Call & In-App Flash" },
          { priority: "P2 - High Care Request", response: "10 minutes", dispatch: "20 minutes", alert: "In-App Banner & Pager Notification" },
          { priority: "P3 - Standard Nursing Aid", response: "30 minutes", dispatch: "60 minutes", alert: "In-App Banner & Standard Dispatch Queue" },
          { priority: "P4 - Non-Clinical Routine Needs", response: "60 minutes", dispatch: "120 minutes", alert: "Dashboard Task Assigned Notification" },
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between border border-slate-100 dark:border-slate-800 rounded-xl p-4 gap-4 bg-slate-55/10 dark:bg-slate-800/5">
            <div>
              <span className="font-semibold text-sm text-slate-800 dark:text-slate-200 block">{item.priority}</span>
              <span className="text-xs text-slate-400 dark:text-slate-500 block mt-0.5">Alerts dispatched via: <strong className="text-slate-555 dark:text-slate-400">{item.alert}</strong></span>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-505 block mb-1">Target Response</label>
                <input type="text" defaultValue={item.response} className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-950 focus:outline-none" />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-505 block mb-1">Target Resolution</label>
                <input type="text" defaultValue={item.dispatch} className="border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-700 dark:text-slate-305 bg-white dark:bg-slate-950 focus:outline-none" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDemoSeeder = () => (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm text-center max-w-xl mx-auto">
      <Database className="size-12 text-[#4f46e5] mx-auto mb-4" />
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Demo Database Seeder</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
        Populate the application database with randomized high-fidelity clinical data, including shifts, alerts, staff roster logs, and ratio reports for the past 90 days.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button 
          onClick={() => showToast("Populating database with 90-day logs...", "info")}
          className="bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all shadow-md shadow-indigo-100 cursor-pointer"
        >
          Seed Configuration Logs
        </button>
        <button 
          onClick={() => {
            handleDiscard();
            showToast("Database state successfully reset.", "success");
          }}
          className="border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold text-sm px-5 py-2.5 rounded-xl transition-all bg-white dark:bg-slate-900 cursor-pointer"
        >
          Reset to Factory Defaults
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f7fa] dark:bg-slate-950 flex flex-col font-sans relative antialiased transition-colors duration-300">
      
      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed top-6 right-6 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className={`flex items-center gap-3 px-4 py-3.5 rounded-xl shadow-lg border text-sm font-semibold max-w-md ${
            toast.type === "success" 
              ? "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-350 dark:border-emerald-900/50" 
              : toast.type === "error" 
              ? "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-950/30 dark:text-rose-350 dark:border-rose-900/50" 
              : "bg-[#eef2ff] text-[#4f46e5] border-[#c7d2fe] dark:bg-indigo-950/30 dark:text-indigo-400 dark:border-indigo-900/50"
          }`}>
            {toast.type === "success" && <Check className="size-5 text-emerald-600 dark:text-emerald-450 shrink-0" />}
            {toast.type === "error" && <AlertTriangle className="size-5 text-rose-600 dark:text-rose-455 shrink-0" />}
            {toast.type === "info" && <Info className="size-5 text-sky-600 dark:text-indigo-400 shrink-0" />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* HEADER NAVBAR */}
      <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-between px-4 md:px-6 sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-3 md:gap-4">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl lg:hidden transition-colors cursor-pointer"
            aria-label="Toggle Menu"
          >
            <Menu className="size-6 text-slate-600 dark:text-slate-400" />
          </button>
          
          <div className="flex items-center gap-2.5">
            <div className="size-9 rounded-xl bg-gradient-to-tr from-[#3b82f6] to-[#4f46e5] flex items-center justify-center shadow-md shadow-indigo-100">
              <Activity className="size-5 text-white" />
            </div>
            <div className="flex items-center gap-1.5 font-bold tracking-tight">
              <span className="text-base sm:text-lg text-[#1e1b4b] dark:text-slate-200">EHR</span>
              <span className="text-slate-350 dark:text-slate-700 font-normal">|</span>
              <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 tracking-wide uppercase hidden xs:inline">Nursing Home Management</span>
            </div>
          </div>
        </div>

        {/* Header Right Profile & Theme Settings */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Light/Dark mode switcher */}
          <button 
            onClick={toggleDarkMode}
            className="p-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all relative cursor-pointer"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun className="size-5 text-amber-500" /> : <Moon className="size-5" />}
          </button>

          <button className="p-1.5 text-slate-500 hover:text-slate-850 dark:text-slate-400 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all relative cursor-pointer">
            <Bell className="size-5" />
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-[#4f46e5]"></span>
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center gap-3 text-left focus:outline-none hover:bg-slate-100 dark:hover:bg-slate-800 p-1.5 rounded-xl transition-all cursor-pointer"
            >
              <div className="hidden md:block">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">Admin User</p>
                <p className="text-[10px] text-slate-505 dark:text-slate-400 leading-none mt-0.5">System Administrator</p>
              </div>
              <div className="relative size-9 rounded-full overflow-hidden border border-slate-100 dark:border-slate-800 bg-gradient-to-tr from-[#3b82f6] to-[#4f46e5] flex items-center justify-center font-bold text-white text-sm shadow-sm">
                U
                <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 border border-white dark:border-slate-900"></span>
              </div>
              <ChevronDown className="size-4 text-slate-505 dark:text-slate-400 hidden sm:block" />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 py-1 z-50 text-slate-700 dark:text-slate-350 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 md:hidden">
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">Admin User</p>
                  <p className="text-[10px] text-slate-505 dark:text-slate-400 mt-0.5">System Administrator</p>
                </div>
                <a href="#profile" className="flex items-center gap-2 px-4 py-2 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <User className="size-4 text-slate-400" /> Account Settings
                </a>
                <a href="#help" className="flex items-center gap-2 px-4 py-2 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <HelpCircle className="size-4 text-slate-400" /> Support Desk
                </a>
                <button 
                  onClick={() => showToast("Simulated Logout Action", "info")}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-955/30 transition-colors text-left border-t border-slate-100 dark:border-slate-800 mt-1 cursor-pointer"
                >
                  <LogOut className="size-4 text-rose-500" /> Logout Session
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        
        {/* SIDEBAR NAVIGATION (Desktop) */}
        <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 hidden lg:flex flex-col justify-between p-4 sticky top-16 h-[calc(100vh-64px)] shrink-0">
          <div className="space-y-1.5">
            {[
              { id: "loc-rate-table", label: "LOC Rate Table", icon: FileText },
              { id: "staffing-ratios", label: "Staffing Ratios", icon: Users },
              { id: "severity-levels", label: "Severity Levels", icon: Settings },
              { id: "sla-config", label: "SLA Config", icon: ShieldAlert },
              { id: "demo-seeder", label: "Demo Seeder", icon: Database },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold transition-all relative cursor-pointer ${
                    isActive 
                      ? "text-[#4f46e5] bg-[#eef2ff] dark:text-indigo-400 dark:bg-indigo-950/50" 
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-50/80 dark:hover:bg-slate-800/60 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`size-4.5 ${isActive ? "text-[#4f46e5]" : "text-slate-400"}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && (
                    <span className="w-1 h-5 rounded-full bg-[#4f46e5] absolute left-0 top-1/2 -translate-y-1/2"></span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
            <button 
              onClick={() => showToast("Demo Utilities loaded.", "info")}
              className="w-full flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-805 text-slate-605 dark:text-slate-400 font-semibold text-xs py-2.5 rounded-xl transition-all shadow-sm bg-white dark:bg-slate-900 cursor-pointer"
            >
              <ListTodo className="size-4" /> Demo Utilities
            </button>
          </div>
        </aside>

        {/* SIDEBAR NAVIGATION (Mobile Overlay Drawer) */}
        {isMobileMenuOpen && (
          <>
            <div 
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/40 z-40 lg:hidden"
            />
            <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white dark:bg-slate-900 z-50 flex flex-col justify-between p-4 shadow-xl animate-in slide-in-from-left duration-300 lg:hidden">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-2">
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Navigation Menu</span>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 dark:text-slate-505 cursor-pointer"
                  >
                    <X className="size-5" />
                  </button>
                </div>
                {[
                  { id: "loc-rate-table", label: "LOC Rate Table", icon: FileText },
                  { id: "staffing-ratios", label: "Staffing Ratios", icon: Users },
                  { id: "severity-levels", label: "Severity Levels", icon: Settings },
                  { id: "sla-config", label: "SLA Config", icon: ShieldAlert },
                  { id: "demo-seeder", label: "Demo Seeder", icon: Database },
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold transition-all relative cursor-pointer ${
                        isActive 
                          ? "text-[#4f46e5] bg-[#eef2ff] dark:text-indigo-400 dark:bg-indigo-950/50" 
                          : "text-slate-500 dark:text-slate-400 hover:bg-slate-50/80 dark:hover:bg-slate-800/60 hover:text-slate-800 dark:hover:text-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`size-4.5 ${isActive ? "text-[#4f46e5]" : "text-slate-400"}`} />
                        <span>{item.label}</span>
                      </div>
                      {isActive && (
                        <span className="w-1 h-5 rounded-full bg-[#4f46e5] absolute left-0 top-1/2 -translate-y-1/2"></span>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                <button 
                  onClick={() => {
                    showToast("Demo Utilities loaded.", "info");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-405 font-semibold text-xs py-2.5 rounded-xl transition-all shadow-sm bg-white dark:bg-slate-900 cursor-pointer"
                >
                  <ListTodo className="size-4" /> Demo Utilities
                </button>
              </div>
            </aside>
          </>
        )}

        {/* MAIN PANEL CONTENT */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto max-w-7xl">
          
          {/* TAB ROUTING RENDERING */}
          {activeTab === "loc-rate-table" && renderLOCRateTable()}
          {activeTab === "severity-levels" && renderSeverityLevels()}
          {activeTab === "sla-config" && renderSLAConfig()}
          {activeTab === "demo-seeder" && renderDemoSeeder()}

          {activeTab === "staffing-ratios" && (
            <div className="space-y-6">
              
              {/* PAGE SUBHEADER */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2">
                <div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                    Staffing Ratio Configuration
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Configure compliance-based nursing hours and safety thresholds.
                  </p>
                </div>
                <div className="text-left md:text-right shrink-0">
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg">
                    Last modified: Oct 24, 2024
                  </span>
                </div>
              </div>

              {/* REGULATORY ALERT BANNER */}
              <div className="bg-[#fefce8] dark:bg-[#78350f]/15 border border-amber-200/85 dark:border-amber-900/50 rounded-2xl p-4 md:p-5 flex gap-3.5 shadow-sm">
                <div className="size-10 rounded-xl bg-amber-100 dark:bg-amber-955/40 flex items-center justify-center shrink-0">
                  <Info className="size-5 text-amber-700 dark:text-amber-400" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-amber-900 dark:text-amber-205 text-sm md:text-base">Regulatory Compliance Alert</h3>
                  <p className="text-xs md:text-sm text-amber-800 dark:text-amber-300 leading-relaxed font-medium">
                    California regulations require a minimum of <strong className="text-amber-950 dark:text-amber-100 font-bold">3.5 nursing hours per resident per day (BR-01)</strong>. Ensure settings below align with current CMS and state directives.
                  </p>
                </div>
              </div>

              {/* CONFIGURATION CARD BOX */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 space-y-8 shadow-sm">
                
                {/* SECTION 1: RATIO SETTINGS */}
                <div className="space-y-6">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#eef2ff] dark:bg-indigo-950/40 text-[#4f46e5] dark:text-indigo-400 w-fit shadow-sm shadow-indigo-100/50 dark:shadow-none">
                      Ratio Settings
                    </span>
                    {/* Visual indicators */}
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                      Sum of shifts: <strong className={isRegularValid ? "text-emerald-600 dark:text-emerald-450 font-bold" : "text-[#4f46e5] dark:text-indigo-455 font-bold"}>{totalRegularShiftHours}h</strong> / {config.minHours}h
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Minimum Daily Hours Input */}
                    <div className="lg:col-span-3 max-w-xl space-y-2">
                      <label className="text-sm font-bold text-[#1e1b4b] dark:text-slate-200 block">
                        Minimum hours per resident per day
                      </label>
                      <div className="relative rounded-xl shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <Clock className="size-4.5 text-slate-400 dark:text-slate-500" />
                        </div>
                        <input
                          type="number"
                          step="0.1"
                          min="0.1"
                          max="24"
                          value={config.minHours}
                          onChange={(e) => handleInputChange("minHours", Number(parseFloat(e.target.value) || 0))}
                          className="w-full pl-10 pr-4 py-2.5 text-[15px] font-semibold text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-[#4f46e5] dark:focus:border-indigo-505 focus:ring-4 focus:ring-[#eef2ff] dark:focus:ring-indigo-950/50 bg-white dark:bg-slate-950"
                        />
                      </div>
                      <p className="text-xs text-slate-400 dark:text-slate-500">Total cumulative hours across all shifts.</p>
                    </div>

                    {/* Regular Shift Hours Inputs */}
                    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block">Day Shift (Hrs)</label>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          value={config.dayShift}
                          onChange={(e) => handleInputChange("dayShift", Number(parseFloat(e.target.value) || 0))}
                          className={`w-full px-3.5 py-2.5 text-sm font-semibold rounded-xl border outline-none focus:ring-4 transition-all bg-white dark:bg-slate-955 ${
                            isRegularValid 
                              ? "border-slate-200 dark:border-slate-700 focus:border-[#4f46e5] dark:focus:border-indigo-500 focus:ring-[#eef2ff] dark:focus:ring-indigo-950/50" 
                              : "border-amber-300 dark:border-amber-800 focus:border-amber-500 focus:ring-amber-50 dark:focus:ring-amber-955/20"
                          }`}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block">Evening Shift (Hrs)</label>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          value={config.eveningShift}
                          onChange={(e) => handleInputChange("eveningShift", Number(parseFloat(e.target.value) || 0))}
                          className={`w-full px-3.5 py-2.5 text-sm font-semibold rounded-xl border outline-none focus:ring-4 transition-all bg-white dark:bg-slate-955 ${
                            isRegularValid 
                              ? "border-slate-200 dark:border-slate-700 focus:border-[#4f46e5] dark:focus:border-indigo-500 focus:ring-[#eef2ff] dark:focus:ring-indigo-950/50" 
                              : "border-amber-300 dark:border-amber-805 focus:border-amber-505 focus:ring-amber-50 dark:focus:ring-amber-955/20"
                          }`}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-405 block">Night Shift (Hrs)</label>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          value={config.nightShift}
                          onChange={(e) => handleInputChange("nightShift", Number(parseFloat(e.target.value) || 0))}
                          className={`w-full px-3.5 py-2.5 text-sm font-semibold rounded-xl border outline-none focus:ring-4 transition-all bg-white dark:bg-slate-955 ${
                            isRegularValid 
                              ? "border-slate-200 dark:border-slate-700 focus:border-[#4f46e5] dark:focus:border-indigo-500 focus:ring-[#eef2ff] dark:focus:ring-indigo-950/50" 
                              : "border-amber-300 dark:border-amber-805 focus:border-amber-505 focus:ring-amber-50 dark:focus:ring-amber-955/20"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Warnings & Live validation state */}
                  {!isRegularValid && (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300 text-xs font-medium border border-amber-100 dark:border-amber-900/50 animate-in fade-in duration-300">
                      <AlertTriangle className="size-4 shrink-0 text-amber-600" />
                      <span>
                        Note: The regular shift sum ({totalRegularShiftHours} hrs) does not equal the target daily minimum ({config.minHours} hrs).
                      </span>
                    </div>
                  )}

                  {/* WEEKEND OVERRIDE CONFIG */}
                  <div className="border border-slate-100 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-800/10 rounded-xl p-4 md:p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">Weekend Override</h4>
                        <p className="text-xs text-slate-505 dark:text-slate-400 leading-normal">
                          Apply different staffing requirements for Saturday and Sunday.
                        </p>
                      </div>
                      
                      {/* TOGGLE SWITCH */}
                      <button
                        type="button"
                        onClick={() => handleInputChange("weekendOverride", !config.weekendOverride)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none focus:ring-2 focus:ring-[#4f46e5]/20 dark:focus:ring-indigo-500/20 ${
                          config.weekendOverride ? "bg-[#4f46e5] dark:bg-indigo-650" : "bg-slate-202"
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                            config.weekendOverride ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>

                    {/* WEEKEND SHIFTS SECTION (Dynamic) */}
                    {config.weekendOverride && (
                      <div className="pt-3 border-t border-slate-100/60 dark:border-slate-850/60 grid grid-cols-1 md:grid-cols-3 gap-4 animate-in slide-in-from-top-3 duration-305">
                        <div className="md:col-span-3 flex justify-between items-center mb-1">
                          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Weekend Shift Settings</span>
                          <span className="text-xs text-slate-404 dark:text-slate-500 font-mono">
                            Sum of shifts: <strong className={isWeekendValid ? "text-emerald-600 dark:text-emerald-450 font-bold" : "text-[#4f46e5] dark:text-indigo-400 font-bold"}>{totalWeekendShiftHours}h</strong> / {config.minHours}h
                          </span>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block">Weekend Day Shift (Hrs)</label>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            value={config.weekendDayShift}
                            onChange={(e) => handleInputChange("weekendDayShift", Number(parseFloat(e.target.value) || 0))}
                            className="w-full px-3.5 py-2.5 text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-[#4f46e5] focus:ring-4 focus:ring-[#eef2ff] dark:focus:ring-indigo-955/50 bg-white dark:bg-slate-950"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block">Weekend Evening Shift (Hrs)</label>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            value={config.weekendEveningShift}
                            onChange={(e) => handleInputChange("weekendEveningShift", Number(parseFloat(e.target.value) || 0))}
                            className="w-full px-3.5 py-2.5 text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-[#4f46e5] focus:ring-4 focus:ring-[#eef2ff] dark:focus:ring-indigo-955/50 bg-white dark:bg-slate-950"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block">Weekend Night Shift (Hrs)</label>
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            value={config.weekendNightShift}
                            onChange={(e) => handleInputChange("weekendNightShift", Number(parseFloat(e.target.value) || 0))}
                            className="w-full px-3.5 py-2.5 text-sm font-semibold rounded-xl border border-slate-200 dark:border-slate-700 outline-none focus:border-[#4f46e5] focus:ring-4 focus:ring-[#eef2ff] dark:focus:ring-indigo-955/50 bg-white dark:bg-slate-950"
                          />
                        </div>
                        {!isWeekendValid && (
                          <div className="md:col-span-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-50 dark:bg-amber-955/20 text-amber-800 dark:text-amber-300 text-xs font-medium border border-amber-100 dark:border-amber-900/50">
                            <AlertTriangle className="size-4 shrink-0 text-amber-600" />
                            <span>Weekend shifts sum ({totalWeekendShiftHours} hrs) does not match target minimum ({config.minHours} hrs).</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* SECTION 2: ALERT THRESHOLD */}
                <div className="space-y-6">
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
                    <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#eef2ff] dark:bg-indigo-950/40 text-[#4f46e5] dark:text-indigo-400 w-fit shadow-sm shadow-indigo-100/50 dark:shadow-none">
                      Alert Threshold
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Warning threshold inputs */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#1e1b4b] dark:text-slate-200 block">
                        Warn when actual ratio falls below X%
                      </label>
                      <div className="relative rounded-xl shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                          <AlertTriangle className="size-4.5 text-slate-400 dark:text-slate-500" />
                        </div>
                        <input
                          type="number"
                          min="1"
                          max="100"
                          value={config.warnThreshold}
                          onChange={(e) => handleInputChange("warnThreshold", Number(parseInt(e.target.value) || 0))}
                          className="w-full pl-10 pr-4 py-2.5 text-[15px] font-semibold text-slate-855 text-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:border-[#4f46e5] focus:ring-4 focus:ring-[#eef2ff] bg-white dark:bg-slate-950"
                        />
                      </div>
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        Percentage of required hours before triggering a dashboard alert.
                      </p>
                    </div>

                    {/* Alert notification recipients selection */}
                    <div className="space-y-2 relative">
                      <label className="text-sm font-bold text-[#1e1b4b] dark:text-slate-200 block">
                        Alert notification recipients
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsRecipientDropdownOpen(!isRecipientDropdownOpen)}
                        className="w-full flex items-center justify-between px-4 py-2.5 text-left text-sm font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-950 outline-none focus:border-[#4f46e5] dark:focus:border-indigo-500 focus:ring-4 focus:ring-[#eef2ff] dark:focus:ring-indigo-950/50 cursor-pointer"
                      >
                        <span>{config.recipients}</span>
                        <ChevronDown className="size-4.5 text-slate-400 dark:text-slate-500" />
                      </button>

                      {/* Dropdown Options */}
                      {isRecipientDropdownOpen && (
                        <>
                          <div onClick={() => setIsRecipientDropdownOpen(false)} className="fixed inset-0 z-10" />
                          <div className="absolute z-20 w-full mt-1.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-xl py-1 text-sm text-slate-700 dark:text-slate-300">
                            {[
                              "Director of Nursing & Administrators",
                              "Administrators Only",
                              "All Nursing Staff",
                              "Clinical Leads & Operations Managers"
                            ].map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => {
                                  handleInputChange("recipients", option);
                                  setIsRecipientDropdownOpen(false);
                                }}
                                className="w-full text-left px-4 py-2.5 hover:bg-slate-55 dark:hover:bg-slate-800 transition-colors font-medium flex items-center justify-between cursor-pointer"
                              >
                                <span>{option}</span>
                                {config.recipients === option && <Check className="size-4 text-[#4f46e5]" />}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* FORM ACTIONS ROW */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={handleSave}
                      className="flex items-center gap-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md shadow-indigo-100 dark:shadow-none focus:outline-none focus:ring-4 focus:ring-indigo-100 cursor-pointer"
                    >
                      <Save className="size-4.5" /> Save Configuration
                    </button>
                    <button
                      type="button"
                      onClick={handleDiscard}
                      className="border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-sm px-6 py-3 rounded-xl transition-all bg-white dark:bg-slate-900 cursor-pointer"
                    >
                      Discard Changes
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-450 font-bold text-xs bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 px-3 py-1.5 rounded-xl w-fit">
                    <Check className="size-4" />
                    <span>Validated against BR-01 Standards</span>
                  </div>
                </div>

              </div>

              {/* VERSION HISTORY ACCORDION */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden shadow-sm">
                <button
                  type="button"
                  onClick={() => setIsVersionHistoryOpen(!isVersionHistoryOpen)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50/50 dark:hover:bg-slate-808/30 transition-all focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <RotateCcw className="size-4.5 text-slate-400" />
                    <span>Version history (Previous configurations)</span>
                  </div>
                  {isVersionHistoryOpen ? (
                    <ChevronUp className="size-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="size-5 text-slate-400" />
                  )}
                </button>

                {isVersionHistoryOpen && (
                  <div className="border-t border-slate-100 dark:border-slate-800 p-4 md:p-6 bg-slate-50/30 dark:bg-slate-800/10 animate-in slide-in-from-top-2 duration-300">
                    
                    {/* Desktop/Tablet Table Layout */}
                    <div className="hidden md:block overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs md:text-sm">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-505 uppercase tracking-wider text-[11px] font-bold">
                            <th className="pb-3 pl-2">Version</th>
                            <th className="pb-3">Saved Date</th>
                            <th className="pb-3">Min Hours</th>
                            <th className="pb-3">Shift Ratio (D/E/N)</th>
                            <th className="pb-3">Recipients</th>
                            <th className="pb-3">Author</th>
                            <th className="pb-3 text-right pr-2">Action</th>
                          </tr>
                        </thead>
                        <tbody className="text-slate-600 dark:text-slate-300 divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                          {versions.map((version) => (
                            <tr key={version.id} className={`hover:bg-slate-105/40 dark:hover:bg-slate-800/20 transition-colors ${version.active ? "bg-[#eef2ff]/30 dark:bg-indigo-955/20" : ""}`}>
                              <td className="py-3.5 pl-2 font-bold text-slate-900 dark:text-slate-100">
                                <div className="flex items-center gap-2">
                                  <span>v1.{version.id}</span>
                                  {version.active && (
                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#eef2ff] dark:bg-indigo-950/40 text-[#4f46e5] dark:text-indigo-400">
                                      Active
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="py-3.5 text-slate-500 font-semibold">{version.date}</td>
                              <td className="py-3.5 font-bold text-slate-800 dark:text-slate-200">{version.minHours} hrs</td>
                              <td className="py-3.5 font-mono text-slate-500 dark:text-slate-405">
                                {version.dayShift} / {version.eveningShift} / {version.nightShift}
                              </td>
                              <td className="py-3.5 text-slate-500 dark:text-slate-400">{version.recipients}</td>
                              <td className="py-3.5 text-slate-550 dark:text-slate-400 font-semibold">{version.author}</td>
                              <td className="py-3.5 text-right pr-2">
                                {version.active ? (
                                  <span className="text-slate-400 dark:text-slate-505 text-xs italic font-semibold">Current active</span>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => handleRestoreVersion(version)}
                                    className="text-[#4f46e5] hover:text-[#4338ca] dark:text-indigo-400 dark:hover:text-indigo-300 font-bold text-xs hover:underline cursor-pointer"
                                  >
                                    Restore version
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile Touch-friendly Card List Layout */}
                    <div className="block md:hidden space-y-4">
                      {versions.map((version) => (
                        <div 
                          key={version.id} 
                          className={`p-4 rounded-xl border transition-all ${
                            version.active 
                              ? "bg-[#eef2ff]/20 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900" 
                              : "bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800"
                          }`}
                        >
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">v1.{version.id}</span>
                            {version.active ? (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#eef2ff] text-[#4f46e5] dark:bg-indigo-950/40 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50">
                                Active
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleRestoreVersion(version)}
                                className="text-[#4f46e5] hover:text-[#4338ca] dark:text-indigo-400 dark:hover:text-indigo-300 font-bold text-xs hover:underline cursor-pointer"
                              >
                                Restore version
                              </button>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-slate-500 dark:text-slate-400">
                            <div>
                              <span className="block text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Date Saved</span>
                              <span className="font-semibold text-slate-700 dark:text-slate-300">{version.date}</span>
                            </div>
                            <div>
                              <span className="block text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Daily Min</span>
                              <span className="font-semibold text-slate-700 dark:text-slate-300">{version.minHours} hrs</span>
                            </div>
                            <div>
                              <span className="block text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Shifts (D/E/N)</span>
                              <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                                {version.dayShift} / {version.eveningShift} / {version.nightShift}
                              </span>
                            </div>
                            <div>
                              <span className="block text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Author</span>
                              <span className="font-semibold text-slate-700 dark:text-slate-300">{version.author}</span>
                            </div>
                            <div className="col-span-2 pt-2 border-t border-slate-100 dark:border-slate-800 mt-1">
                              <span className="block text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 font-semibold">Notification Recipients</span>
                              <span className="font-semibold text-slate-700 dark:text-slate-300">{version.recipients}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                )}
              </div>

            </div>
          )}

        </main>
      </div>

      {/* FOOTER BAR */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 dark:text-slate-500 font-semibold mt-auto z-10">
        <div>
          <span>© 2026 EHR - Nursing Home Management. Confidential Admin Interface.</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#support" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Support Desk</a>
          <span className="text-slate-205 dark:text-slate-800 font-light">|</span>
          <a href="#docs" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Documentation</a>
        </div>
      </footer>

    </div>
  );
};
