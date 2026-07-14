-- Read-only test query: full game_library join, for eyeballing current data.
-- Run manually with: psql -U xavier -d gamesdb -h localhost -f SQL/testJoin.sql

SELECT 
u.gamerTag,
u.user_id,
g.title,
g.game_id,
c.console_id,
c.console_name,
gl.owned,
gl.hours_played AS hours,
gl.status
FROM users AS u
JOIN game_library AS gl
ON u.user_id = gl.user_id
JOIN games AS g
ON g.game_id = gl.game_id
JOIN consoles AS c
ON c.console_id = gl.console_id;