const LEVELS = [
  { level: "Level 1", range: "0–6 · Independent", color: "bg-chart-2" },
  { level: "Level 2", range: "7–11 · Limited", color: "bg-chart-3" },
  { level: "Level 3", range: "12–15 · Extensive", color: "bg-chart-4" },
  { level: "Level 4", range: "16–24 · Total", color: "bg-destructive" },
];

export const LOCLevelReference = () => {
  return (
    <section>
      <h2 className="text-xs font-semibold text-muted-foreground">
        LOC LEVEL REFERENCE
      </h2>
      <div className="mt-3 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {LEVELS.map((item) => (
          <div
            key={item.level}
            className={`rounded-md p-4 text-primary-foreground ${item.color}`}
          >
            <p className="font-semibold">{item.level}</p>
            <p className="text-sm opacity-80">{item.range}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
