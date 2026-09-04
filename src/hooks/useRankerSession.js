import { useCallback, useEffect, useMemo, useState } from 'react';
import { loadSession, saveSession, clearSession } from '../lib/storage.js';
import * as session from '../lib/sortSession.js';
import * as sort from '../lib/binaryInsertionSort.js';
import { PLAYERS } from '../data/players.js';
import { REQUIRED_CUTS } from '../lib/sortSession.js';

// The only stateful hook in the app. Every screen component receives plain props/callbacks
// from here and stays presentational — see App.jsx.
export function useRankerSession() {
  const [state, setState] = useState(() => loadSession() ?? session.createEmptySession());

  useEffect(() => {
    saveSession(state);
  }, [state]);

  const beginCut = useCallback(() => {
    setState((s) => ({ ...s, phase: 'cut' }));
  }, []);

  const confirmCut = useCallback((eliminatedIds) => {
    setState((s) => session.confirmCut(s, eliminatedIds));
  }, []);

  const answer = useCallback((winnerId) => {
    setState((s) => session.recordAnswer(s, winnerId));
  }, []);

  const undo = useCallback(() => {
    setState((s) => session.undo(s));
  }, []);

  const reset = useCallback(() => {
    clearSession();
    setState(session.createEmptySession());
  }, []);

  const sortState = useMemo(() => session.deriveSortState(state), [state]);

  const currentComparison = useMemo(() => {
    if (!sortState) return null;
    return sort.getCurrentComparison(sortState);
  }, [sortState]);

  // DEV-only escape hatch so Results can be reviewed/tested without a real ~90-comparison
  // playthrough: window.__nbaRankerDebug.seedResults(), or ?debug=results on load.
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const seedResults = (rankingIds) => {
      const headToHeadCount = PLAYERS.length - REQUIRED_CUTS;
      const ranking = rankingIds ?? PLAYERS.slice(0, headToHeadCount).map((p) => p.id);
      setState({
        version: 1,
        phase: 'results',
        eliminatedIds: PLAYERS.slice(headToHeadCount).map((p) => p.id),
        insertionOrder: ranking,
        comparisonLog: [],
        finalRanking: ranking,
      });
    };
    window.__nbaRankerDebug = { seedResults };
    const params = new URLSearchParams(window.location.search);
    if (params.get('debug') === 'results') seedResults();
  }, []);

  return {
    phase: state.phase,
    eliminatedIds: state.eliminatedIds,
    comparisonsMade: sortState?.comparisonsMade ?? 0,
    maxComparisons:
      sortState?.maxComparisons ?? sort.computeMaxComparisons(PLAYERS.length - REQUIRED_CUTS),
    currentComparison,
    finalRanking: state.finalRanking,
    canUndo: session.canUndo(state),
    beginCut,
    confirmCut,
    answer,
    undo,
    reset,
  };
}
