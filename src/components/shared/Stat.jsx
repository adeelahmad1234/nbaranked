// A player with no completed NBA season yet (a very recent draftee) has pts/reb/ast set
// to null — render a dash instead of a stat rather than mixing in college numbers.
export function formatStat(value) {
  return value == null ? '—' : value.toFixed(1);
}

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
