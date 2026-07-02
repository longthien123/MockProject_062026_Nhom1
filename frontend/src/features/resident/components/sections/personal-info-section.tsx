import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function PersonalInfoSection() {
  return (
    <section>
      <h2 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">Personal Information</h2>
      {/* Sử dụng Grid: 1 cột cho mobile, 2 cột cho tablet, 3 cột cho desktop.
        gap-6 tạo khoảng cách đều giữa các ô nhập.
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label>First Name *</Label>
          <Input placeholder="Enter first name" />
        </div>
        <div className="space-y-2">
          <Label>Last Name *</Label>
          <Input placeholder="Enter last name" />
        </div>
        
        {/* Photo Upload (Ghi chú đỏ) */}
        <div className="space-y-2 md:col-span-2 lg:col-span-1">
          <Label>Photo</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-md p-2 text-center cursor-pointer hover:bg-gray-50">
            <span className="text-sm text-blue-600 font-medium">Click to upload photo</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Date of Birth *</Label>
          <Input placeholder="MM/DD/YYYY" />
        </div>
        <div className="space-y-2">
          <Label>Gender *</Label>
          <Select>
            <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Các trường bổ sung từ ghi chú đỏ */}
        <div className="space-y-2">
          <Label>SSN</Label>
          <Input placeholder="XXX-XX-XXXX" />
        </div>
        <div className="space-y-2">
          <Label>Status</Label>
          <Select>
            <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Expected Admission Date</Label>
          <Input type="date" />
        </div>
        <div className="space-y-2 lg:col-span-3">
          <Label>Referral Source</Label>
          <Input placeholder="Enter referral source" />
        </div>
      </div>
    </section>
  );
}