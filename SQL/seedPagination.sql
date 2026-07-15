-- Seed extra games/users/library entries for pagination testing.

INSERT INTO games (title, genre, rating, description) VALUES
('The Witcher 3', 'RPG', 5, 'Open-world RPG following monster hunter Geralt of Rivia.'),
('God of War', 'Action-Adventure', 5, 'Kratos and Atreus journey through Norse mythology.'),
('Portal 2', 'Puzzle', 5, 'First-person puzzle game involving portals and physics.'),
('Terraria', 'Sandbox/Survival', 4, '2D sandbox adventure with mining, building, and bosses.'),
('Overwatch 2', 'Shooter', 4, 'Team-based hero shooter.'),
('Animal Crossing: New Horizons', 'Simulation', 5, 'Life sim on a deserted island.');

INSERT INTO users (gamertag, age, email) VALUES
('ShadowFox', 28, 'shadowfox@example.com'),
('LunaBell', 21, 'lunabell@example.com'),
('TurboKid', 17, 'turbokid@example.com'),
('IronClad', 33, 'ironclad@example.com');

INSERT INTO game_library (user_id, game_id, console_id, owned, hours_played, status)
SELECT u.user_id, g.game_id, c.console_id, o.owned, o.hours_played, o.status
FROM (VALUES
    ('DragonSlayer', 'Hades', 'PC', true, 42, 'playing'),
    ('DragonSlayer', 'The Witcher 3', 'PS5', true, 210, 'finished'),
    ('PixelQueen', 'Celeste', 'Nintendo Switch', true, 15, 'finished'),
    ('PixelQueen', 'God of War', 'PS5', true, 60, 'playing'),
    ('NoScopeNate', 'Elden Ring', 'Xbox One', true, 88, 'playing'),
    ('NoScopeNate', 'Portal 2', 'PC', false, 5, 'backlog'),
    ('Void3tk', 'Skyrim', 'PC', true, 300, 'playing'),
    ('Void3tk', 'Terraria', 'Nintendo Switch', true, 25, 'playing'),
    ('OminousNga', 'Minecraft', 'Xbox One', true, 150, 'playing'),
    ('OminousNga', 'Overwatch 2', 'PC', true, 70, 'playing'),
    ('Marcus', 'Animal Crossing: New Horizons', 'Nintendo Switch', true, 500, 'playing'),
    ('Marcus', 'Halo Infinite', 'PC', true, 40, 'finished'),
    ('ShadowFox', 'Stardew Valley', 'PC', true, 20, 'backlog'),
    ('ShadowFox', 'The Witcher 3', 'PC', true, 5, 'backlog'),
    ('LunaBell', 'Hades', 'Nintendo Switch', true, 33, 'playing'),
    ('LunaBell', 'Celeste', 'PC', true, 12, 'finished'),
    ('TurboKid', 'Elden Ring', 'PS5', true, 90, 'dropped'),
    ('TurboKid', 'God of War', 'Xbox One', false, 0, 'backlog'),
    ('IronClad', 'Skyrim', 'PS5', true, 400, 'playing'),
    ('IronClad', 'Portal 2', 'Nintendo Switch', true, 8, 'finished')
) AS o(gamertag, title, console_name, owned, hours_played, status)
JOIN users u ON u.gamertag = o.gamertag
JOIN games g ON g.title = o.title
JOIN consoles c ON c.console_name = o.console_name;
