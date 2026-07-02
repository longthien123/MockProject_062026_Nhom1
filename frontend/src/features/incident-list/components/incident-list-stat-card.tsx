import { CircleCheck, Clock3, FileText, Hourglass } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type IncidentListStatCardProps = {
    type: "open" | "overdue" | "pending" | "resolved";
    label: string;
    value: number;
};

const iconMap = {
    open: FileText,
    overdue: Clock3,
    pending: Hourglass,
    resolved: CircleCheck,
};

export function IncidentListStatCard({
    type,
    label,
    value,
}: IncidentListStatCardProps) {
    const Icon = iconMap[type];

    return (
        <Card className="rounded-none border-neutral-300 shadow-none">
            <CardContent className="flex items-center gap-5 p-5">
                <Icon className="h-8 w-8 text-neutral-900" />

                <div>
                    <p className="text-sm text-neutral-500">{label}</p>
                    <p className="text-2xl font-medium">{value}</p>
                </div>
            </CardContent>
        </Card>
    );
}