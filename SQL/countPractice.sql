-- Count how many total library entries exist (every row in  game_library ).

SELECT COUNT(*) AS total_library_entries
FROM game_library;

-- Count how many games in  games  have  rating = 5 .


SELECT COUNT (*) AS five_star_games
FROM games
WHERE rating = 5;



--How many games are in the library with status = ‘playing’?

SELECT COUNT(*) AS currently_playing
FROM game_library
WHERE status = 'playing';


--  How many unique users have at least one game in the library?
SELECT COUNT(DISTINCT user_id) AS users_with_library_entries
FROM game_library; 

-- How many library entries per status?
SELECT 
status,
COUNT(*) AS total
FROM game_library
ORDER BY status;


SELECT
gamerTag
COUNT(*) AS gamer_rows