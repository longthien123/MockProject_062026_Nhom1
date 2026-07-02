export const LOCScoreCard = () => {
  return (
    <div className="flex-1 rounded-md border border-border bg-muted/40 p-2 sm:p-5">
      <p className="text-sm text-muted-foreground">ADL Score:</p>
      <p className="mt-1 text-3xl sm:text-4xl font-bold text-foreground">
        18{" "}
        <span className="text-muted-foreground font-normal text-2xl">/ 24</span>
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        ADL 16-24 → Level 4 (Total Assistance)
      </p>
    </div>
  );
};
