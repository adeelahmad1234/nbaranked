import { useRef } from 'react';
import { motion } from 'framer-motion';
import { TopFiveRow } from './TopFiveRow.jsx';
import { ResultTile } from './ResultTile.jsx';
import { DownloadButton } from './DownloadButton.jsx';
import { Button } from '../shared/Button.jsx';
import { Wordmark } from '../shared/Wordmark.jsx';

// Pool-agnostic: works identically for the main pool's top 25 (top 5 rows + a 4-column,
// 20-tile grid) and a position pool's top 15 (top 5 rows + a 2-column, 10-tile grid,
// `isPosition`) — the top-5 column itself never changes between the two.
export function ResultsScreen({ rankingIds, playersById, title, filename, isPosition = false, onReset, onUndo }) {
  const captureRef = useRef(null);
  if (!rankingIds) return null;

  const players = rankingIds.map((id) => playersById[id]);
  const top5 = players.slice(0, 5);
  const rest = players.slice(5);
  const restTiles = rest.map((player, i) => (
    <ResultTile key={player.id} player={player} rank={i + 6} size="sm" />
  ));

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="mx-auto max-w-7xl px-4 py-6 sm:px-6"
    >
      {/* The downloadable scorecard: one bordered rectangle, wordmark top-left, nothing
          from outside this div (Undo/Download/Start Over) ever appears in the export.
          Position mode shrinks the whole card to hug its (narrower) content from `lg` up —
          see the column-width note below for why. */}
      <div
        ref={captureRef}
        className={
          isPosition
            ? 'border-[3px] border-navy bg-orange p-4 sm:p-6 lg:mx-auto lg:w-fit'
            : 'border-[3px] border-navy bg-orange p-4 sm:p-6'
        }
      >
        <div
          className={
            isPosition
              ? 'mb-6 flex flex-col items-start gap-2'
              : 'mb-6 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4'
          }
        >
          <Wordmark
            className="h-8 w-auto sm:h-11"
            fill="var(--color-navy)"
            stroke="none"
            strokeWidth={0}
            align="start"
          />
          <h1 className="text-2xl font-extrabold text-navy sm:text-3xl">{title}</h1>
        </div>

        {/* Top 5 take roughly half the card, as rows rather than square tiles — face,
            a fancier serif name, last-season PTS/REB/AST, and a medal-tier outline.
            Position mode uses explicit column widths (not 1fr/1fr) so the card can shrink
            to fit them via `w-fit` above, instead of two tracks stretching to fill
            whatever width the card happens to have — that's what removes the dead gap
            between the columns and lets `lg:gap-8` be the only space between them, same
            as the main pool's column gap. */}
        <div
          className={
            isPosition
              ? 'grid grid-cols-1 gap-6 lg:w-fit lg:grid-cols-[24rem_17.5rem] lg:gap-8'
              : 'grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8'
          }
        >
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
              6 to {players.length}
            </p>
            {isPosition ? (
              // Sized+positioned on this wrapper, not the grid itself — a max-width grid
              // container combined with a non-stretch alignment collapses its implicit 1fr
              // tracks (no definite available width to distribute), so the grid inside gets
              // a plain 100%-width box to size against instead.
              <div className="ml-auto w-[13rem] sm:w-[17.5rem]">
                <div className="grid grid-cols-2 gap-2 sm:gap-3">{restTiles}</div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">{restTiles}</div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
        <Button variant="secondary" onClick={onUndo}>
          Undo
        </Button>
        <DownloadButton captureRef={captureRef} filename={filename} />
        <Button variant="secondary" onClick={onReset}>
          Start Over
        </Button>
      </div>
    </motion.section>
  );
}
