export const ConfirmationLog = () => {
  return (
    <section className="space-y-2">
      <div className="rounded-md bg-secondary p-4 text-sm text-secondary-foreground">
        Confirmed by: Nurse Jane Smith (RN) · 2026-06-29 09:42 AM · Action: LOC
        Confirmed (Level 4)
      </div>
      <p className="text-sm text-muted-foreground">
        → Next step: Care Plan creation initiated automatically (M2-US-01)
      </p>
    </section>
  );
};
