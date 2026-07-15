import { RequestHandler } from 'express';
import { pool } from '../db';
import { ApiError } from '../utils/ApiError';

export const getGameLibrary: RequestHandler = async (req, res, next) => {
    
    // game pieces
    const game_id = req.query.game_id as string
    const title = req.query.title as string
    const genre = req.query.genre as string
    const rating = req.query.rating as string
    // ---
    // user pieces(user, gamertag, console: console_name, junctions:hours played, status)
    const user_id = req.query.user_id as string
    const gamertag = req.query.gamertag as string
    const console_name = req.query.console_name as string
    const status = req.query.status as string
    const hours_played = req.query.hours_played as string
  
    
    let sql =
        `
    SELECT
        gl.library_id,
        g.game_id,
        g.title,
        g.genre,
        g.rating,
        g.description,
        u.user_id,
        u.gamerTag,
        c.console_id,
        c.console_name,
        gl.owned,
        gl.hours_played,
        gl.status
        FROM games AS g
        JOIN game_library AS gl
        ON g.game_id = gl.game_id
        JOIN users AS u
        ON u.user_id = gl.user_id
        JOIN consoles AS c
        ON c.console_id = gl.console_id
        WHERE 1=1
    `;
    const values: any[] = [];
    let count = 1;
    if(game_id) {
        sql += `AND g.game_id = $${count}`;
        values.push(game_id);
        count++;
    }

    if(title) {
        sql += ` AND g.title ILIKE $${count}`;
        values.push(`%${title}%`);
        count++;
    }

    if(genre) {
        sql += ` AND g.genre ILIKE $${count}`;
        values.push(`%${genre}%`);
        count++;
    }

    if(rating) {
        sql += ` AND g.rating = $${count}`;
        values.push(Number(rating))
        count++;
    }

    if(user_id) {
        sql += ` AND u.user_id = $${count}`;
        values.push(user_id)
        count++;
    }

    if(gamertag) {
        sql += ` AND u.gamertag ILIKE $${count}`;
        values.push(`%${gamertag}%`);
        count++;
    }

    if(console_name) {
        sql += ` AND c.console_name ILIKE $${count}`;
        values.push(`%${console_name}%`);
        count++
    }

    if(status){
        sql += ` AND gl.status ILIKE $${count}`;
        values.push(`%${status}%`);
        count++;

    }

    if(hours_played) {
        sql += ` AND gl.hours_played = $${count}`;
        values.push(Number(hours_played))
        count++;
    }

    const result = await pool.query(sql, values);
    res.render('library/gameLibrary', { 
        games: result.rows,
        filters: {
            game_id,
            title,
            genre,
            rating,
            user_id,
            gamertag,
            console_name,
            status,
            hours_played
        }
     });
};

export const getLibraryEditPage: RequestHandler = async (req, res, next) => {
    const id = Number(req.params.id);
    const result = await pool.query(
        `
        SELECT * 
        FROM games
        WHERE game_id = $1
        `, [id]
    );

    res.render('library/libraryEdit', { game: result.rows[0] });
};

export const insertLibrary: RequestHandler = async (req, res, next) => {
    const gameId = Number(req.params.id);
    const { gamerTag, console_name, owned, hours_played, status } = req.body;

    const userResult = await pool.query(`
            SELECT user_id
            FROM users
            WHERE gamertag = $1
        `, [gamerTag]);

    const consoleResult = await pool.query(`
            SELECT console_id
            FROM consoles
            WHERE console_name = $1
        `, [console_name]);

    if (!userResult.rows[0]) throw new ApiError(404, `No user with gamertag ${gamerTag}`);
    if (!consoleResult.rows[0]) throw new ApiError(404, `No console named ${console_name}`);

    let result;
    try {
        result = await pool.query(
            `
            INSERT INTO game_library(user_id, game_id, console_id, owned, hours_played, status)
            VALUES($1, $2,$3,$4,$5, $6)
            RETURNING *
            `, [userResult.rows[0].user_id, gameId, consoleResult.rows[0].console_id, owned, hours_played, status]
        );
    } catch (err: any) {
        if (err.code === '23505') {
            throw new ApiError(409, `${gamerTag} already has this game in their library on ${console_name}.`);
        }
        throw err;
    }

    res.status(201).json(result.rows[0]);
};

export const deleteLibraryEntry:RequestHandler = async(req, res, next) => {
    const id = Number(req.params.id)
    const result = await pool.query(
        `
        DELETE
        FROM game_library
        WHERE library_id = $1
        RETURNING *
        `, [id]
    )
    if(result.rows.length === 0) {
        throw new ApiError(404, 'No library match found.')
    }
    res.status(200).json(result.rows[0])
}