import { AnimatePresence } from 'framer-motion';
import { useRankerSession } from './hooks/useRankerSession.js';
import { Header } from './components/shared/Header.jsx';
import { LandingScreen } from './components/Landing/LandingScreen.jsx';
import { CutScreen } from './components/Cut/CutScreen.jsx';
import { CompareScreen } from './components/Compare/CompareScreen.jsx';
import { ResultsScreen } from './components/Results/ResultsScreen.jsx';

export default function App() {
  const ranker = useRankerSession();

  return (
    <div className="min-h-screen bg-orange">
      <Header />
      <AnimatePresence mode="wait">
        {ranker.phase === 'landing' && (
          <LandingScreen key="landing" onStart={ranker.beginCut} />
        )}
        {ranker.phase === 'cut' && (
          <CutScreen
            key="cut"
            onConfirm={ranker.confirmCut}
            initialSelected={ranker.eliminatedIds}
          />
        )}
        {ranker.phase === 'compare' && (
          <CompareScreen
            key="compare"
            comparison={ranker.currentComparison}
            comparisonsMade={ranker.comparisonsMade}
            maxComparisons={ranker.maxComparisons}
            onAnswer={ranker.answer}
            onUndo={ranker.undo}
          />
        )}
        {ranker.phase === 'results' && (
          <ResultsScreen
            key="results"
            rankingIds={ranker.finalRanking}
            onReset={ranker.reset}
            onUndo={ranker.undo}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
