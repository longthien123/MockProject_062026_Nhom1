import {
    Bell,
    CircleHelp,
    ChevronDown,
    Menu,
    UserCircle,
    FileWarning,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { IncidentListSidebar } from "../components/incident-list-sidebar";
import { IncidentListStatCard } from "../components/incident-list-stat-card";
import { IncidentListFilter } from "../components/incident-list-filter";
import { IncidentListTable } from "../components/incident-list-table";
import { IncidentListPagination } from "../components/incident-list-pagination";

export function IncidentListPage() {
    return (
        <div className="min-h-screen bg-[#f7f7f7] text-neutral-800">
            <div className="flex min-h-screen">
                <IncidentListSidebar />

                <main className="flex min-w-0 flex-1 flex-col">
                    <header className="flex h-14 items-center justify-between border-b bg-white px-4 lg:px-6">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" className="lg:hidden">
                                <Menu className="h-5 w-5" />
                            </Button>

                            <span className="hidden text-sm text-neutral-500 md:block">
                                Nursing Home Management System
                            </span>
                        </div>

                        <div className="flex items-center gap-4">
                            <Bell className="h-5 w-5" />
                            <CircleHelp className="h-5 w-5" />

                            <div className="flex items-center gap-2">
                                <UserCircle className="h-8 w-8" />
                                <div className="hidden leading-tight sm:block">
                                    <p className="text-sm font-semibold">Anna Lee, RN</p>
                                    <p className="text-xs text-neutral-500">DON</p>
                                </div>
                                <ChevronDown className="h-4 w-4" />
                            </div>
                        </div>
                    </header>

                    <section className="flex-1 px-4 py-5 md:px-6 lg:px-8">
                        <div className="mb-5 text-sm text-neutral-500">
                            Incident & Risk <span className="mx-2">&gt;</span> Incident List
                        </div>

                        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <h1 className="text-2xl font-semibold">Incidents</h1>

                            <Button className="w-full rounded-none bg-neutral-900 text-white hover:bg-neutral-800 sm:w-auto">
                                <FileWarning className="mr-2 h-4 w-4" />
                                Report New Incident
                            </Button>
                        </div>

                        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                            <IncidentListStatCard type="open" label="Total Open Incidents" value={24} />
                            <IncidentListStatCard type="overdue" label="Overdue SLA" value={5} />
                            <IncidentListStatCard type="pending" label="Pending Review" value={12} />
                            <IncidentListStatCard type="resolved" label="Resolved This Month" value={18} />
                        </div>

                        <IncidentListFilter />
                        <IncidentListTable />
                        <IncidentListPagination />
                    </section>

                    <footer className="flex flex-col gap-2 border-t bg-white px-4 py-3 text-xs text-neutral-400 md:flex-row md:justify-between lg:px-8">
                        <span>© 2026 NHMS - All rights reserved.</span>
                        <span>Privacy Policy&nbsp;&nbsp; | &nbsp;&nbsp;Terms of Use&nbsp;&nbsp; | &nbsp;&nbsp;Support</span>
                    </footer>
                </main>
            </div>
        </div>
    );
}