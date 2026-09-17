// Metadata is tiny and always loaded; each pool's player data is dynamically
// imported only once the user actually picks that position, so visiting the
// site or ranking the main 50 never pulls in any of the five position rosters.
export const POSITIONS = [
  { key: 'PG', label: 'Point Guards', load: () => import('./pointGuards.js').then((m) => m.PLAYERS) },
  { key: 'SG', label: 'Shooting Guards', load: () => import('./shootingGuards.js').then((m) => m.PLAYERS) },
  { key: 'SF', label: 'Small Forwards', load: () => import('./smallForwards.js').then((m) => m.PLAYERS) },
  { key: 'PF', label: 'Power Forwards', load: () => import('./powerForwards.js').then((m) => m.PLAYERS) },
  { key: 'C', label: 'Centers', load: () => import('./centers.js').then((m) => m.PLAYERS) },
];

export const POSITIONS_BY_KEY = Object.fromEntries(POSITIONS.map((p) => [p.key, p]));
