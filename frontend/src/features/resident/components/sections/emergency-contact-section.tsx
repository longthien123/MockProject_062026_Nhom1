import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function EmergencyContactSection() {
  return (
    <section>
      <h2 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">Emergency Contact</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label>Contact Name *</Label>
          <Input placeholder="Full name" />
        </div>
        <div className="space-y-2">
          <Label>Phone *</Label>
          <Input placeholder="Phone number" />
        </div>
        <div className="space-y-2">
          <Label>Relationship</Label>
          <Select>
            <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="spouse">Spouse</SelectItem>
              <SelectItem value="child">Child</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Email (Ghi chú đỏ) */}
        <div className="space-y-2">
          <Label>Email</Label>
          <Input type="email" placeholder="Email address" />
        </div>
      </div>
    </section>
  );
}