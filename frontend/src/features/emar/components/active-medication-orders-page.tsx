import * as React from "react";

import { MedicationOrderCard } from "./medication-order-card";
import { ClientInfoCard } from "./client-info-card";
import { SearchBar } from "./search-bar";
import { TabButton } from "@/components/ui/emar-tab-button";
import type { MedicationOrder, TabItem } from "../types/emar-types";

const tabs: TabItem[] = [
  { label: "Active orders", active: true },
  { label: "Discontinued", active: false },
];

const medicationOrders: MedicationOrder[] = [
  {
    id: "lisinopril",
    title: "Lisinopril (Zestril)",
    status: "Active",
    dose: "10 mg",
    route: "Oral",
    frequency: "Once Daily",
    start: "08/12/2023",
    prescriber: "Dr. Sarah Mitchell",
    note: "Patient has a documented sensitivity to ACE inhibitors. Review required.",
    hasAlert: true,
  },
  {
    id: "metformin",
    title: "Metformin (Glucophage)",
    status: "Active",
    dose: "500 mg",
    route: "Oral",
    frequency: "Twice Daily",
    start: "01/15/2024",
    prescriber: "Dr. James Wilson",
    note:
      "Administer with breakfast and dinner. Monitor blood glucose levels weekly. If patient experiences GI upset, switch to extended release version.",
    lastAdministered: "05/20/2024, 08:00 AM",
  },
  {
    id: "atorvastatin",
    title: "Atorvastatin (Lipitor)",
    status: "Active",
    dose: "20 mg",
    route: "Oral",
    frequency: "Nightly",
    start: "11/05/2023",
    prescriber: "Dr. Sarah Mitchell",
  },
  {
    id: "multivitamin",
    title: "Multivitamin (Adult Formula)",
    status: "Active",
    dose: "1 tab",
    route: "Oral",
    frequency: "Once Daily",
    start: "06/10/2023",
    prescriber: "Dr. James Wilson",
  },
];

export function ActiveMedicationOrdersPage() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans antialiased text-slate-900">
      <header className="fixed top-0 w-full z-50 border-b border-slate-300/30 shadow-sm bg-[#2e47b8]">
        <div className="flex justify-between items-center h-16 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-2xl font-bold flex items-center gap-2 text-white">Nursing Home</div>
          <nav className="hidden md:flex items-center gap-8 ml-auto text-sm text-white">
            <a className="hover:text-slate-200 transition-colors" href="#">
              Header
            </a>
            <a className="hover:text-slate-200 transition-colors" href="#">
              Header
            </a>
            <a className="hover:text-slate-200 transition-colors" href="#">
              Header
            </a>
            <a className="hover:text-slate-200 transition-colors" href="#">
              Header
            </a>
            <a className="hover:text-slate-200 transition-colors" href="#">
              Header
            </a>
          </nav>
        </div>
      </header>

      <main className="pt-24 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-1/3 space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 leading-tight">
                Active Medication Orders — <br />
                <span className="text-[#2e47b8]">Eleanor Rigby</span>
              </h1>
            </div>

            <ClientInfoCard
              name="Eleanor Rigby"
              dob="05/14/1938 (85y)"
              room="204-B"
              id="#NH-99231"
            />

            <div className="space-y-4">
              <SearchBar />
            </div>
          </aside>

          <section className="w-full lg:w-2/3">
            <div className="flex bg-slate-100 p-1 rounded-[1.125rem] mb-6 w-full border border-slate-300/30">
              {tabs.map((tab) => (
                <TabButton key={tab.label} active={tab.active}>
                  {tab.label}
                </TabButton>
              ))}
            </div>

            <div className="space-y-4">
              {medicationOrders.map((order) => (
                <MedicationOrderCard key={order.id} order={order} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
