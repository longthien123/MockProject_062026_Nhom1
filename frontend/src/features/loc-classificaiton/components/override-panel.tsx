export const OverridePanel = () => {
  return (
    <section>
      <div className="flex flex-col sm:flex-row gap-3">
        <button className="rounded-md bg-primary px-5 py-3 font-semibold text-primary-foreground">
          ✓ Confirm LOC
        </button>
        <button className="rounded-md border border-border bg-background px-5 py-3 font-medium text-foreground">
          ✎ Override
        </button>
      </div>

      <div className="mt-4 rounded-md border border-border bg-accent p-4 sm:p-5">
        <p className="font-semibold text-accent-foreground">
          Override Panel{" "}
          <span className="font-normal">(click Override to expand)</span>
        </p>
        <label className="mt-3 block text-sm text-accent-foreground">
          Override Reason * (min 20 characters)
        </label>
        <textarea
          placeholder="Enter clinical justification for overriding suggested LOC..."
          className="mt-2 w-full rounded-md border border-border bg-background p-3 text-sm placeholder:text-muted-foreground"
          rows={2}
        />
      </div>
    </section>
  );
};
