import { PlayerImage } from '../shared/PlayerImage.jsx';
import { FlagIcon } from '../shared/FlagIcon.jsx';

export function PlayerCutCard({ player, selected, onToggle }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={`${player.name}, ${player.team}. ${
        selected ? 'Tap to unmark' : 'Tap to mark for elimination'
      }`}
      onClick={onToggle}
      className="relative aspect-square overflow-hidden border border-border bg-surface text-left"
    >
      <div className="absolute inset-0">
        <PlayerImage
          src={player.headshot}
          alt={`${player.name} headshot`}
          className="h-full w-full"
        />
      </div>
      <div className="absolute left-1.5 top-1.5 h-5 w-7 border border-white/80">
        <FlagIcon
          country={player.country}
          countryCode={player.countryCode}
          className="h-full w-full"
        />
      </div>
      {selected && (
        <div className="absolute inset-0 flex items-center justify-center bg-navy/75" aria-hidden="true">
          <span className="text-4xl font-black text-white">&times;</span>
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 bg-navy/90 px-1.5 py-1">
        <p className="truncate text-[11px] font-bold text-white sm:text-xs">{player.name}</p>
      </div>
    </button>
  );
}
