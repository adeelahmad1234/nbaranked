import { buildPlayers } from '../buildPlayers.js';

// Small forward pool for Position Ranking. Live-verified against ESPN's core API
// (site.web.api.espn.com search + sports.core.api.espn.com athlete/statistics
// endpoints) and web search as of 2026-09-16, after the completed 2025-26 season.
// This off-season had unusually heavy trade movement: Kawhi Leonard <-> Brandon
// Ingram (Raptors/Clippers, finalized 2026-09-15), Paul George <-> Jaylen Brown
// (Celtics/76ers), Norman Powell to Chicago (free agency), Luguentz Dort to
// Atlanta, Dillon Brooks to Phoenix. Re-verify team fields before editing, they
// will drift again.
// [id, name, team, position, jersey, country, pts, reb, ast, statsSeason?]
const RAW = [
  ['4065648', 'Jayson Tatum', 'Boston Celtics', 'F', 0, 'USA', 21.8, 10.0, 5.3],
  ['5041939', 'Cooper Flagg', 'Dallas Mavericks', 'F', 32, 'USA', 21.0, 6.7, 4.5],
  ['3917376', 'Jaylen Brown', 'Philadelphia 76ers', 'F', 7, 'USA', 28.7, 6.9, 5.1],
  ['4593803', 'Jalen Williams', 'Oklahoma City Thunder', 'F', 8, 'USA', 17.1, 4.6, 5.5],
  ['3202', 'Kevin Durant', 'Houston Rockets', 'F', 7, 'USA', 26.0, 5.5, 4.8],
  ['6450', 'Kawhi Leonard', 'Toronto Raptors', 'F', 2, 'USA', 27.9, 6.4, 3.6],
  ['4683021', 'Deni Avdija', 'Portland Trail Blazers', 'F', 8, 'Israel', 24.2, 6.9, 6.7],
  ['4566434', 'Franz Wagner', 'Orlando Magic', 'F', 22, 'Germany', 20.6, 5.2, 3.3],
  ['3913176', 'Brandon Ingram', 'LA Clippers', 'F', 3, 'USA', 21.5, 5.6, 3.7],
  ['4433287', 'Brandon Miller', 'Charlotte Hornets', 'F', 24, 'USA', 20.2, 4.9, 3.3],
  ['5142718', 'AJ Dybantsa', 'Washington Wizards', 'F', 4, 'USA', null, null, null],
  ['2595516', 'Norman Powell', 'Chicago Bulls', 'F', 24, 'USA', 21.7, 3.5, 2.5],
  ['3147657', 'Mikal Bridges', 'New York Knicks', 'F', 25, 'USA', 14.4, 3.8, 3.7],
  ['4397688', 'Trey Murphy III', 'New Orleans Pelicans', 'F', 25, 'USA', 21.5, 5.7, 3.8],
  ['4278104', 'Michael Porter Jr.', 'Brooklyn Nets', 'F', 17, 'USA', 24.2, 7.1, 3.0],
  ['4395630', 'Devin Vassell', 'San Antonio Spurs', 'F', 24, 'USA', 13.9, 4.0, 2.5],
  ['4431671', 'Jaden McDaniels', 'Minnesota Timberwolves', 'F', 3, 'USA', 14.8, 4.2, 2.7],
  ['4395625', 'RJ Barrett', 'Toronto Raptors', 'F', 9, 'Canada', 19.3, 5.3, 3.3],
  ['3155526', 'Dillon Brooks', 'Phoenix Suns', 'F', 3, 'Canada', 20.2, 3.6, 1.8],
  ['6430', 'Jimmy Butler', 'Golden State Warriors', 'F', 10, 'USA', 20.0, 5.6, 4.9],
  ['4869342', 'Dyson Daniels', 'Atlanta Hawks', 'F', 5, 'Australia', 11.9, 6.8, 5.9],
  ['4251', 'Paul George', 'Boston Celtics', 'F', 13, 'USA', 17.3, 5.3, 3.6],
  ['4066336', 'Lauri Markkanen', 'Utah Jazz', 'F', 23, 'Finland', 26.7, 6.9, 2.1],
  ['3059319', 'Andrew Wiggins', 'Miami Heat', 'F', 22, 'Canada', 15.4, 4.8, 2.7],
  ['4397020', 'Luguentz Dort', 'Atlanta Hawks', 'F', 0, 'Canada', 8.3, 3.6, 1.2],
];

export const PLAYERS = buildPlayers(RAW);
