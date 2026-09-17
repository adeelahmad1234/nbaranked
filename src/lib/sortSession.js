// Bridges the pure sort algorithm to the persisted session shape. No DOM access here —
// storage.js and useRankerSession.js own that. Pool-agnostic: every function here takes
// whatever player-id pool is active (the main 50, or one position's pool) as data, so the
// same session logic drives both "Current Player Rankings" and "Position Ranking".
import * as sort from './binaryInsertionSort.js';

// Single source of truth for how many of the main 50-player pool get cut in the first
// round — CutScreen.jsx/LandingScreen.jsx import this too, so nothing drifts apart.
export const REQUIRED_CUTS = 25;

// Every position pool (25 players) ranks down to a top 15, regardless of exactly how
// many players are in that position's list — see requiredCutsFor.
export const POSITION_FINAL_SIZE = 15;

export function requiredCutsFor(poolKey, poolSize) {
  return poolKey === 'ALL' ? REQUIRED_CUTS : poolSize - POSITION_FINAL_SIZE;
}

export function createEmptySession() {
  return {
    version: 1,
    phase: 'landing', // 'landing' | 'positionSelect' | 'cut' | 'compare' | 'results'
    poolKey: 'ALL', // 'ALL' or a position key ('PG' | 'SG' | 'SF' | 'PF' | 'C')
    eliminatedIds: [],
    insertionOrder: [],
    comparisonLog: [],
    finalRanking: null,
  };
}

// Moves to the Cut screen for the given pool. Re-entering the SAME pool (e.g. clicking
// the logo home, then picking the same position again) resumes prior progress, exactly
// like re-clicking "Current Player Rankings" already did — switching to a DIFFERENT pool
// starts that pool completely fresh, since a different pool's eliminated/insertion ids
// don't mean anything for the new one.
export function enterCut(session, poolKey) {
  if (session.poolKey === poolKey) {
    return { ...session, phase: 'cut' };
  }
  return { ...createEmptySession(), poolKey, phase: 'cut' };
}

function shuffledIds(ids) {
  const a = ids.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function confirmCut(session, eliminatedIds, poolIds, requiredCuts) {
  if (eliminatedIds.length !== requiredCuts) {
    throw new Error(`Must eliminate exactly ${requiredCuts} players before confirming`);
  }
  const remaining = poolIds.filter((id) => !eliminatedIds.includes(id));
  return {
    ...session,
    phase: 'compare',
    eliminatedIds,
    insertionOrder: shuffledIds(remaining),
    comparisonLog: [],
    finalRanking: null,
  };
}

// Live algorithm state, reconstructed by replaying the persisted answer log.
// Only meaningful during the 'compare' phase.
export function deriveSortState(session) {
  if (session.phase !== 'compare' || session.insertionOrder.length === 0) return null;
  return sort.replay(session.insertionOrder, session.comparisonLog);
}

// A stale/duplicate click can reach here — e.g. a fast double-click on a comparison
// card lands its second event during the 0.2s exit animation, after state has already
// advanced past that pair. Rather than throw (which crashed to a blank screen with no
// error boundary), treat anything that no longer matches the live comparison as a
// harmless no-op: the UI already reflects the first, valid click.
export function recordAnswer(session, winnerId) {
  const state = deriveSortState(session);
  if (!state) return session;
  const cmp = sort.getCurrentComparison(state);
  if (!cmp || (winnerId !== cmp.a && winnerId !== cmp.b)) return session;

  const nextLog = [...session.comparisonLog, { a: cmp.a, b: cmp.b, winner: winnerId }];
  const nextState = sort.replay(session.insertionOrder, nextLog);
  const complete = sort.isComplete(nextState);

  return {
    ...session,
    comparisonLog: nextLog,
    phase: complete ? 'results' : 'compare',
    finalRanking: complete ? sort.getFinalRanking(nextState) : null,
  };
}

// True whenever there's somewhere to undo back to: another comparison, or (once at the
// first comparison) back to the cut screen.
export function canUndo(session) {
  return session.phase === 'compare' || session.phase === 'results';
}

// Steps back one decision at a time: results -> last comparison re-opened -> ... ->
// first comparison -> cut screen (with the previous eliminations pre-selected, so the
// user can adjust rather than starting over). This is the full "undo until the
// beginning" chain.
export function undo(session) {
  if (session.phase === 'results') {
    return {
      ...session,
      phase: 'compare',
      comparisonLog: session.comparisonLog.slice(0, -1),
      finalRanking: null,
    };
  }
  if (session.phase === 'compare') {
    if (session.comparisonLog.length > 0) {
      return { ...session, comparisonLog: session.comparisonLog.slice(0, -1) };
    }
    return {
      ...session,
      phase: 'cut',
      insertionOrder: [],
      comparisonLog: [],
      finalRanking: null,
    };
  }
  return session;
}
