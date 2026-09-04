import { PlayerImage } from '../shared/PlayerImage.jsx';
import { FlagIcon } from '../shared/FlagIcon.jsx';
import { Stat } from '../shared/Stat.jsx';

// Full literal class names (not built from a template string) so Tailwind's scanner can
// actually find them — a dynamically-interpolated class name wouldn't get generated.
const MEDAL_BORDER = [
  'border-medal-gold',
  'border-medal-silver',
  'border-medal-bronze',
  'border-medal-purple',
  'border-medal-aqua',
];

// A soft glow in the same hue as each row's border — same rgb values as the
// --color-medal-* tokens, at low alpha so it reads as a gentle ambient glow rather than
// a neon effect.
const MEDAL_GLOW = [
  'shadow-[0_0_18px_2px_rgba(201,162,39,0.45)]', // gold
  'shadow-[0_0_18px_2px_rgba(155,161,168,0.45)]', // silver
  'shadow-[0_0_18px_2px_rgba(173,106,58,0.45)]', // bronze
  'shadow-[0_0_18px_2px_rgba(109,74,168,0.45)]', // purple
  'shadow-[0_0_18px_2px_rgba(28,169,201,0.45)]', // aqua
];

// The top-5 treatment: a horizontal row per player (not a square tile), a fancier serif
// name to set it apart from the plain grid of 20, last-season per-game stats, and a
// medal-tier colored outline keyed to rank.
export function TopFiveRow({ player, rank }) {
  const borderClass = MEDAL_BORDER[rank - 1] ?? 'border-navy';
  const glowClass = MEDAL_GLOW[rank - 1] ?? '';

  return (
    <div
      className={`flex items-center gap-3 border-[6px] bg-surface p-2.5 sm:gap-4 sm:p-3 ${borderClass} ${glowClass}`}
    >
      <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28">
        <PlayerImage
          src={player.headshot}
          alt={`${player.name} headshot`}
          className="h-full w-full"
        />
        <div className="absolute -left-1.5 -top-1.5 flex h-7 w-7 items-center justify-center bg-navy text-sm font-black text-white sm:h-8 sm:w-8 sm:text-base">
          {rank}
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1.5 flex items-center gap-2">
          <FlagIcon
            country={player.country}
            countryCode={player.countryCode}
            className="h-4 w-6 shrink-0"
          />
          <p className="truncate font-display text-xl font-bold italic text-navy sm:text-2xl">
            {player.name}
          </p>
        </div>
        <div className="flex gap-4 sm:gap-6">
          <Stat value={player.pts.toFixed(1)} label="PTS" size="lg" />
          <Stat value={player.reb.toFixed(1)} label="REB" size="lg" />
          <Stat value={player.ast.toFixed(1)} label="AST" size="lg" />
        </div>
        <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-wide text-navy-soft/70 sm:text-xs">
          {player.statsSeason} season
        </p>
      </div>
    </div>
  );
}
