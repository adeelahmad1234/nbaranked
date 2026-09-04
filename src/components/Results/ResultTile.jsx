import { PlayerImage } from '../shared/PlayerImage.jsx';
import { FlagIcon } from '../shared/FlagIcon.jsx';

// Name always renders on a solid navy strip, never directly over the photo, so text
// contrast never depends on a given player's photo colors.
export function ResultTile({ player, rank, size = 'sm' }) {
  const rankTextSize = size === 'lg' ? 'text-lg sm:text-xl' : 'text-[10px] sm:text-xs';
  const nameTextSize = size === 'lg' ? 'text-sm sm:text-base' : 'text-[10px] sm:text-xs';
  const flagSize = size === 'lg' ? 'h-5 w-7' : 'h-3.5 w-5';

  return (
    <div className="relative aspect-square overflow-hidden border border-border bg-surface">
      <div className="absolute inset-0">
        <PlayerImage
          src={player.headshot}
          alt={`${player.name} headshot`}
          className="h-full w-full"
        />
      </div>
      <div
        className={`absolute left-1 top-1 bg-navy px-1.5 py-0.5 font-black text-white ${rankTextSize}`}
      >
        {rank}
      </div>
      <div className={`absolute right-1 top-1 border border-white/80 ${flagSize}`}>
        <FlagIcon country={player.country} countryCode={player.countryCode} className="h-full w-full" />
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-navy/90 px-1.5 py-1">
        <p className={`truncate font-bold text-white ${nameTextSize}`}>{player.name}</p>
      </div>
    </div>
  );
}
