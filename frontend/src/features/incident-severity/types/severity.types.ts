export interface SeverityLevel {
  id: string;
  name: string;
  description: string;
  color: string; // Tailwind color name like 'red', 'amber', 'blue', 'green'
  colorHex: string; // Corresponding hex code for color indicator
  chartLockTrigger: boolean; // Triggers automatic medical record freezing
  createdAt: string;
}
