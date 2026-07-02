import { Calendar, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function IncidentListFilter() {
    return (
        <div className="mb-3 grid grid-cols-1 gap-3 border bg-white p-4 md:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_1fr_1.3fr]">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
                <Input
                    className="rounded-none pl-9"
                    placeholder="Search by resident name or incident ID..."
                />
            </div>

            <Select defaultValue="all">
                <SelectTrigger className="rounded-none">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="under-review">Under Review</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
            </Select>

            <Select defaultValue="all">
                <SelectTrigger className="rounded-none">
                    <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
            </Select>

            <Select defaultValue="all">
                <SelectTrigger className="rounded-none">
                    <SelectValue placeholder="Incident Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="fall">Fall</SelectItem>
                    <SelectItem value="medication-error">Medication Error</SelectItem>
                    <SelectItem value="skin-tear">Skin Tear</SelectItem>
                </SelectContent>
            </Select>

            <div className="relative">
                <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-600" />
                <Input
                    readOnly
                    value="06/01/2026-06/29/2026"
                    className="rounded-none pl-9 text-sm font-medium"
                />
            </div>
        </div>
    );
}