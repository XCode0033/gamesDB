-- Insert six games into the `games` table.
-- Some rows omit title or genre to use table defaults.

-- INSERT INTO games (title, genre, rating, description) VALUES
-- ('The Legend of Zelda: Breath of the Wild', 'Action-Adventure', 5, 'An open-world action-adventure from Nintendo where exploration and physics-based puzzles are central. Players control Link to restore Hyrule.');

-- INSERT INTO games (title, genre, rating, description) VALUES
-- ('Stardew Valley', 'Simulation/RPG', 4, 'A farming simulation with light RPG elements where players rebuild a dilapidated farm. Features crafting, relationships, and seasonal activities.');

-- INSERT INTO games (title, genre, rating, description) VALUES
-- ('Hades', 'Roguelike', 5, 'A roguelike dungeon-crawler by Supergiant Games where you attempt to escape the underworld. Combines fast combat with a narrative that evolves between runs.');

-- -- No title provided; uses default title 'UNTITLED'.
-- INSERT INTO games (genre, rating, description) VALUES
-- ('Experimental', 3, 'A small prototype focused on procedural puzzles. Gameplay varies each run.');

-- -- No genre provided; uses default genre 'NONE'.
-- INSERT INTO games (title, rating, description) VALUES
-- ('Celeste', 4, 'A precision platformer about climbing a mountain and confronting inner struggles. Praised for tight controls and emotional storytelling.');

-- INSERT INTO games (title, genre, rating, description) VALUES
-- ('Minecraft', 'Sandbox/Survival', 5, 'A sandbox survival game about mining, crafting, and building in a blocky world. It supports exploration, creativity, and survival mechanics.');

-- USERS
INSERT INTO users (gamerTag, age, email)
VALUES
('DragonSlayer', 22, 'dragon@example.com'),
('PixelQueen', 25, 'pixel@example.com'),
('NoScopeNate', 19, 'nate@example.com');

-- GAMES
INSERT INTO games (title, genre, rating, description)
VALUES
('Skyrim', 'Fantasy', 5, 'Open-world fantasy RPG with dragons, quests, and exploration.'),
('Halo Infinite', 'Shooter', 4, 'Sci-fi first-person shooter with campaign and multiplayer.'),
('Stardew Valley', 'Simulation', 5, 'Farming and life sim with crafting, fishing, and relationships.'),
('Elden Ring', 'Action RPG', 5, 'Large-scale dark fantasy action RPG with difficult combat.');

-- CONSOLES
INSERT INTO consoles (name, generation)
VALUES
('PC', 'Modern'),
('Xbox One', '8th'),
('PS5', '9th'),
('Nintendo Switch', '8th');

-- USERS AND CONSOLES
-- INSERT INTO usersAndConsoles (user_id, console_id)
-- VALUES
-- (1, 1), -- DragonSlayer has PC
-- (1, 3), -- DragonSlayer has PS5
-- (2, 4), -- PixelQueen has Switch 
-- (2, 1), -- PixelQueen has PC
-- (3, 2); -- NoScopeNate has Xbox One

-- -- GAME AND CONSOLES
-- INSERT INTO gameAndConsoles (game_id, console_id)
-- VALUES
-- (1, 1), -- Skyrim on PC
-- (1, 3), -- Skyrim on PS5
-- (2, 1), -- Halo Infinite on PC
-- (2, 2), -- Halo Infinite on Xbox One
-- (3, 1), -- Stardew Valley on PC
-- (3, 4), -- Stardew Valley on Switch
-- (4, 1), -- Elden Ring on PC
-- (4, 3); -- Elden Ring on PS5

-- -- GAME LIBRARY
-- INSERT INTO game_library (user_id, game_id, console_id, owned, hours_played, status)
-- VALUES
-- (1, 1, 1, TRUE, 120, 'finished'),   -- DragonSlayer owns Skyrim on PC
-- (1, 4, 3, TRUE, 45, 'playing'),     -- DragonSlayer owns Elden Ring on PS5
-- (2, 3, 4, TRUE, 200, 'finished'),   -- PixelQueen owns Stardew on Switch
-- (2, 1, 3, FALSE, 0, 'backlog'),     -- PixelQueen wants Skyrim on PS5
-- (3, 2, 2, TRUE, 75, 'playing');     -- NoScopeNate owns Halo Infinite on Xbox One
