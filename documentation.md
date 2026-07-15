
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


# TASKS FOR 6/12/26 *
1. Run new tables.
2. Double check data and add new insert intos.

These are better than tags right now for your stack and current level:
•	User game library: a  user_games  junction with fields like  owned ,  hours_played ,  status ,  started_at ,  finished_at .
•	Wishlist: either  status  inside  user_games  or a separate wishlist table if you want extra CRUD practice.
•	Reviews:  reviews(user_id, game_id, rating, review_text)  so one user can review many games and games can have many reviews.
•	Favorites: a simple boolean like  favorite BOOLEAN DEFAULT FALSE  on  user_games .
•	Platform availability: keep  game_consoles  and query “show all games on Switch” or “show all consoles for Elden Ring.”

### Tuesday 7/14/26 
 completed library connection

#### new task
## allow creation of new users to create new entries
## get started ~~page~~ from home page
## 1.create user block with console_name joined
## 2. optional game add or homepage link


### DEV checklist
## 1. controller
## 2. router
## 3. ejs

# completed
1. user page, user create page have been created
2. users page created, add users finished. Now working on editing/delete and validation/error handling
3. added success and error messages
4. resorted game library to order by descending and added created_at to database.
4. added delete button to game library

## DATABASE CHANGES
-- 7/14/26 5:46pm
ALTER TABLE game_library ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
why: So i could arrange the game library to show desc but realized i could just move the success message up but whatever 
##


# remaining tasks
1. Add delete button for ~~game library~~, users
2. Add edit button for game user data.
######

###### Wednesday 7/15/26
# To-Do
2. Add edit button for game user data.








######