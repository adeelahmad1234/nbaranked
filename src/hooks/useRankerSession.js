import { useCallback, useEffect, useMemo, useState } from 'react';
import { loadSession, saveSession, clearSession } from '../lib/storage.js';
import * as session from '../lib/sortSession.js';
import * as sort from '../lib/binaryInsertionSort.js';
import { PLAYERS, PLAYERS_BY_ID } from '../data/players.js';
import { POSITIONS_BY_KEY } from '../data/positions/index.js';
import { REQUIRED_CUTS, POSITION_FINAL_SIZE, requiredCutsFor } from '../lib/sortSession.js';

// The only stateful hook in the app. Every screen component receives plain props/callbacks
// from here and stays presentational — see App.jsx.
export function useRankerSession() {
  const [state, setState] = useState(() => loadSession() ?? session.createEmptySession());
  // Player objects for whichever position pool is active. Stays null for the 'ALL' pool
  // (which uses the always-loaded PLAYERS constant instead) and while a position's data
  // chunk is still being dynamically imported.
  const [positionPlayers, setPositionPlayers] = useState(null);

  useEffect(() => {
    saveSession(state);
  }, [state]);

  // Keeps the right position dataset loaded whenever poolKey points at a position — both
  // right after picking one, and when a persisted session resumes mid-position-ranking
  // after a page reload (positionPlayers always starts null on a fresh mount).
  useEffect(() => {
    if (state.poolKey === 'ALL') {
      setPositionPlayers(null);
      return;
    }
    let cancelled = false;
    POSITIONS_BY_KEY[state.poolKey].load().then((players) => {
      if (!cancelled) setPositionPlayers(players);
    });
    return () => {
      cancelled = true;
    };
  }, [state.poolKey]);

  const activePlayers = state.poolKey === 'ALL' ? PLAYERS : positionPlayers;
  const poolReady = activePlayers != null;

  const activePlayersById = useMemo(() => {
    if (state.poolKey === 'ALL') return PLAYERS_BY_ID;
    if (!activePlayers) return {};
    return Object.fromEntries(activePlayers.map((p) => [p.id, p]));
  }, [state.poolKey, activePlayers]);

  const requiredCuts = poolReady ? requiredCutsFor(state.poolKey, activePlayers.length) : 0;

  const beginCut = useCallback(() => {
    setState((s) => session.enterCut(s, 'ALL'));
  }, []);

  // Awaits the position's data chunk before flipping the phase, so Cut never renders with
  // an empty pool — PositionSelectScreen shows its own button-level loading state while
  // this resolves (a fresh dynamic import chunk; a repeat visit resolves instantly).
  const beginPositionCut = useCallback(async (key) => {
    await POSITIONS_BY_KEY[key].load();
    setState((s) => session.enterCut(s, key));
  }, []);

  const goToPositionSelect = useCallback(() => {
    setState((s) => ({ ...s, phase: 'positionSelect' }));
  }, []);

  // Logo click, from any screen: just switches the view to landing, doesn't touch any
  // in-progress cut/comparison data — picking the same pool again resumes from the cut
  // screen with prior eliminations still marked, same as Undo-to-cut does.
  const goHome = useCallback(() => {
    setState((s) => ({ ...s, phase: 'landing' }));
  }, []);

  const confirmCut = useCallback(
    (eliminatedIds) => {
      const poolIds = activePlayers.map((p) => p.id);
      setState((s) => session.confirmCut(s, eliminatedIds, poolIds, requiredCuts));
    },
    [activePlayers, requiredCuts]
  );

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

  const activePosition = state.poolKey === 'ALL' ? null : POSITIONS_BY_KEY[state.poolKey];
  const resultsTitle = activePosition ? `Your Top 15 — ${activePosition.label}` : 'Your Top 25';
  const resultsFilename = activePosition
    ? `nbaRanker-top15-${activePosition.key.toLowerCase()}.png`
    : 'nbaRanker-top25.png';

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
        poolKey: 'ALL',
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
    poolKey: state.poolKey,
    poolReady,
    poolPlayers: activePlayers,
    playersById: activePlayersById,
    requiredCuts,
    eliminatedIds: state.eliminatedIds,
    comparisonsMade: sortState?.comparisonsMade ?? 0,
    maxComparisons:
      sortState?.maxComparisons ??
      sort.computeMaxComparisons(state.poolKey === 'ALL' ? PLAYERS.length - REQUIRED_CUTS : POSITION_FINAL_SIZE),
    currentComparison,
    finalRanking: state.finalRanking,
    resultsTitle,
    resultsFilename,
    canUndo: session.canUndo(state),
    beginCut,
    beginPositionCut,
    goToPositionSelect,
    goHome,
    confirmCut,
    answer,
    undo,
    reset,
  };
}
