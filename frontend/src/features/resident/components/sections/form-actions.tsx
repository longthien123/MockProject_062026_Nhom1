// components/forms/FormActions.tsx
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export function FormActions() {
  return (
    <div className="sticky bottom-0 mt-8 flex flex-col-reverse gap-4 border-t bg-white py-6 md:flex-row md:items-center md:justify-between">
      {/* Nút hành động */}
      <div className="flex items-center gap-3">
        <Button 
          type="submit" 
          className="bg-[#2b2b2b] hover:bg-gray-800 text-white px-6 shadow-md"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Resident
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          className="px-6"
        >
          Cancel
        </Button>
      </div>

      {/* Thông báo lỗi yêu cầu */}
      <p className="text-sm text-red-500 font-medium">
        * Required fields must be filled before saving.
      </p>
    </div>
  );
}