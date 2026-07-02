export type TabItem = {
  label: string;
  active: boolean;
};

export type MedicationOrder = {
  id: string;
  title: string;
  status: string;
  dose: string;
  route: string;
  frequency: string;
  start: string;
  prescriber: string;
  note?: string;
  lastAdministered?: string;
  hasAlert?: boolean;
};
