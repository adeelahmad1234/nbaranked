import { buildPlayers } from '../buildPlayers.js';

// Center pool for Position Ranking. Live-verified against ESPN's API as of the 2025-26
// season close (the site's "today" is 2026-09-16) — several trades happened this
// off-season (Mitchell Robinson to Boston, Porzingis to Golden State, Zubac to Indiana,
// Kessler to the Lakers, Claxton to Chicago); re-verify team fields before editing, they
// will drift again. Country reflects each player's international/national-team
// nationality, not raw birthplace, for Zubac (born in Bosnia, plays for Croatia) and
// Hartenstein (born in Oregon, plays for Germany) — same convention as OG Anunoby's
// "England" override elsewhere in this app.
// [id, name, team, position, jersey, country, pts, reb, ast, statsSeason?]
const RAW = [
  ['4431680', 'Onyeka Okongwu', 'Atlanta Hawks', 'C', 17, 'USA', 15.2, 7.6, 3.1],
  ['4397424', 'Neemias Queta', 'Boston Celtics', 'C', 88, 'Portugal', 10.2, 8.4, 1.7],
  ['4351852', 'Mitchell Robinson', 'Boston Celtics', 'C', 4, 'USA', 5.7, 8.8, 0.9],
  ['5107173', 'Danny Wolf', 'Brooklyn Nets', 'C', 2, 'USA', 8.9, 4.9, 2.2],
  ['4433249', 'Moussa Diabate', 'Charlotte Hornets', 'C', 14, 'France', 7.9, 8.7, 1.9],
  ['4278067', 'Nicolas Claxton', 'Chicago Bulls', 'C', 9, 'USA', 11.7, 6.9, 3.7],
  ['4066328', 'Jarrett Allen', 'Cleveland Cavaliers', 'C', 31, 'USA', 15.4, 8.5, 1.8],
  ['4683688', 'Dereck Lively II', 'Dallas Mavericks', 'C', 2, 'USA', 4.3, 5.3, 1.9],
  ['3112335', 'Nikola Jokic', 'Denver Nuggets', 'C', 15, 'Serbia', 27.7, 12.9, 10.7],
  ['4433621', 'Jalen Duren', 'Detroit Pistons', 'C', 0, 'USA', 19.5, 10.5, 2.0],
  ['3102531', 'Kristaps Porzingis', 'Golden State Warriors', 'C', 7, 'Latvia', 16.7, 5.2, 2.5],
  ['4871144', 'Alperen Sengun', 'Houston Rockets', 'C', 28, 'Turkey', 20.4, 8.9, 6.2],
  ['4017837', 'Ivica Zubac', 'Indiana Pacers', 'C', 40, 'Croatia', 14.1, 10.6, 2.2],
  ['4433136', 'Walker Kessler', 'Los Angeles Lakers', 'C', 14, 'USA', 14.4, 10.8, 3.0],
  ['4600663', 'Zach Edey', 'Memphis Grizzlies', 'C', 14, 'Canada', 13.6, 11.1, 1.1],
  ['4066261', 'Bam Adebayo', 'Miami Heat', 'C', 13, 'USA', 20.1, 10.0, 3.2],
  ['3032976', 'Rudy Gobert', 'Minnesota Timberwolves', 'C', 27, 'France', 10.9, 11.5, 1.7],
  ['5061589', 'Yves Missi', 'New Orleans Pelicans', 'C', 21, 'Cameroon', 5.7, 5.8, 1.3],
  ['3136195', 'Karl-Anthony Towns', 'New York Knicks', 'C', 32, 'USA', 20.1, 11.9, 3.0],
  ['4222252', 'Isaiah Hartenstein', 'Oklahoma City Thunder', 'C', 55, 'Germany', 9.2, 9.4, 3.5],
  ['3059318', 'Joel Embiid', 'Philadelphia 76ers', 'C', 21, 'Cameroon', 26.9, 7.7, 3.9],
  ['5105565', 'Donovan Clingan', 'Portland Trail Blazers', 'C', 23, 'USA', 12.1, 11.6, 2.1],
  ['3155942', 'Domantas Sabonis', 'Sacramento Kings', 'F', 11, 'Lithuania', 15.8, 11.4, 4.1],
  ['5104157', 'Victor Wembanyama', 'San Antonio Spurs', 'F', 1, 'France', 25.0, 11.5, 3.1],
  ['5160992', 'Alex Sarr', 'Washington Wizards', 'C', 20, 'France', 16.3, 7.4, 2.7],
];

export const PLAYERS = buildPlayers(RAW);
