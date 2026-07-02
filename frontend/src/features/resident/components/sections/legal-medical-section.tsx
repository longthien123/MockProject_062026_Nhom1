import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function LegalMedicalSection() {
  return (
    <section>
      <h2 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">Legal & Medical Flags</h2>
      <div className="space-y-6">
        {/* Power of Attorney */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Label className="text-base font-medium">Power of Attorney (POA)</Label>
            <Switch />
            <span className="text-sm text-gray-500">No</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-gray-500">POA Full Name (if applicable)</Label>
              <Input disabled placeholder="Disabled unless POA toggled on" />
            </div>
          </div>
        </div>

        {/* DNR */}
        <div className="flex items-center gap-3 pt-2">
          <Label className="text-base font-medium">Do Not Resuscitate (DNR)</Label>
          <Switch checked={true} className="data-[state=checked]:bg-red-600" />
          <span className="text-sm font-semibold text-red-600">Yes — DNR Active</span>
        </div>
      </div>
    </section>
  );
}