// layouts/sidebar-nav-item.tsx
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { NavLink } from "react-router-dom";
import type { NavItem } from "./types/layout-type";

interface SidebarNavItemProps {
  item: NavItem;
}

export function SidebarNavItem({ item }: SidebarNavItemProps) {
  const [open, setOpen] = useState(false);
  const Icon = item.icon;
  const hasChildren = !!item.children?.length;

  if (!hasChildren) {
    return (
      <NavLink
        to={item.path}
        end={item.path === "/"}
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
            isActive
              ? "bg-blue-50 text-blue-700"
              : "text-gray-600 hover:bg-gray-100"
          }`
        }
      >
        <Icon className="h-4.5 w-4.5 shrink-0" size={18} />
        <span>{item.label}</span>
      </NavLink>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100"
      >
        <Icon className="h-4.5 w-4.5 shrink-0" size={18} />
        <span className="flex-1 text-left">{item.label}</span>
        <ChevronDown
          size={16}
          className={`shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="ml-8 mt-1 flex flex-col gap-0.5 border-l border-gray-100 pl-3">
          {item.children!.map((child) => (
            <NavLink
              key={child.path}
              to={child.path}
              className={({ isActive }) =>
                `rounded-md px-2 py-1.5 text-sm transition-colors ${
                  isActive
                    ? "text-blue-700 font-medium"
                    : "text-gray-500 hover:text-gray-800"
                }`
              }
            >
              {child.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}
