import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayerCutCard } from './PlayerCutCard.jsx';
import { Button } from '../shared/Button.jsx';

function shuffled(items) {
  const a = items.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Pool-agnostic: `players` and `requiredCuts` come from whichever pool is active (the
// main 50, cutting 25, or a 25-player position pool, cutting 10) — see useRankerSession.
// `isPosition` only changes the grid's column count (a fixed 5x5 for a 25-player position
// pool, vs the main pool's wider responsive ramp for 50).
export function CutScreen({ players, requiredCuts, isPosition = false, onConfirm, initialSelected = [] }) {
  // Shuffled once per visit to this screen (not on every re-render, so the grid doesn't
  // reorder under the user's finger while they're selecting) to keep display order from
  // biasing which players get noticed and cut.
  const [displayOrder] = useState(() => shuffled(players));
  const [selected, setSelected] = useState(initialSelected);
  const [hint, setHint] = useState(false);

  function toggle(id) {
    setSelected((prev) => {
      if (prev.includes(id)) {
        setHint(false);
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= requiredCuts) {
        setHint(true);
        return prev;
      }
      setHint(false);
      return [...prev, id];
    });
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="mx-auto max-w-[90rem] px-4 py-6 sm:px-6"
    >
      <div className="sticky top-0 z-10 mb-4 flex flex-col gap-2 bg-orange py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-navy sm:text-2xl">
            Cut {requiredCuts} players
          </h1>
          <p aria-live="polite" className="text-sm font-semibold text-navy">
            {selected.length} of {requiredCuts} selected
          </p>
        </div>
        <Button
          variant="primary"
          disabled={selected.length !== requiredCuts}
          onClick={() => onConfirm(selected)}
        >
          Confirm Cut
        </Button>
      </div>

      {hint && (
        <p role="status" className="mb-3 text-sm font-semibold text-navy">
          You can only cut {requiredCuts} players. Tap one to unmark it first.
        </p>
      )}

      <div
        role="group"
        aria-label="Players available to cut"
        className={
          isPosition
            ? 'grid grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4'
            : 'grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10'
        }
      >
        {displayOrder.map((player) => (
          <PlayerCutCard
            key={player.id}
            player={player}
            selected={selected.includes(player.id)}
            onToggle={() => toggle(player.id)}
          />
        ))}
      </div>
    </motion.section>
  );
}
