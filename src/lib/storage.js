const STORAGE_KEY = 'nbaRanker.session.v1';

export function loadSession() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== 1) return null;
    // Sessions saved before Position Ranking shipped have no poolKey — default it to the
    // main pool rather than leaving it undefined, which crashes every poolKey === 'ALL'
    // check downstream into the position-loading branch for a pool that doesn't exist.
    return { ...parsed, poolKey: parsed.poolKey ?? 'ALL' };
  } catch {
    return null;
  }
}

export function saveSession(session) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    // Storage unavailable (private browsing, quota, etc.) — session just won't persist.
  }
}

export function clearSession() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // no-op
  }
}
