# nbaRanked

[nbaranked.com](https://nbaranked.com)

Cut 5 of 30 curated NBA players, then rank the rest head to head to build your top 25.

## How the ranking works

Every matchup you answer does double duty. Instead of asking you to compare each player against every other player, the app takes your already ranked list and drops the next player into the middle of it. Whoever wins that matchup tells the app which half of the list to search next, so it keeps asking about the middle of a smaller and smaller slice until it finds exactly where that player belongs. Then it moves on to the next player and does the same thing again. This is a classic technique called binary insertion sort, and it means you get a fully ordered top 25 while answering as few head to head matchups as possible.

## APIs

- Player photos, teams, and season stats: ESPN's public API
- Country flags: [flagcdn.com](https://flagcdn.com)

No API keys required. All player data is static, no runtime calls.
