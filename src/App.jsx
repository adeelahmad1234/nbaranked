import { AnimatePresence } from 'framer-motion';
import { useRankerSession } from './hooks/useRankerSession.js';
import { Header } from './components/shared/Header.jsx';
import { LandingScreen } from './components/Landing/LandingScreen.jsx';
import { PositionSelectScreen } from './components/Landing/PositionSelectScreen.jsx';
import { CutScreen } from './components/Cut/CutScreen.jsx';
import { CompareScreen } from './components/Compare/CompareScreen.jsx';
import { ResultsScreen } from './components/Results/ResultsScreen.jsx';

export default function App() {
  const ranker = useRankerSession();
  const needsPool = ranker.phase === 'cut' || ranker.phase === 'compare' || ranker.phase === 'results';

  return (
    <div className="min-h-screen bg-orange">
      <Header onLogoClick={ranker.goHome} onReset={ranker.reset} />
      <AnimatePresence mode="wait">
        {ranker.phase === 'landing' && (
          <LandingScreen
            key="landing"
            onStartCurrent={ranker.beginCut}
            onStartPosition={ranker.goToPositionSelect}
          />
        )}
        {ranker.phase === 'positionSelect' && (
          <PositionSelectScreen key="positionSelect" onSelect={ranker.beginPositionCut} />
        )}
        {needsPool && !ranker.poolReady && (
          // Only reachable on a page reload that resumed mid-position-ranking, while that
          // position's data chunk is being re-fetched — resolves in a moment.
          <section
            key="loading"
            className="mx-auto flex min-h-[calc(100vh-64px)] max-w-2xl flex-col items-center justify-center px-4 text-center"
          >
            <p className="text-lg font-bold text-navy">Loading…</p>
          </section>
        )}
        {ranker.phase === 'cut' && ranker.poolReady && (
          <CutScreen
            key="cut"
            players={ranker.poolPlayers}
            requiredCuts={ranker.requiredCuts}
            isPosition={ranker.poolKey !== 'ALL'}
            onConfirm={ranker.confirmCut}
            initialSelected={ranker.eliminatedIds}
          />
        )}
        {ranker.phase === 'compare' && ranker.poolReady && (
          <CompareScreen
            key="compare"
            comparison={ranker.currentComparison}
            comparisonsMade={ranker.comparisonsMade}
            maxComparisons={ranker.maxComparisons}
            playersById={ranker.playersById}
            onAnswer={ranker.answer}
            onUndo={ranker.undo}
          />
        )}
        {ranker.phase === 'results' && ranker.poolReady && (
          <ResultsScreen
            key="results"
            rankingIds={ranker.finalRanking}
            playersById={ranker.playersById}
            title={ranker.resultsTitle}
            filename={ranker.resultsFilename}
            isPosition={ranker.poolKey !== 'ALL'}
            onReset={ranker.reset}
            onUndo={ranker.undo}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
