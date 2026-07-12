
CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    gamerTag VARCHAR(100) DEFAULT 'UNNAMED',
    age INT,
    email VARCHAR(100) DEFAULT 'NO EMAIL'
)
CREATE TABLE game (
    game_id SERIAL PRIMARY KEY,
    title  VARCHAR(100) DEFAULT 'UNTITLED',
    genre  VARCHAR(30) DEFAULT 'NONE',
    rating  INT CHECK (rating <= 5),
    description  TEXT

)


CREATE TABLE console (
    console_id SERIAL PRIMARY KEY,
    name VARCHAR(20),
    generation VARCHAR(10)
)



-- Juncitons
-- 1 user many consoles, 1 console many users
CREATE TABLE usersAndConsole (
    user_id INT REFERENCES user(user_id) ON DELETE CASCADE,
    console_id INT REFERENCES console(console_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, console_id) 
)

-- 1 user many games, 1 game many users
CREATE TABLE usersAndGame (
    user_id INT REFERENCES user(user_id),
    game_id INT REFERENCES game(game_id),
    PRIMARY KEY (user_id, game_id)
)

-- 1 game on many consoles, 1 console has many games.
CREATE TABLE gameAndConsole (
    game_id INT REFERENCES game(game_id),
    console_id INT REFERENCES console(console_id),
    PRIMARY KEY (game_id, console_id)
)
