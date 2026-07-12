CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    gamerTag VARCHAR(100) DEFAULT 'UNNAMED',
    age INT,
    email VARCHAR(100) DEFAULT 'NO EMAIL'
);

CREATE TABLE IF NOT EXISTS consoles (
    console_id SERIAL PRIMARY KEY,
    name VARCHAR(20),
    generation VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS usersAndConsoles (
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    console_id INT REFERENCES consoles(console_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, console_id)
);

CREATE TABLE IF NOT EXISTS game_library (
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    game_id INT REFERENCES games(game_id) ON DELETE CASCADE,
    console_id INT REFERENCES consoles(console_id) ON DELETE CASCADE,
    owned BOOLEAN DEFAULT FALSE,
    hours_played INT DEFAULT 0,
    status VARCHAR(15) NOT NULL DEFAULT 'backlog'
        CHECK (status IN ('backlog', 'playing', 'finished', 'dropped')),
    PRIMARY KEY (user_id, game_id, console_id)
);

CREATE TABLE IF NOT EXISTS gameAndConsoles (
    game_id INT REFERENCES games(game_id) ON DELETE CASCADE,
    console_id INT REFERENCES consoles(console_id) ON DELETE CASCADE,
    PRIMARY KEY (game_id, console_id)
);
