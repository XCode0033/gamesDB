

-- 4:48pm 7/12/26 sunday
-- changing console 'name' to 'console_name'

-- ALTER TABLE consoles RENAME COLUMN name TO console_name;


-- 7/14/26 5:46pm
ALTER TABLE game_library ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

-- 7/14/26
-- switching game_library from composite PK to surrogate library_id PK,
-- keeping (user_id, game_id, console_id) as a UNIQUE constraint instead
ALTER TABLE game_library ADD COLUMN library_id SERIAL;
ALTER TABLE game_library DROP CONSTRAINT game_library_pkey;
ALTER TABLE game_library ADD PRIMARY KEY (library_id);
ALTER TABLE game_library ADD CONSTRAINT game_library_unique_entry UNIQUE (user_id, game_id, console_id);