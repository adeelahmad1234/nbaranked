import { buildPlayers } from '../buildPlayers.js';

// Point guard pool for Position Ranking. Live-verified against ESPN/web search as of
// 2025-26 season close (the site's "today" is 2026-09-16) — team/stat drift is expected
// season to season, re-verify before editing.
// [id, name, team, position, jersey, country, pts, reb, ast, statsSeason?]
const RAW = [
  ['4278073', 'Shai Gilgeous-Alexander', 'Oklahoma City Thunder', 'G', 2, 'Canada', 31.1, 4.3, 6.6],
  ['3945274', 'Luka Doncic', 'Los Angeles Lakers', 'G', 77, 'Slovenia', 33.5, 7.7, 8.3],
  ['3934672', 'Jalen Brunson', 'New York Knicks', 'G', 11, 'USA', 26.0, 3.3, 6.8],
  ['4432166', 'Cade Cunningham', 'Detroit Pistons', 'G', 2, 'USA', 23.9, 5.5, 9.9],
  ['4431678', 'Tyrese Maxey', 'Philadelphia 76ers', 'G', 0, 'USA', 28.3, 4.1, 6.6],
  ['3975', 'Stephen Curry', 'Golden State Warriors', 'G', 30, 'USA', 26.6, 3.6, 4.7],
  ['4396993', 'Tyrese Haliburton', 'Indiana Pacers', 'G', 0, 'USA', 18.6, 3.5, 9.2, '2024/25'],
  ['6606', 'Damian Lillard', 'Portland Trail Blazers', 'G', 0, 'USA', 24.9, 4.7, 7.1, '2024/25'],
  ['3936299', 'Jamal Murray', 'Denver Nuggets', 'G', 27, 'Canada', 25.4, 4.4, 7.1],
  ['3992', 'James Harden', 'Cleveland Cavaliers', 'G', 1, 'USA', 23.6, 4.8, 8.0],
  ['4277905', 'Trae Young', 'Washington Wizards', 'G', 3, 'USA', 17.9, 2.0, 8.0],
  ['4432816', 'LaMelo Ball', 'Minnesota Timberwolves', 'G', null, 'USA', 20.1, 4.8, 7.1],
  ['5037871', 'Dylan Harper', 'San Antonio Spurs', 'G', 2, 'USA', 11.8, 3.4, 3.9],
  ['4066259', "De'Aaron Fox", 'San Antonio Spurs', 'G', 4, 'USA', 18.6, 3.8, 6.2],
  ['6442', 'Kyrie Irving', 'Dallas Mavericks', 'G', 11, 'Australia', 24.7, 4.8, 4.6, '2024/25'],
  ['4396907', 'Darius Garland', 'LA Clippers', 'G', 7, 'USA', 18.8, 2.4, 6.7],
  ['4871145', 'Josh Giddey', 'Chicago Bulls', 'G', 3, 'Australia', 17.0, 8.3, 9.1],
  ['4279888', 'Ja Morant', 'Portland Trail Blazers', 'G', 1, 'USA', 19.5, 3.3, 8.1],
  ['4433627', 'Keyonte George', 'Utah Jazz', 'G', 3, 'USA', 23.6, 3.7, 6.1],
  ['4395724', 'Immanuel Quickley', 'Toronto Raptors', 'G', 5, 'USA', 16.4, 4.0, 5.9],
  ['4066354', 'Payton Pritchard', 'Boston Celtics', 'G', 11, 'USA', 17.0, 3.9, 5.2],
  ['4395651', 'Coby White', 'Charlotte Hornets', 'G', 3, 'USA', 17.9, 3.6, 4.6],
  ['5144091', 'Jeremiah Fears', 'New Orleans Pelicans', 'G', 0, 'USA', 14.3, 3.7, 3.4],
  ['4432165', 'Jalen Suggs', 'Orlando Magic', 'G', 4, 'USA', 13.8, 3.9, 5.5],
  ['3995', 'Jrue Holiday', 'Portland Trail Blazers', 'G', 4, 'USA', 16.3, 4.6, 6.1],
];

export const PLAYERS = buildPlayers(RAW);
