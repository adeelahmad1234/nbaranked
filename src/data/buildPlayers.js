import { COUNTRY_CODES } from './countries.js';

export const headshotUrl = (espnId) =>
  `https://a.espncdn.com/i/headshots/nba/players/full/${espnId}.png`;

// Shared row -> player-object mapping used by the main 50-player pool and every
// position pool, so all six data files agree on one shape without duplicating this
// transform six times. pts/reb/ast may be null for a player with no completed NBA
// season yet (a very recent draftee) — the UI renders a dash instead of a stat, and
// statsSeason is left null too so no season label is shown for them.
export function buildPlayers(raw) {
  return raw.map(([id, name, team, position, jersey, country, pts, reb, ast, statsSeason]) => ({
    id,
    espnId: id,
    name,
    team,
    position,
    jersey,
    country,
    countryCode: COUNTRY_CODES[country],
    headshot: headshotUrl(id),
    pts: pts ?? null,
    reb: reb ?? null,
    ast: ast ?? null,
    statsSeason: pts == null ? null : statsSeason ?? '2025/26',
  }));
}
