export const DailyRatePreview = () => {
  return (
    <section>
      <h2 className="text-xs font-semibold text-muted-foreground">
        DAILY RATE PREVIEW
      </h2>
      <div className="mt-3 rounded-md border border-border bg-muted/40 p-4 sm:p-5">
        <p className="text-sm text-muted-foreground">
          Estimated Daily Rate (Level 4):
        </p>
        <p className="mt-1 font-bold text-foreground">
          $320.00 / day{" "}
          <span className="font-normal text-muted-foreground">
            (from LOC Rate Table)
          </span>
        </p>
      </div>
    </section>
  );
};
