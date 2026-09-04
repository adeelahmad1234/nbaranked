// Bridges the pure sort algorithm to the persisted session shape. No DOM access here —
// storage.js and useRankerSession.js own that.
import { PLAYERS } from '../data/players.js';
import * as sort from './binaryInsertionSort.js';

export function createEmptySession() {
  return {
    version: 1,
    phase: 'landing', // 'landing' | 'cut' | 'compare' | 'results'
    eliminatedIds: [],
    insertionOrder: [],
    comparisonLog: [],
    finalRanking: null,
  };
}

function shuffledIds(ids) {
  const a = ids.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function confirmCut(session, eliminatedIds) {
  if (eliminatedIds.length !== 5) {
    throw new Error('Must eliminate exactly 5 players before confirming');
  }
  const remaining = PLAYERS.map((p) => p.id).filter((id) => !eliminatedIds.includes(id));
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

export function recordAnswer(session, winnerId) {
  const state = deriveSortState(session);
  if (!state) throw new Error('No active comparison to record an answer for');
  const cmp = sort.getCurrentComparison(state);
  if (!cmp) throw new Error('Sort is already complete');

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
// first comparison -> cut screen (with the previous 5 eliminations pre-selected, so the
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
