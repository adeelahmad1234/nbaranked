import { forwardRef } from 'react';
import { PlayerImage } from '../shared/PlayerImage.jsx';
import { FlagIcon } from '../shared/FlagIcon.jsx';
import { Stat } from '../shared/Stat.jsx';

export const ComparisonCard = forwardRef(function ComparisonCard(
  { player, otherName, onChoose },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      onClick={onChoose}
      aria-label={`Choose ${player.name} over ${otherName}`}
      className="flex flex-1 flex-col border border-border bg-surface text-left outline-none focus-visible:ring-4 focus-visible:ring-navy"
    >
      <PlayerImage
        src={player.headshot}
        alt={`${player.name} headshot`}
        className="aspect-square w-full"
      />
      <div className="flex items-center gap-2 border-t border-border px-3 py-2.5">
        <FlagIcon
          country={player.country}
          countryCode={player.countryCode}
          className="h-4 w-6 shrink-0"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-navy sm:text-base">{player.name}</p>
          <p className="truncate text-xs text-navy-soft">{player.team}</p>
        </div>
      </div>
      <div className="flex items-center gap-4 border-t border-border px-3 py-2.5 sm:gap-6">
        <Stat value={player.pts.toFixed(1)} label="PTS" />
        <Stat value={player.reb.toFixed(1)} label="REB" />
        <Stat value={player.ast.toFixed(1)} label="AST" />
        <p className="ml-auto shrink-0 whitespace-nowrap text-[9px] font-semibold uppercase tracking-wide text-navy-soft/70 sm:text-[10px]">
          {player.statsSeason} season
        </p>
      </div>
    </button>
  );
});
