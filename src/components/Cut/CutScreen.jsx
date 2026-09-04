import { useState } from 'react';
import { motion } from 'framer-motion';
import { PLAYERS } from '../../data/players.js';
import { PlayerCutCard } from './PlayerCutCard.jsx';
import { Button } from '../shared/Button.jsx';

const REQUIRED_CUTS = 5;

export function CutScreen({ onConfirm, initialSelected = [] }) {
  const [selected, setSelected] = useState(initialSelected);
  const [hint, setHint] = useState(false);

  function toggle(id) {
    setSelected((prev) => {
      if (prev.includes(id)) {
        setHint(false);
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= REQUIRED_CUTS) {
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
      className="mx-auto max-w-5xl px-4 py-6 sm:px-6"
    >
      <div className="sticky top-0 z-10 mb-4 flex flex-col gap-2 bg-orange py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-extrabold text-navy sm:text-2xl">Cut 5 players</h1>
          <p aria-live="polite" className="text-sm font-semibold text-navy">
            {selected.length} of {REQUIRED_CUTS} selected
          </p>
        </div>
        <Button
          variant="primary"
          disabled={selected.length !== REQUIRED_CUTS}
          onClick={() => onConfirm(selected)}
        >
          Confirm Cut
        </Button>
      </div>

      {hint && (
        <p role="status" className="mb-3 text-sm font-semibold text-navy">
          You can only cut {REQUIRED_CUTS} players. Tap one to unmark it first.
        </p>
      )}

      <div
        role="group"
        aria-label="Players available to cut"
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-5 lg:grid-cols-6"
      >
        {PLAYERS.map((player) => (
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
