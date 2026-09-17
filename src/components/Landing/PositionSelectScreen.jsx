import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../shared/Button.jsx';
import { POSITIONS } from '../../data/positions/index.js';

// Same layout and button style as LandingScreen, on purpose — this screen is one more
// step in the same flow, not a different section of the site.
export function PositionSelectScreen({ onSelect }) {
  const [loadingKey, setLoadingKey] = useState(null);

  async function handleSelect(key) {
    setLoadingKey(key);
    await onSelect(key);
    setLoadingKey(null);
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="mx-auto flex min-h-[calc(100vh-64px)] max-w-2xl flex-col items-center justify-center gap-8 px-4 py-16 text-center"
    >
      <h1 className="max-w-lg text-2xl font-extrabold text-navy sm:text-3xl">
        Choose a position to rank
      </h1>
      <p className="max-w-md text-lg text-navy sm:text-xl">
        Cut each position&apos;s pool down, then settle every remaining matchup head to
        head to crown your top 15.
      </p>
      <div className="flex w-full max-w-sm flex-col gap-4">
        {POSITIONS.map((position) => (
          <Button
            key={position.key}
            size="lg"
            disabled={loadingKey !== null}
            onClick={() => handleSelect(position.key)}
          >
            {loadingKey === position.key ? 'Loading…' : position.label}
          </Button>
        ))}
      </div>
    </motion.section>
  );
}
