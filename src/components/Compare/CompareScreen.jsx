import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { PLAYERS_BY_ID } from '../../data/players.js';
import { ComparisonCard } from './ComparisonCard.jsx';
import { ProgressBar } from './ProgressBar.jsx';
import { Button } from '../shared/Button.jsx';

export function CompareScreen({
  comparison,
  comparisonsMade,
  maxComparisons,
  onAnswer,
  onUndo,
}) {
  const cardARef = useRef(null);
  const cardBRef = useRef(null);
  const pairKey = comparison ? `${comparison.a}-${comparison.b}` : null;

  useEffect(() => {
    cardARef.current?.focus();
  }, [pairKey]);

  if (!comparison) return null;

  const playerA = PLAYERS_BY_ID[comparison.a];
  const playerB = PLAYERS_BY_ID[comparison.b];

  function handleKeyDown(event) {
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      cardBRef.current?.focus();
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      cardARef.current?.focus();
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="mx-auto flex min-h-[calc(100vh-64px)] max-w-4xl flex-col px-4 py-6 sm:px-6"
    >
      <div className="flex items-start justify-between gap-4">
        <ProgressBar comparisonsMade={comparisonsMade} maxComparisons={maxComparisons} />
        <Button
          variant="secondary"
          onClick={onUndo}
          className="mt-0.5 shrink-0 px-4 py-2 text-xs"
        >
          Undo
        </Button>
      </div>

      <p aria-live="polite" className="sr-only">
        Comparison {comparisonsMade + 1}: {playerA.name} versus {playerB.name}
      </p>

      <div className="flex flex-1 flex-col items-stretch justify-center">
        <h1 className="mb-4 text-center text-lg font-extrabold text-navy sm:text-xl">
          Who ranks higher?
        </h1>
        <motion.div
          key={pairKey}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          onKeyDown={handleKeyDown}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <ComparisonCard
            ref={cardARef}
            player={playerA}
            otherName={playerB.name}
            onChoose={() => onAnswer(playerA.id)}
          />
          <ComparisonCard
            ref={cardBRef}
            player={playerB}
            otherName={playerA.name}
            onChoose={() => onAnswer(playerB.id)}
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
