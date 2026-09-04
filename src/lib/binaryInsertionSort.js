// Pure binary-insertion-sort ranking engine. No DOM/React dependencies, so it can be
// unit-tested standalone (see scripts/verifySort.mjs) and driven one comparison at a time
// from the UI, pausing between each for a human answer.
//
// Comparison count is NOT a fixed number — it's bounded above by computeMaxComparisons(n)
// (the classic n*ceil(log2 n) - 2^ceil(log2 n) + 1 worst case), but a real session can
// finish with fewer comparisons whenever a binary search's midpoint narrows to a single
// candidate early. Treat the bound as a progress-bar denominator, not a guarantee.

export function computeMaxComparisons(n) {
  let total = 0;
  for (let k = 2; k <= n; k++) total += Math.ceil(Math.log2(k));
  return total;
}

export function createSortState(itemIds) {
  const [first, ...rest] = itemIds;
  const sorted = first !== undefined ? [first] : [];
  return {
    sorted, // ids, index 0 = best (rank 1) ... last = worst
    pending: rest, // ids not yet inserted, in the given insertion order
    current: rest.length > 0 ? { itemId: rest[0], lo: 0, hi: sorted.length } : null,
    comparisonsMade: 0,
    maxComparisons: computeMaxComparisons(itemIds.length),
  };
}

// Next pair to ask about: a = candidate being inserted, b = the sorted item it's weighed
// against. Returns null once nothing remains to compare (sort complete).
export function getCurrentComparison(state) {
  if (!state.current) return null;
  const { itemId, lo, hi } = state.current;
  if (lo >= hi) return null;
  const mid = Math.floor((lo + hi) / 2);
  return { a: itemId, b: state.sorted[mid], mid };
}

export function isComplete(state) {
  return state.pending.length === 0 && state.current === null;
}

// Pure: given the user's pick, returns a NEW state (never mutates the input).
export function answerComparison(state, winnerId) {
  const cmp = getCurrentComparison(state);
  if (!cmp) throw new Error('No active comparison to answer');
  if (winnerId !== cmp.a && winnerId !== cmp.b) {
    throw new Error('winnerId must be one of the two players just compared');
  }

  let { itemId, lo, hi } = state.current;
  if (winnerId === itemId) {
    hi = cmp.mid; // candidate beat sorted[mid] -> candidate ranks better, narrow left
  } else {
    lo = cmp.mid + 1; // candidate lost -> ranks worse, narrow right
  }

  const comparisonsMade = state.comparisonsMade + 1;

  if (lo < hi) {
    return { ...state, current: { itemId, lo, hi }, comparisonsMade };
  }

  // Insertion point found (lo === hi): splice the candidate into the sorted list.
  const sorted = [...state.sorted.slice(0, lo), itemId, ...state.sorted.slice(lo)];
  const pending = state.pending.slice(1);
  const nextItem = pending[0];
  const current =
    nextItem !== undefined ? { itemId: nextItem, lo: 0, hi: sorted.length } : null;

  return { ...state, sorted, pending, current, comparisonsMade };
}

// Deterministic replay from scratch — the resumption mechanism after a page reload.
// itemIds must be the exact original insertion order used when the session started.
export function replay(itemIds, comparisonLog) {
  let state = createSortState(itemIds);
  for (const { winner } of comparisonLog) {
    if (isComplete(state)) break;
    state = answerComparison(state, winner);
  }
  return state;
}

export function getFinalRanking(state) {
  return isComplete(state) ? state.sorted : null; // index 0 = rank 1 ... index n-1 = rank n
}
