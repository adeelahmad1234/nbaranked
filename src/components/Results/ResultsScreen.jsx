import { useRef } from 'react';
import { motion } from 'framer-motion';
import { PLAYERS_BY_ID } from '../../data/players.js';
import { TopFiveRow } from './TopFiveRow.jsx';
import { ResultTile } from './ResultTile.jsx';
import { DownloadButton } from './DownloadButton.jsx';
import { Button } from '../shared/Button.jsx';
import { Wordmark } from '../shared/Wordmark.jsx';

export function ResultsScreen({ rankingIds, onReset, onUndo }) {
  const captureRef = useRef(null);
  if (!rankingIds) return null;

  const players = rankingIds.map((id) => PLAYERS_BY_ID[id]);
  const top5 = players.slice(0, 5);
  const rest20 = players.slice(5);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="mx-auto max-w-7xl px-4 py-6 sm:px-6"
    >
      {/* The downloadable scorecard: one bordered rectangle, wordmark top-left, nothing
          from outside this div (Undo/Download/Start Over) ever appears in the export. */}
      <div ref={captureRef} className="border-[3px] border-navy bg-orange p-4 sm:p-6">
        <div className="mb-6 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <Wordmark
            className="h-8 w-auto sm:h-11"
            fill="var(--color-navy)"
            stroke="none"
            strokeWidth={0}
            align="start"
          />
          <h1 className="text-2xl font-extrabold text-navy sm:text-3xl">Your Top 25</h1>
        </div>

        {/* Top 5 take roughly half the card, as rows rather than square tiles — face,
            a fancier serif name, last-season PTS/REB/AST, and a medal-tier outline. */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col gap-2.5 sm:gap-3">
            <p className="text-xs font-bold uppercase tracking-wide text-navy">Top 5</p>
            {top5.map((player, i) => (
              <TopFiveRow key={player.id} player={player} rank={i + 1} />
            ))}
          </div>

          {/* Centered vertically within the (taller) top-5 column's height, so the grid
              sits in the middle rather than pinned to the top with dead space below. */}
          <div className="flex h-full flex-col justify-center">
            <p className="mb-2.5 text-xs font-bold uppercase tracking-wide text-navy sm:mb-3">
              6 to 25
            </p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
              {rest20.map((player, i) => (
                <ResultTile key={player.id} player={player} rank={i + 6} size="sm" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
        <Button variant="secondary" onClick={onUndo}>
          Undo
        </Button>
        <DownloadButton captureRef={captureRef} />
        <Button variant="secondary" onClick={onReset}>
          Start Over
        </Button>
      </div>
    </motion.section>
  );
}
