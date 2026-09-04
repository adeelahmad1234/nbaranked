export function ProgressBar({ comparisonsMade, maxComparisons }) {
  const pct = Math.min(100, Math.round((comparisonsMade / maxComparisons) * 100));
  return (
    <div className="mb-6 flex-1">
      <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-navy">
        Comparison {comparisonsMade + 1} of up to {maxComparisons}
      </p>
      <div className="h-2 w-full bg-navy/15">
        <div
          className="h-full bg-navy transition-[width] duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
