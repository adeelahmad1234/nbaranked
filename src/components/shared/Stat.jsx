// Shared PTS/REB/AST value+label pair — used in the head-to-head compare cards and the
// top-5 results rows, so both agree on one visual language for stats.
export function Stat({ value, label, size = 'md' }) {
  const valueClass = size === 'lg' ? 'text-lg sm:text-xl' : 'text-base sm:text-lg';
  const labelClass = size === 'lg' ? 'text-[10px] sm:text-xs' : 'text-[9px] sm:text-[10px]';
  return (
    <div className="text-center">
      <p className={`font-extrabold text-navy ${valueClass}`}>{value}</p>
      <p className={`font-bold uppercase tracking-wide text-navy-soft ${labelClass}`}>
        {label}
      </p>
    </div>
  );
}
