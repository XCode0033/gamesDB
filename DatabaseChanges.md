## Logging All Database Changes.

### Dropped unused schema (Developer/Genre/Platform tables)
Dropped `Developer`, `Game`, `GameGenre`, `GamePlatform`, `Genre`, `Platform` — leftover tables from an earlier schema draft that were never used by the app. The live `games` table (owned by `xavier`) was untouched.
```sql
DROP TABLE IF EXISTS "GameGenre", "GamePlatform", "Genre", "Platform", "Game", "Developer";
```

### `games.id` renamed to `games.game_id`
Needed so a new schema (users/consoles/junctions) could reuse the name `games` with `game_id` as its PK without colliding with the live table.
```sql
ALTER TABLE games RENAME COLUMN id TO game_id;
```
App code updated to match: all `WHERE id = ...` / `ORDER BY id` in `gamesController.ts` → `game_id`, and every `game.id` reference in the EJS views → `game.game_id`.

### `consoles.name` renamed to `consoles.console_name`
Style choice for clarity (avoid confusion with `games.title`, make the column read better on its own).
```sql
ALTER TABLE consoles RENAME COLUMN name TO console_name;
```

### `game_library.created_at` added
Added a timestamp so library entries could be ordered by most-recently-added.
```sql
ALTER TABLE game_library ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
```

### `game_library` switched from composite PK to surrogate `library_id` PK
The original PK was the composite `(user_id, game_id, console_id)`, which made deleting/editing a specific entry awkward (no single column to identify a row). Switched to a `SERIAL` surrogate key, keeping the original composite as a `UNIQUE` constraint so duplicate entries are still blocked.
```sql
ALTER TABLE game_library ADD COLUMN library_id SERIAL;
ALTER TABLE game_library DROP CONSTRAINT game_library_pkey;
ALTER TABLE game_library ADD PRIMARY KEY (library_id);
ALTER TABLE game_library ADD CONSTRAINT game_library_unique_entry UNIQUE (user_id, game_id, console_id);
```
App code updated to match: `deleteLibraryEntry` now does `WHERE library_id = $1` instead of matching all three composite columns; `getGameLibrary`'s join now selects `gl.library_id`; the delete form in `gameLibrary.ejs` keys off `game.library_id` instead of `game.game_id`.
