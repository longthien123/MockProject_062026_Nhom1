import { useEffect, useState } from "react";
import { X, Info, ShieldAlert } from "lucide-react";
import type { SeverityLevel } from "../types/severity.types";

interface SeverityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (level: Omit<SeverityLevel, "id" | "createdAt"> & { id?: string }) => void;
  editLevel?: SeverityLevel | null;
}

const PRESET_COLORS = [
  { name: "white", label: "White / Default", hex: "#FFFFFF", bgClass: "bg-white border-slate-350 border", ringClass: "focus:ring-slate-200" },
  { name: "red", label: "Critical Red", hex: "#EF4444", bgClass: "bg-red-500", ringClass: "focus:ring-red-300" },
  { name: "orange", label: "High Orange", hex: "#F97316", bgClass: "bg-orange-500", ringClass: "focus:ring-orange-300" },
  { name: "amber", label: "Medium Amber", hex: "#F59E0B", bgClass: "bg-amber-500", ringClass: "focus:ring-amber-300" },
  { name: "blue", label: "Low Blue", hex: "#3B82F6", bgClass: "bg-blue-500", ringClass: "focus:ring-blue-300" },
  { name: "green", label: "Minor Green", hex: "#10B981", bgClass: "bg-green-500", ringClass: "focus:ring-green-300" },
];

export function SeverityModal({ isOpen, onClose, onSave, editLevel }: SeverityModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);
  const [chartLockTrigger, setChartLockTrigger] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editLevel) {
      setName(editLevel.name);
      setDescription(editLevel.description);
      setChartLockTrigger(editLevel.chartLockTrigger);
      const colorMatch = PRESET_COLORS.find((c) => c.name === editLevel.color);
      if (colorMatch) setSelectedColor(colorMatch);
    } else {
      setName("");
      setDescription("");
      setChartLockTrigger(false);
      setSelectedColor(PRESET_COLORS[0]);
    }
    setError("");
  }, [editLevel, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Severity level name is required.");
      return;
    }
    if (!description.trim()) {
      setError("Description is required to guide medical staff.");
      return;
    }

    onSave({
      ...(editLevel && { id: editLevel.id }),
      name: name.trim(),
      description: description.trim(),
      color: selectedColor.name,
      colorHex: selectedColor.hex,
      chartLockTrigger,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-100 shadow-2xl z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
              <ShieldAlert className="size-4.5" />
            </div>
            <h2 className="text-base font-bold text-slate-800">
              {editLevel ? "Edit Severity Level" : "Add New Severity Level"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="size-4.5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl p-3 flex gap-2">
              <Info className="size-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Severity Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Severity Level Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Critical, High, Medium, Low"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200"
            />
          </div>

          {/* Color Indicator */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-700">
              Color Alert Indicator <span className="text-red-500">*</span>
            </label>
            <p className="text-[11px] text-slate-400 -mt-1 leading-normal">
              Determines the visual badge color shown throughout the system dashboards.
            </p>
            <div className="flex items-center gap-3.5 pt-1">
              {PRESET_COLORS.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`size-8 rounded-full ${color.bgClass} focus:outline-none focus:ring-4 ${
                    color.ringClass
                  } transition-all relative ${
                    selectedColor.name === color.name
                      ? "ring-4 ring-offset-2 ring-slate-400 scale-110 shadow-md"
                      : "opacity-80 hover:opacity-100"
                  }`}
                  title={color.label}
                >
                  {selectedColor.name === color.name && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className={`size-4 ${color.name === "white" ? "text-slate-650" : "text-white"}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </button>
              ))}
              <span className="text-xs text-slate-500 font-medium ml-1">
                {selectedColor.label}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700">
              Medical Staff Description <span className="text-red-500">*</span>
            </label>
            <p className="text-[11px] text-slate-400 -mt-1 leading-normal">
              Guideline help text to assist Nurses/CNAs in selecting the correct level during reports.
            </p>
            <textarea
              rows={3}
              placeholder="Provide clinical criteria for when this level is applied (e.g. resident exhibits life-threatening symptoms, cardiac arrest...)"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (error) setError("");
              }}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 focus:outline-none transition-all duration-200 resize-none"
            />
          </div>

          {/* Chart Lock Toggle */}
          <div className="rounded-xl border border-blue-100 bg-blue-50/30 p-4 flex items-start gap-3.5">
            <div className="flex items-center h-5 mt-0.5">
              <button
                type="button"
                role="switch"
                aria-checked={chartLockTrigger}
                onClick={() => setChartLockTrigger((prev) => !prev)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  chartLockTrigger ? "bg-blue-600" : "bg-slate-200"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block size-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    chartLockTrigger ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
            <div className="flex-1">
              <label className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                Kích hoạt Khóa hồ sơ (Chart Lock Trigger)
              </label>
              <p className="text-[11px] text-slate-500 leading-relaxed mt-1">
                **NFR-03 Compliance**: Khi được kích hoạt, bất kỳ báo cáo sự cố nào thuộc mức độ này sẽ ngay lập tức khóa cứng hồ sơ bệnh án của bệnh nhân liên quan để bảo mật hiện trạng điều trị pháp lý.
              </p>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-xs font-semibold shadow-lg shadow-blue-500/15 hover:shadow-blue-500/25 active:scale-[0.98] transition-all"
            >
              {editLevel ? "Save Changes" : "Create Level"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
