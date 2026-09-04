// Standalone correctness check for src/lib/binaryInsertionSort.js. Plain Node, no test
// framework dependency — run with `npm run verify:sort`. Exits non-zero on failure.
import assert from 'node:assert/strict';
import {
  createSortState,
  getCurrentComparison,
  answerComparison,
  isComplete,
  getFinalRanking,
  computeMaxComparisons,
  replay,
} from '../src/lib/binaryInsertionSort.js';

function shuffled(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Drives the algorithm to completion using a "judge" comparator over trueOrder
// (trueOrder[0] = best). Returns { state, comparisonLog }.
function runToCompletion(itemIds, trueRank) {
  let state = createSortState(itemIds);
  const comparisonLog = [];
  while (!isComplete(state)) {
    const cmp = getCurrentComparison(state);
    const winner = trueRank[cmp.a] < trueRank[cmp.b] ? cmp.a : cmp.b;
    comparisonLog.push({ a: cmp.a, b: cmp.b, winner });
    state = answerComparison(state, winner);
  }
  return { state, comparisonLog };
}

const N = 25;
const MAX = computeMaxComparisons(N);
assert.equal(MAX, 94, `expected worst-case bound of 94 for n=25, got ${MAX}`);

// --- Correctness across many random true-orderings x random insertion orders ---
const TRIALS = 2000;
const counts = [];
for (let t = 0; t < TRIALS; t++) {
  const trueOrder = shuffled([...Array(N).keys()].map(String));
  const trueRank = Object.fromEntries(trueOrder.map((id, i) => [id, i]));
  const insertionOrder = shuffled(trueOrder);

  const { state, comparisonLog } = runToCompletion(insertionOrder, trueRank);
  const finalRanking = getFinalRanking(state);

  assert.deepEqual(
    finalRanking,
    trueOrder,
    `trial ${t}: final ranking did not match true order`
  );
  assert.ok(
    state.comparisonsMade <= MAX,
    `trial ${t}: used ${state.comparisonsMade} comparisons, exceeds bound ${MAX}`
  );
  counts.push(state.comparisonsMade);

  // --- Replay determinism at every prefix length (the real mid-session-refresh case) ---
  for (let k = 0; k <= comparisonLog.length; k += Math.max(1, Math.floor(comparisonLog.length / 5))) {
    const prefix = comparisonLog.slice(0, k);
    const replayed = replay(insertionOrder, prefix);
    let live = createSortState(insertionOrder);
    for (const { winner } of prefix) live = answerComparison(live, winner);
    assert.deepEqual(replayed, live, `trial ${t}: replay mismatch at prefix length ${k}`);
  }
}

const min = Math.min(...counts);
const max = Math.max(...counts);
console.log(`Correctness: ${TRIALS} trials, all final rankings matched true order.`);
console.log(`Comparisons observed: min=${min}, max=${max}, bound=${MAX}`);
assert.ok(max <= MAX, 'observed max exceeds theoretical bound');
assert.ok(min < MAX, 'expected some trials to finish under the worst-case bound');

// --- Tight bound: reverse-of-true-order insertion should hit exactly the worst case ---
{
  const trueOrder = [...Array(N).keys()].map(String);
  const trueRank = Object.fromEntries(trueOrder.map((id, i) => [id, i]));
  const insertionOrder = trueOrder.slice().reverse();
  const { state } = runToCompletion(insertionOrder, trueRank);
  assert.equal(
    state.comparisonsMade,
    MAX,
    `reverse-order insertion should hit the worst-case bound exactly (got ${state.comparisonsMade}, expected ${MAX})`
  );
  console.log(`Worst-case bound confirmed tight: reverse insertion order used exactly ${MAX}.`);
}

// --- Edge cases ---
{
  const s1 = createSortState(['a']);
  assert.equal(isComplete(s1), true);
  assert.deepEqual(getFinalRanking(s1), ['a']);
  assert.equal(getCurrentComparison(s1), null);
}
{
  const trueRank = { a: 0, b: 1 };
  const { state } = runToCompletion(['a', 'b'], trueRank);
  assert.equal(state.comparisonsMade, 1);
  assert.deepEqual(getFinalRanking(state), ['a', 'b']);
}
{
  const s = createSortState(['a', 'b']);
  assert.throws(() => answerComparison(s, 'zzz'), /must be one of/);
}
{
  const s = createSortState(['a']);
  assert.throws(() => answerComparison(s, 'a'), /No active comparison/);
}
console.log('Edge cases passed.');

console.log('\nAll checks passed.');
