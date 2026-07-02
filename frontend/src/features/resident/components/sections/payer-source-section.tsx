import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function PayerSourceSection() {
  return (
    <section>
      <h2 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">Payer Source</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
          <Label>Primary Payer</Label>
          <Select defaultValue="medicare">
            <SelectTrigger><SelectValue placeholder="Select payer" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="medicare">Medicare</SelectItem>
              <SelectItem value="medicaid">Medicaid</SelectItem>
              <SelectItem value="private">Private Insurance</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Các trường từ ghi chú đỏ */}
        <div className="space-y-2">
          <Label>Insurance/Medicare Number</Label>
          <Input placeholder="Number" />
        </div>
        <div className="space-y-2">
          <Label>Authorization Number</Label>
          <Input placeholder="Auth #" />
        </div>
        <div className="space-y-2">
          <Label>Payer Name</Label>
          <Input placeholder="Name" />
        </div>
        <div className="space-y-2 lg:col-span-2">
          <Label>Authorization Start/End Date</Label>
          <div className="flex items-center gap-2">
            <Input type="date" />
            <span className="text-gray-400">-</span>
            <Input type="date" />
          </div>
        </div>
        {/* Trường Coverage Limit đã bị gạch chéo nên mình lược bỏ */}
      </div>
    </section>
  );
}