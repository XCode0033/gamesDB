

-- join the game data, user data, console data 

-- SELECT 
-- g.game_id,
-- g.title,
-- g.genre,
-- g.rating,
-- g.description,
-- u.user_id,
-- u.gamerTag
-- c.console_id,
-- c.name AS console_name,
-- gl.owned,
-- gl.hours_played,
-- gl.status
-- FROM games AS g
-- JOIN game_library AS gl
-- ON g.game_id = gl.game_id
-- JOIN users AS u
-- ON u.user_id = gl.user_id
-- JOIN consoles AS c
-- ON c.console_id = gl.console_id
