import { type ReactNode, useState } from "react";
import {
  Menu,
  X,
  FileText,
  Users,
  Shield,
  Clock,
  Database
} from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
  activeTab?: string;
}

export function AdminLayout({ children, activeTab = "severity" }: AdminLayoutProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const navigationItems = [
    { id: "loc", name: "LOC Rate Table", icon: FileText, path: "#" },
    { id: "staffing", name: "Staffing Ratios", icon: Users, path: "#" },
    { id: "severity", name: "Severity Levels", icon: Shield, path: "#" },
    { id: "sla", name: "SLA Config", icon: Clock, path: "#" },
    { id: "demo", name: "Demo Seeder", icon: Database, path: "#" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Header Bar (Dark slate-900 / black background) */}
      <header className="h-16 bg-[#1e293b] text-white flex items-center justify-between px-6 shrink-0 z-50">
        <div className="flex items-center gap-3">
          {/* Mobile Hamburguer */}
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <Menu className="size-5" />
          </button>

          {/* Logo & EKG Icon */}
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-blue-500 shadow-md shadow-blue-500/20">
              {/* EKG pulse SVG */}
              <svg
                className="size-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 12h3l2-5 3 10 2-7 2 2h4"
                />
              </svg>
            </div>
            <span className="text-md font-bold tracking-wide text-white">
              EHR — <span className="text-slate-200 font-medium">Nursing Home Management</span>
            </span>
          </div>
        </div>

        {/* Admin profile (Admin User System Administrator) */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-white leading-none">Admin User</p>
            <p className="text-[10px] text-slate-400 mt-1 leading-none">System Administrator</p>
          </div>
          <div className="relative">
            <div className="size-9 rounded-full bg-slate-700 border border-slate-650 flex items-center justify-center overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Admin Avatar"
                className="size-full object-cover"
              />
              <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-green-500 ring-2 ring-[#1e293b]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main workspace container (sidebar + content) */}
      <div className="flex-1 flex min-h-0 relative">
        {/* Desktop Sidebar (White background) */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white border-r border-slate-200 shrink-0 justify-between py-6">
          <nav className="px-4 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === activeTab;
              return (
                <a
                  key={item.id}
                  href={item.path}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-lg text-sm font-semibold transition-all duration-150 relative ${
                    isActive
                      ? "bg-sky-50/70 text-sky-600"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className={`size-4.5 ${isActive ? "text-sky-500" : "text-slate-400"}`} />
                    {item.name}
                  </span>
                  {isActive && (
                    <span className="absolute right-0 top-0 bottom-0 w-[3px] bg-sky-500 rounded-l" />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="px-4 space-y-4">
            <button className="flex items-center gap-2.5 w-full px-4 py-3 text-sm font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors">
              <Database className="size-4.5 text-slate-400" />
              Demo Utilities
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs lg:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Mobile Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col justify-between py-6 transform transition-transform duration-305 lg:hidden ${
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div>
            <div className="h-12 flex items-center justify-between px-6 border-b border-slate-100 mb-4">
              <span className="text-sm font-bold text-slate-700">Navigation</span>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X className="size-5" />
              </button>
            </div>
            <nav className="px-4 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.id === activeTab;
                return (
                  <a
                    key={item.id}
                    href={item.path}
                    onClick={() => setIsMobileSidebarOpen(false)}
                    className={`flex items-center justify-between px-4 py-3.5 rounded-lg text-sm font-semibold relative ${
                      isActive
                        ? "bg-sky-50/70 text-sky-600"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="size-4.5" />
                      {item.name}
                    </span>
                    {isActive && (
                      <span className="absolute right-0 top-0 bottom-0 w-[3px] bg-sky-500 rounded-l" />
                    )}
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="px-4">
            <button className="flex items-center gap-2.5 w-full px-4 py-3 text-sm font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 rounded-xl">
              <Database className="size-4.5" />
              Demo Utilities
            </button>
          </div>
        </aside>

        {/* Content Wrapper */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <main className="flex-grow p-8 md:p-10 max-w-7xl w-full mx-auto">
            {children}
          </main>

          {/* Footer inside main content area */}
          <footer className="h-14 bg-white border-t border-slate-200 flex items-center justify-between px-8 text-xs text-slate-400 shrink-0">
            <span>© 2026 EHR – Nursing Home Management. Confidential Admin Interface.</span>
            <div className="flex gap-4 font-medium">
              <a href="#" className="hover:text-slate-600">Support</a>
              <a href="#" className="hover:text-slate-600">Documentation</a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
