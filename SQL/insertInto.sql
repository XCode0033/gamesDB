-- Insert six games into the `games` table.
-- Some rows omit title or genre to use table defaults.

INSERT INTO games (title, genre, rating, description) VALUES
('The Legend of Zelda: Breath of the Wild', 'Action-Adventure', 5, 'An open-world action-adventure from Nintendo where exploration and physics-based puzzles are central. Players control Link to restore Hyrule.');

INSERT INTO games (title, genre, rating, description) VALUES
('Stardew Valley', 'Simulation/RPG', 4, 'A farming simulation with light RPG elements where players rebuild a dilapidated farm. Features crafting, relationships, and seasonal activities.');

INSERT INTO games (title, genre, rating, description) VALUES
('Hades', 'Roguelike', 5, 'A roguelike dungeon-crawler by Supergiant Games where you attempt to escape the underworld. Combines fast combat with a narrative that evolves between runs.');

-- No title provided; uses default title 'UNTITLED'.
INSERT INTO games (genre, rating, description) VALUES
('Experimental', 3, 'A small prototype focused on procedural puzzles. Gameplay varies each run.');

-- No genre provided; uses default genre 'NONE'.
INSERT INTO games (title, rating, description) VALUES
('Celeste', 4, 'A precision platformer about climbing a mountain and confronting inner struggles. Praised for tight controls and emotional storytelling.');

INSERT INTO games (title, genre, rating, description) VALUES
('Minecraft', 'Sandbox/Survival', 5, 'A sandbox survival game about mining, crafting, and building in a blocky world. It supports exploration, creativity, and survival mechanics.');

