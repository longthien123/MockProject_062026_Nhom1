import {
    Home,
    Users,
    ClipboardList,
    Pill,
    ShieldAlert,
    BarChart3,
    Settings,
    LogOut,
    ChevronDown,
} from "lucide-react";

const menuItems = [
    { label: "Dashboard", icon: Home },
    { label: "Residents", icon: Users },
    { label: "Care Planning", icon: ClipboardList },
    { label: "eMAR", icon: Pill },
];

export function IncidentListSidebar() {
    return (
        <aside className="hidden w-56 shrink-0 flex-col border-r bg-white lg:flex">
            <div className="flex h-14 items-center gap-3 border-b px-5">
                <span className="text-lg">☰</span>
                <span className="font-semibold">NHMS</span>
            </div>

            <nav className="flex flex-1 flex-col gap-1 p-3 text-sm text-neutral-600">
                {menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div key={item.label} className="flex items-center gap-3 px-3 py-2">
                            <Icon className="h-4 w-4" />
                            {item.label}
                        </div>
                    );
                })}

                <div className="mt-2 flex items-center justify-between px-3 py-2 font-medium text-neutral-900">
                    <div className="flex items-center gap-3">
                        <ShieldAlert className="h-4 w-4" />
                        Incident & Risk
                    </div>
                    <ChevronDown className="h-4 w-4" />
                </div>

                <div className="ml-7 px-3 py-2 text-xs">Report New Incident</div>
                <div className="ml-7 bg-neutral-200 px-3 py-2 text-xs text-neutral-900">
                    Incident List
                </div>
                <div className="ml-7 px-3 py-2 text-xs">Risk Monitoring</div>

                <div className="mt-2 flex items-center justify-between px-3 py-2">
                    <div className="flex items-center gap-3">
                        <BarChart3 className="h-4 w-4" />
                        Reports
                    </div>
                    <ChevronDown className="h-4 w-4" />
                </div>

                <div className="flex items-center justify-between px-3 py-2">
                    <div className="flex items-center gap-3">
                        <Settings className="h-4 w-4" />
                        Admin
                    </div>
                    <ChevronDown className="h-4 w-4" />
                </div>
            </nav>

            <div className="flex items-center gap-3 px-5 py-5 text-sm text-neutral-600">
                <LogOut className="h-4 w-4" />
                Logout
            </div>
        </aside>
    );
}