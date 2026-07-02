// config/nav-config.ts
import {
  Home,
  Users,
  ClipboardList,
  Pill,
  ShieldAlert,
  BarChart3,
  Settings,
} from "lucide-react";
import type { NavItem } from "../layouts/types/layout-type";

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    path: "/",
    icon: Home,
  },
  {
    label: "Residents",
    path: "/residents",
    icon: Users,
  },
  {
    label: "Care Planning",
    path: "/care-planning",
    icon: ClipboardList,
  },
  {
    label: "eMAR",
    path: "/emar",
    icon: Pill,
  },
  {
    label: "Incident & Risk",
    path: "/incident-risk",
    icon: ShieldAlert,
    children: [
      { label: "Incident Reports", path: "/incident-risk/reports" },
      { label: "Risk Assessments", path: "/incident-risk/risk-assessments" },
    ],
  },
  {
    label: "Reports",
    path: "/reports",
    icon: BarChart3,
    children: [
      { label: "Operational Reports", path: "/reports/operational" },
      { label: "Compliance Reports", path: "/reports/compliance" },
    ],
  },
  {
    label: "Admin",
    path: "/admin",
    icon: Settings,
    children: [
      { label: "Users", path: "/admin/users" },
      { label: "Roles & Permissions", path: "/admin/roles-permissions" },
      { label: "Facility Settings", path: "/admin/facility-settings" },
      { label: "Audit Logs", path: "/admin/audit-logs" },
      { label: "System Config", path: "/admin/system-config" },
    ],
  },
];
