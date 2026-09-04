import { COUNTRY_CODES } from './countries.js';

const headshot = (espnId) =>
  `https://a.espncdn.com/i/headshots/nba/players/full/${espnId}.png`;

// Curated pool of 50 current NBA players, verified live against ESPN's API
// (team/active-status can drift season to season — re-verify before editing).
//
// [id, name, team, position, jersey, country, pts, reb, ast]
// pts/reb/ast are per-game averages for the most recently completed season (2025-26).
// Lillard, Haliburton, and Irving didn't play in 2025-26 (season-ending injuries the
// year before) — ESPN has no 2025-26 line for them, so their numbers here fall back to
// 2024-25, the most recent season they actually played.
const RAW = [
  ['1966', 'LeBron James', 'Philadelphia 76ers', 'F', 23, 'USA', 20.9, 6.1, 7.2],
  ['3975', 'Stephen Curry', 'Golden State Warriors', 'G', 30, 'USA', 26.6, 3.6, 4.7],
  ['3202', 'Kevin Durant', 'Houston Rockets', 'F', 7, 'USA', 26.0, 5.5, 4.8],
  ['3032977', 'Giannis Antetokounmpo', 'Miami Heat', 'F', 7, 'Greece', 27.6, 9.8, 5.4],
  ['3112335', 'Nikola Jokic', 'Denver Nuggets', 'C', 15, 'Serbia', 27.7, 12.9, 10.7],
  ['3945274', 'Luka Doncic', 'Los Angeles Lakers', 'G', 77, 'Slovenia', 33.5, 7.7, 8.3],
  ['3059318', 'Joel Embiid', 'Philadelphia 76ers', 'C', 21, 'Cameroon', 26.9, 7.7, 3.9],
  ['4065648', 'Jayson Tatum', 'Boston Celtics', 'F', 0, 'USA', 21.8, 10.0, 5.3],
  ['4278073', 'Shai Gilgeous-Alexander', 'Oklahoma City Thunder', 'G', 2, 'Canada', 31.1, 4.3, 6.6],
  ['4594268', 'Anthony Edwards', 'Minnesota Timberwolves', 'G', 5, 'USA', 28.8, 5.0, 3.7],
  ['5104157', 'Victor Wembanyama', 'San Antonio Spurs', 'F', 1, 'France', 25.0, 11.5, 3.1],
  ['3136193', 'Devin Booker', 'Phoenix Suns', 'G', 15, 'USA', 26.1, 3.9, 6.0],
  ['6606', 'Damian Lillard', 'Portland Trail Blazers', 'G', 0, 'USA', 24.9, 4.7, 7.1],
  ['6450', 'Kawhi Leonard', 'LA Clippers', 'F', 2, 'USA', 27.9, 6.4, 3.6],
  ['6430', 'Jimmy Butler', 'Golden State Warriors', 'F', 10, 'USA', 20.0, 5.6, 4.9],
  ['6583', 'Anthony Davis', 'Washington Wizards', 'F', 23, 'USA', 20.4, 11.1, 2.8],
  ['4396993', 'Tyrese Haliburton', 'Indiana Pacers', 'G', 0, 'USA', 18.6, 3.5, 9.2],
  ['3908809', 'Donovan Mitchell', 'Cleveland Cavaliers', 'G', 45, 'USA', 27.9, 4.5, 5.7],
  ['4277905', 'Trae Young', 'Washington Wizards', 'G', 3, 'USA', 17.9, 2.0, 8.0],
  ['4432573', 'Paolo Banchero', 'Orlando Magic', 'F', 5, 'USA', 22.2, 8.4, 5.2],
  ['3934672', 'Jalen Brunson', 'New York Knicks', 'G', 11, 'USA', 26.0, 3.3, 6.8],
  ['4066259', "De'Aaron Fox", 'San Antonio Spurs', 'G', 4, 'USA', 18.6, 3.8, 6.2],
  ['3155942', 'Domantas Sabonis', 'Sacramento Kings', 'F', 11, 'Lithuania', 15.8, 11.4, 4.1],
  ['3136195', 'Karl-Anthony Towns', 'New York Knicks', 'C', 32, 'USA', 20.1, 11.9, 3.0],
  ['6442', 'Kyrie Irving', 'Dallas Mavericks', 'G', 11, 'Australia', 24.7, 4.8, 4.6],
  ['4066261', 'Bam Adebayo', 'Miami Heat', 'C', 13, 'USA', 20.1, 10.0, 3.2],
  ['4566434', 'Franz Wagner', 'Orlando Magic', 'F', 22, 'Germany', 20.6, 5.2, 3.3],
  ['4871144', 'Alperen Sengun', 'Houston Rockets', 'C', 28, 'Turkey', 20.4, 8.9, 6.2],
  ['4432166', 'Cade Cunningham', 'Detroit Pistons', 'G', 2, 'USA', 23.9, 5.5, 9.9],
  ['4432816', 'LaMelo Ball', 'Minnesota Timberwolves', 'G', null, 'USA', 20.1, 4.8, 7.1],
  ['3917376', 'Jaylen Brown', 'Philadelphia 76ers', 'G', 7, 'USA', 28.7, 6.9, 5.1],
  ['4431678', 'Tyrese Maxey', 'Philadelphia 76ers', 'G', 0, 'USA', 28.3, 4.1, 6.6],
  ['4433134', 'Scottie Barnes', 'Toronto Raptors', 'F', 4, 'USA', 18.1, 7.5, 5.9],
  ['4593803', 'Jalen Williams', 'Oklahoma City Thunder', 'G', 8, 'USA', 17.1, 4.6, 5.5],
  ['4701230', 'Jalen Johnson', 'Atlanta Hawks', 'F', 1, 'USA', 22.5, 10.3, 7.9],
  ['4845367', 'Stephon Castle', 'San Antonio Spurs', 'G', 5, 'USA', 16.7, 5.3, 7.4],
  ['3992', 'James Harden', 'Cleveland Cavaliers', 'G', 1, 'USA', 23.6, 4.8, 8.0],
  ['4066457', 'Austin Reaves', 'Los Angeles Lakers', 'G', 15, 'USA', 23.3, 4.7, 5.5],
  ['3149673', 'Pascal Siakam', 'Indiana Pacers', 'F', 43, 'Cameroon', 24.0, 6.6, 3.8],
  ['4683021', 'Deni Avdija', 'Portland Trail Blazers', 'F', 8, 'Israel', 24.2, 6.9, 6.7],
  ['4432158', 'Evan Mobley', 'Cleveland Cavaliers', 'C', 4, 'USA', 18.2, 9.0, 3.6],
  ['3032976', 'Rudy Gobert', 'Minnesota Timberwolves', 'C', 27, 'France', 10.9, 11.5, 1.7],
  ['3934719', 'OG Anunoby', 'New York Knicks', 'F', 8, 'England', 16.7, 5.2, 2.2],
  ['4433255', 'Chet Holmgren', 'Oklahoma City Thunder', 'C', 7, 'USA', 17.1, 8.9, 1.7],
  ['4395628', 'Zion Williamson', 'New Orleans Pelicans', 'F', 1, 'USA', 21.0, 5.7, 3.2],
  ['5041939', 'Cooper Flagg', 'Dallas Mavericks', 'F', 32, 'USA', 21.0, 6.7, 4.5],
  ['5037871', 'Dylan Harper', 'San Antonio Spurs', 'G', 2, 'USA', 11.8, 3.4, 3.9],
  ['4684740', 'Amen Thompson', 'Houston Rockets', 'G', 1, 'USA', 18.3, 7.8, 5.3],
  ['4066336', 'Lauri Markkanen', 'Utah Jazz', 'F', 23, 'Finland', 26.7, 6.9, 2.1],
  ['3936299', 'Jamal Murray', 'Denver Nuggets', 'G', 27, 'Canada', 25.4, 4.4, 7.1],
];

// pts/reb/ast season, per player — defaults to '2025-26'; overridden for the three who
// didn't play that season (see comment above).
const SEASON_OVERRIDES = {
  6606: '2024/25', // Damian Lillard
  4396993: '2024/25', // Tyrese Haliburton
  6442: '2024/25', // Kyrie Irving
};

export const PLAYERS = RAW.map(
  ([id, name, team, position, jersey, country, pts, reb, ast]) => ({
    id,
    espnId: id,
    name,
    team,
    position,
    jersey,
    country,
    countryCode: COUNTRY_CODES[country],
    headshot: headshot(id),
    pts,
    reb,
    ast,
    statsSeason: SEASON_OVERRIDES[id] ?? '2025/26',
  })
);

export const PLAYERS_BY_ID = Object.fromEntries(PLAYERS.map((p) => [p.id, p]));
