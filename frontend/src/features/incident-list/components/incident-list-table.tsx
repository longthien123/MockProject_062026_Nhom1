import { Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

type IncidentSeverity = "Low" | "Medium" | "High" | "Critical";
type IncidentStatus = "Open" | "Under Review" | "Resolved" | "Reported to Authority";

type IncidentItem = {
    id: string;
    residentName: string;
    room: string;
    incidentType: string;
    severity: IncidentSeverity;
    reportedBy: string;
    reportedDate: string;
    reportedTime: string;
    status: IncidentStatus;
    slaTimer: string;
    dueTime?: string;
    isOverdue?: boolean;
};

const incidentList: IncidentItem[] = [
    {
        id: "INC-2026-0042",
        residentName: "Mary Johnson",
        room: "203-B",
        incidentType: "Fall",
        severity: "High",
        reportedBy: "Anna Lee, RN",
        reportedDate: "06/29/2026",
        reportedTime: "02:15PM",
        status: "Open",
        slaTimer: "23h 15m 10s",
        dueTime: "06/30 02:30PM",
    },
    {
        id: "INC-2026-0041",
        residentName: "Robert Johnson",
        room: "205-B",
        incidentType: "Medication Error",
        severity: "Critical",
        reportedBy: "David Kim, RN",
        reportedDate: "06/29/2026",
        reportedTime: "11:05AM",
        status: "Under Review",
        slaTimer: "12h 45m 30s",
        dueTime: "06/30 11:50AM",
    },
    {
        id: "INC-2026-0040",
        residentName: "Dorothy Williams",
        room: "118-C",
        incidentType: "Skin Tear",
        severity: "Low",
        reportedBy: "Lisa Chen, LPN",
        reportedDate: "06/28/2026",
        reportedTime: "09:40AM",
        status: "Open",
        slaTimer: "5h 20m 05s",
        dueTime: "06/29 03:00PM",
    },
    {
        id: "INC-2026-0039",
        residentName: "Charles Davis",
        room: "302-A",
        incidentType: "Aggressive Behavior",
        severity: "High",
        reportedBy: "Michael Brown, CNA",
        reportedDate: "06/27/2026",
        reportedTime: "04:30PM",
        status: "Open",
        slaTimer: "-02h 30m 12s",
        dueTime: "06/28 04:30PM",
        isOverdue: true,
    },
    {
        id: "INC-2026-0038",
        residentName: "Helen Martinez",
        room: "210-B",
        incidentType: "Fall",
        severity: "Medium",
        reportedBy: "Anna Lee, RN",
        reportedDate: "06/27/2026",
        reportedTime: "10:15AM",
        status: "Resolved",
        slaTimer: "N/A",
    },
    {
        id: "INC-2026-0037",
        residentName: "James Wilson",
        room: "115-A",
        incidentType: "Elopement",
        severity: "Critical",
        reportedBy: "David Kim, RN",
        reportedDate: "06/26/2026",
        reportedTime: "08:20PM",
        status: "Reported to Authority",
        slaTimer: "N/A",
    },
];

function getSeverityClassName(severity: IncidentSeverity) {
    const classMap: Record<IncidentSeverity, string> = {
        Low: "border-neutral-300 text-neutral-500",
        Medium: "border-blue-300 text-blue-500",
        High: "border-red-300 text-red-500",
        Critical: "border-neutral-500 text-neutral-700",
    };

    return classMap[severity];
}

function getStatusClassName(status: IncidentStatus) {
    if (status === "Open") return "border-red-300 text-red-500";
    return "border-neutral-400 text-neutral-600";
}

export function IncidentListTable() {
    return (
        <div className="overflow-x-auto border bg-white">
            <Table className="min-w-[1120px]">
                <TableHeader>
                    <TableRow className="border-b bg-white">
                        <TableHead>Incident ID</TableHead>
                        <TableHead>Resident/Room</TableHead>
                        <TableHead>Incident Type</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Reported By</TableHead>
                        <TableHead>Reported At</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>SLA Timer</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {incidentList.map((incident) => (
                        <TableRow
                            key={incident.id}
                            className={incident.isOverdue ? "border-l-4 border-l-red-500" : ""}
                        >
                            <TableCell className="text-sm text-neutral-600">{incident.id}</TableCell>

                            <TableCell>
                                <p className="text-sm text-neutral-600">{incident.residentName}</p>
                                <p className="text-sm font-semibold text-neutral-700">{incident.room}</p>
                            </TableCell>

                            <TableCell className="text-sm text-neutral-600">
                                {incident.incidentType}
                            </TableCell>

                            <TableCell>
                                <Badge
                                    variant="outline"
                                    className={`rounded-none bg-white font-normal ${getSeverityClassName(
                                        incident.severity,
                                    )}`}
                                >
                                    {incident.severity}
                                </Badge>
                            </TableCell>

                            <TableCell className="text-sm text-neutral-600">
                                {incident.reportedBy}
                            </TableCell>

                            <TableCell className="text-sm text-neutral-600">
                                <p>{incident.reportedDate}</p>
                                <p>{incident.reportedTime}</p>
                            </TableCell>

                            <TableCell>
                                <Badge
                                    variant="outline"
                                    className={`rounded-none bg-white font-normal ${getStatusClassName(
                                        incident.status,
                                    )}`}
                                >
                                    {incident.status}
                                </Badge>
                            </TableCell>

                            <TableCell>
                                {incident.slaTimer === "N/A" ? (
                                    <span className="font-semibold text-neutral-600">N/A</span>
                                ) : (
                                    <div
                                        className={
                                            incident.isOverdue
                                                ? "text-sm text-red-500"
                                                : "text-sm text-neutral-600"
                                        }
                                    >
                                        <div className="flex items-center gap-2 font-semibold">
                                            <Clock3 className="h-4 w-4" />
                                            {incident.slaTimer}
                                        </div>
                                        <p className="text-xs">
                                            Due: <span className="font-semibold">{incident.dueTime}</span>
                                        </p>
                                    </div>
                                )}
                            </TableCell>

                            <TableCell className="text-center">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="rounded-none border-neutral-700 px-5"
                                >
                                    View
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}