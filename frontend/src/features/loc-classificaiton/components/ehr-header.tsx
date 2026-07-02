import { Menu } from "lucide-react";

export const EhrHeader = () => {
  return (
    <header className="max-w-6xl mx-auto flex items-center justify-between bg-foreground px-4 py-4 sm:px-6 text-background">
      <div className="flex items-center gap-3">
        <span>
          <Menu />
        </span>
        <h1 className="font-semibold text-sm sm:text-base">
          EHR — Nursing Home Management
        </h1>
      </div>
      <span className="hidden sm:flex items-center gap-2 text-sm">Admin</span>
    </header>
  );
};
