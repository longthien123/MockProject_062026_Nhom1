import { ConfirmationLog } from "./confirmation-dialog";
import { DailyRatePreview } from "./daily-rate-preview";
import { EhrHeader } from "./ehr-header";
import { LOCLevelReference } from "./loc-level-reference";
import { LOCScoreCard } from "./loc-score-card";
import { OverridePanel } from "./override-panel";
import { SuggestedLOCCard } from "./suggested-loc-card";

export const LOCClassificationResult = () => {
  return (
    <div className="min-h-screen bg-background">
      <EhrHeader />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-6 space-y-6">
        <div>
          <p className="text-sm text-muted-foreground">
            New Admission Flow › LOC Classification
          </p>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-foreground">
            LOC Classification Result
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <LOCScoreCard />
          <SuggestedLOCCard />
        </div>

        <LOCLevelReference />
        <DailyRatePreview />
        <OverridePanel />
        <ConfirmationLog />
      </main>
    </div>
  );
};
