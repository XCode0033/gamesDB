
-- INITIAL TABLE
CREATE TABLE games (
    id = SERIAL PRIMARY KEY,
    title = VARCHAR(100) DEFAULT 'UNTITLED',
    genre = VARCHAR(30) DEFAULT 'NONE'
    rating = INT CHECK (rating <= 5)
    description = TEXT
)


7-7-26 12:16pm
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
----------
Sun 7/12/26 12:49 AM
created user and console tables, also created junction tables for:
users <-> game 
game <-> console
console <-> users

*DID NOT* run yet.


*TASKS FOR 6/12/26 *
1. Run new tables.
2. Double check data and add new insert intos.
3. Work on incorporating joins
*NOTE* If im not using tags on games, does the join process as it relates to tags differ?
