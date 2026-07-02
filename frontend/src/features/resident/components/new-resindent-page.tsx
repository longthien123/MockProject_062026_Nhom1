import { AlertTriangle, Download, User } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

// Import các section (Được định nghĩa ở dưới)
import {PersonalInfoSection} from "./sections/personal-info-section";
import {EmergencyContactSection} from "./sections/emergency-contact-section";
import {LegalMedicalSection} from "./sections/legal-medical-section";
import {PayerSourceSection} from "./sections/payer-source-section";

export default function NewResidentPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* HEADER */}
      <header className="flex items-center justify-between px-6 py-3 bg-[#2b2b2b] text-white">
        <div className="flex items-center gap-4">
          <span className="text-xl font-semibold">☰ EHR — Nursing Home Management</span>
        </div>
        <div className="flex items-center gap-2 border border-gray-500 rounded-full px-4 py-1.5 bg-[#3a3a3a]">
          <User className="w-4 h-4 text-blue-400" />
          <span className="text-sm">Admin User</span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-6 bg-white shadow-sm mt-4 rounded-md">
        {/* Breadcrumb & Title */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-1">Resident List {'>'} <span className="font-medium">New Resident</span></p>
          <h1 className="text-3xl font-bold text-gray-900">New Resident</h1>
        </div>

        {/* Warning Alert */}
        <Alert className="mb-8 bg-yellow-50 border-yellow-200 text-yellow-800">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription>
            A resident with a similar name already exists. Please verify before saving.
          </AlertDescription>
        </Alert>

        {/* Form Container */}
        <div className="space-y-10">
          <PersonalInfoSection />
          <hr />
          <EmergencyContactSection />
          <hr />
          <LegalMedicalSection />
          <hr />
          <PayerSourceSection />
          <hr />
          
          {/* Form Actions */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-4">
              <Button className="bg-[#2b2b2b] hover:bg-black text-white px-8">
                <Download className="w-4 h-4 mr-2" /> Save Resident
              </Button>
              <Button variant="outline" className="px-8">Cancel</Button>
            </div>
            <p className="text-red-500 text-sm">* Required fields must be filled before saving.</p>
          </div>
        </div>
      </main>
    </div>
  );
}