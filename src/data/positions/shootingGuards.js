import { buildPlayers } from '../buildPlayers.js';

// Shooting guard pool for Position Ranking. Live-verified against ESPN's API as of the
// 2025-26 season close (site's "today" is 2026-09-16) — team/stat drift is expected
// season to season, re-verify before editing.
// [id, name, team, position, jersey, country, pts, reb, ast, statsSeason?]
const RAW = [
  ['4594268', 'Anthony Edwards', 'Minnesota Timberwolves', 'G', 5, 'USA', 28.8, 5.0, 3.7],
  ['3908809', 'Donovan Mitchell', 'Cleveland Cavaliers', 'G', 45, 'USA', 27.9, 4.5, 5.7],
  ['3136193', 'Devin Booker', 'Phoenix Suns', 'G', 15, 'USA', 26.1, 3.9, 6.0],
  ['4684740', 'Amen Thompson', 'Houston Rockets', 'G', 1, 'USA', 18.3, 7.8, 5.3],
  ['4066457', 'Austin Reaves', 'Los Angeles Lakers', 'G', 15, 'USA', 23.3, 4.7, 5.5],
  ['4845367', 'Stephon Castle', 'San Antonio Spurs', 'G', 5, 'USA', 16.7, 5.3, 7.4],
  ['5061575', 'Kon Knueppel', 'Charlotte Hornets', 'G', 7, 'USA', 18.5, 5.3, 3.4],
  ['5124612', 'VJ Edgecombe', 'Philadelphia 76ers', 'G', 77, 'Bahamas', 16.0, 5.6, 4.2],
  ['3078576', 'Derrick White', 'Boston Celtics', 'G', 9, 'USA', 16.5, 4.4, 5.4],
  ['4395725', 'Tyler Herro', 'Milwaukee Bucks', 'G', 14, 'USA', 20.5, 4.8, 4.1],
  ['4066320', 'Desmond Bane', 'Orlando Magic', 'G', 3, 'USA', 20.1, 4.1, 4.1],
  ['3062679', 'Josh Hart', 'New York Knicks', 'G', 3, 'USA', 12.0, 7.4, 4.8],
  ['5041955', 'Darryn Peterson', 'Utah Jazz', 'G', 22, 'USA', null, null, null],
  ['4684742', 'Ausar Thompson', 'Detroit Pistons', 'G', 9, 'USA', 9.9, 5.7, 3.1],
  ['4683692', 'Cason Wallace', 'Oklahoma City Thunder', 'G', 22, 'USA', 8.6, 3.1, 2.6],
  ['3907497', 'Dejounte Murray', 'New Orleans Pelicans', 'G', 5, 'USA', 16.7, 5.4, 6.4],
  ['3064440', 'Zach LaVine', 'Sacramento Kings', 'G', 8, 'USA', 19.2, 2.8, 2.3],
  ['4278039', 'Nickeil Alexander-Walker', 'Atlanta Hawks', 'G', 7, 'Canada', 20.8, 3.4, 3.7],
  ['4437244', 'Jalen Green', 'Phoenix Suns', 'G', 4, 'USA', 17.8, 3.6, 2.8],
  ['2490149', 'CJ McCollum', 'Atlanta Hawks', 'G', 3, 'USA', 18.7, 3.3, 3.9],
  ['4903027', 'Cedric Coward', 'Memphis Grizzlies', 'G', 23, 'USA', 13.6, 5.9, 2.8],
  ['4900671', 'Ajay Mitchell', 'Oklahoma City Thunder', 'G', 25, 'Belgium', 13.6, 3.3, 3.6],
  ['2991350', 'Alex Caruso', 'Oklahoma City Thunder', 'G', 9, 'USA', 6.2, 2.8, 2.0],
  ['4712849', 'Anthony Black', 'Orlando Magic', 'G', 0, 'USA', 15.0, 3.8, 3.7],
  ['4431767', 'Christian Braun', 'Denver Nuggets', 'G', 0, 'USA', 12.0, 4.8, 2.7],
];

export const PLAYERS = buildPlayers(RAW);
