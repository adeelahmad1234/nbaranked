import { buildPlayers } from '../buildPlayers.js';

// Power forward pool for Position Ranking. Live-verified against ESPN's API and web
// search as of the 2025-26 season close (the site's "today" is 2026-09-16) — heavy
// off-season movement here too (Jaren Jackson Jr. to Utah, Julius Randle to Brooklyn,
// Miles Bridges to Phoenix, Tobias Harris to San Antonio, John Collins to Detroit to
// replace him, Jonathan Kuminga to Minnesota); re-verify team fields before editing.
// Cameron Boozer (#3 overall) and Caleb Wilson (#4 overall) are 2026 draftees who
// haven't played an NBA game yet — null stats, no statsSeason, per the zero-games rule.
// [id, name, team, position, jersey, country, pts, reb, ast, statsSeason?]
const RAW = [
  ['3032977', 'Giannis Antetokounmpo', 'Miami Heat', 'F', 7, 'Greece', 27.6, 9.8, 5.4],
  ['4701230', 'Jalen Johnson', 'Atlanta Hawks', 'F', 1, 'USA', 22.5, 10.3, 7.9],
  ['4433134', 'Scottie Barnes', 'Toronto Raptors', 'F', 4, 'USA', 18.1, 7.5, 5.9],
  ['4432158', 'Evan Mobley', 'Cleveland Cavaliers', 'C', 4, 'USA', 18.2, 9.0, 3.6],
  ['1966', 'LeBron James', 'Philadelphia 76ers', 'F', 23, 'USA', 20.9, 6.1, 7.2],
  ['4432573', 'Paolo Banchero', 'Orlando Magic', 'F', 5, 'USA', 22.2, 8.4, 5.2],
  ['4395628', 'Zion Williamson', 'New Orleans Pelicans', 'F', 1, 'USA', 21.0, 5.7, 3.2],
  ['3149673', 'Pascal Siakam', 'Indiana Pacers', 'F', 43, 'Cameroon', 24.0, 6.6, 3.8],
  ['6583', 'Anthony Davis', 'Washington Wizards', 'F', 23, 'USA', 20.4, 11.1, 2.8],
  ['4277961', 'Jaren Jackson Jr.', 'Utah Jazz', 'F', 20, 'USA', 19.4, 5.7, 2.0],
  ['3064514', 'Julius Randle', 'Brooklyn Nets', 'F', 30, 'USA', 21.1, 6.7, 5.0],
  ['3934719', 'OG Anunoby', 'New York Knicks', 'F', 8, 'England', 16.7, 5.2, 2.2],
  ['3064290', 'Aaron Gordon', 'Denver Nuggets', 'F', 32, 'USA', 16.2, 5.8, 2.7],
  ['5041935', 'Cameron Boozer', 'Memphis Grizzlies', 'F', 27, 'USA', null, null, null],
  ['5095151', 'Caleb Wilson', 'Chicago Bulls', 'F', 8, 'USA', null, null, null],
  ['4432639', 'Jabari Smith Jr.', 'Houston Rockets', 'F', 10, 'USA', 15.8, 6.9, 1.9],
  ['5093267', 'Collin Murray-Boyles', 'Toronto Raptors', 'F', 30, 'USA', 8.5, 5.0, 1.9],
  ['4066383', 'Miles Bridges', 'Phoenix Suns', 'F', 22, 'USA', 17.1, 5.8, 3.2],
  ['4431736', 'Toumani Camara', 'Portland Trail Blazers', 'F', 33, 'Belgium', 13.4, 5.1, 2.5],
  ['4711294', 'Matas Buzelis', 'Chicago Bulls', 'F', 14, 'USA', 16.3, 5.8, 2.1],
  ['3908845', 'John Collins', 'Detroit Pistons', 'F', 20, 'USA', 13.6, 5.3, 1.0],
  ['6440', 'Tobias Harris', 'San Antonio Spurs', 'F', 23, 'USA', 13.3, 5.1, 2.5],
  ['4433247', 'Jonathan Kuminga', 'Minnesota Timberwolves', 'F', 24, 'DR Congo', 12.2, 5.6, 2.3],
  ['4433255', 'Chet Holmgren', 'Oklahoma City Thunder', 'C', 7, 'USA', 17.1, 8.9, 1.7],
  ['6589', 'Draymond Green', 'Golden State Warriors', 'F', 23, 'USA', 8.4, 5.5, 5.5],
];

export const PLAYERS = buildPlayers(RAW);
