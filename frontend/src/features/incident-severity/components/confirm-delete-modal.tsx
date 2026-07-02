import { AlertCircle, X } from "lucide-react";
import type { SeverityLevel } from "../types/severity.types";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  level: SeverityLevel | null;
}

export function ConfirmDeleteModal({ isOpen, onClose, onConfirm, level }: ConfirmDeleteModalProps) {
  if (!isOpen || !level) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-100 shadow-2xl z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="size-5 shrink-0" />
            <h2 className="text-sm font-bold text-slate-800">
              Delete Severity Level
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
        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Are you sure you want to delete the severity level <span className="font-bold text-slate-850">"{level.name}"</span>?
            This will permanently remove it from the system configuration.
          </p>
          <div className="bg-amber-50 border border-amber-100 text-amber-700 text-xs rounded-xl p-3 flex gap-2.5">
            <AlertCircle className="size-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              <strong>Warning:</strong> Any incident categories, templates, or SLA times dependent on this severity level may need re-configuration.
            </span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/30">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-xl bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-xs font-semibold shadow-lg shadow-red-500/10 hover:shadow-red-500/20 active:scale-[0.98] transition-all"
          >
            Delete Level
          </button>
        </div>
      </div>
    </div>
  );
}
