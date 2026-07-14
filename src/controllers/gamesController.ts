import express from 'express'
import { RequestHandler } from 'express'
import {pool} from "../db";
import { ApiError } from '../utils/ApiError';




export const getAllGames:RequestHandler = async(req, res, next) => {
   const result = await pool.query(
    `
    SELECT * FROM games
    ORDER BY game_id;
    `
   )
   res.render('homePage', {games: result.rows})
}

export const getGameById:RequestHandler = async(req, res, next) => {
    const id = Number(req.params.id)
    const result = await pool.query(
        `
        SELECT * FROM games
        WHERE game_id = $1
        `, [id]
    )
    if(result.rows.length === 0) {
        throw new ApiError(404, `No game by id of ${id} found.`)
    }
    res.render("gameId", {game: result.rows[0]})
}

export const getEditPage:RequestHandler = async (req, res, next) => {
    const id = Number(req.params.id)
    const result = await pool.query(
        `
        SELECT * FROM games
        WHERE game_id = $1
        `, [id]
    )
    if(result.rows.length === 0) {
        throw new ApiError(404, `No game by id of ${id} found.`)
    }
    res.render("editPage", {game: result.rows[0]})
}
export const getGameLibrary:RequestHandler = async (req, res, next) => {
    const sql = 
    `
    SELECT 
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
    `;

    const result = await pool.query(sql)
        res.render('gameLibrary' , {games: result.rows})
}

export const getLibraryEditPage:RequestHandler = async(req, res ,next) => {
    const id = Number(req.params.id)
    const result = await pool.query(
        `
        SELECT * 
        FROM games
        WHERE game_id = $1
        `, [id]
    )

    res.render("libraryEdit", {game: result.rows[0]})
}

export const insertLibrary:RequestHandler = async (req, res, next) => {
    const gameId = Number(req.params.id)
    const {gamerTag, console_name, owned, hours_played, status} = req.body

    const userResult = await pool.query(`
            SELECT user_id
            FROM users
            WHERE gamertag = $1
        `, [gamerTag]);

    const consoleResult = await pool.query(`
            SELECT console_id
            FROM consoles
            WHERE console_name = $1
        `, [console_name])

    if (!userResult.rows[0]) throw new ApiError(404, `No user with gamertag ${gamerTag}`);
    if (!consoleResult.rows[0]) throw new ApiError(404, `No console named ${console_name}`);

    let result;
    try {
        result = await pool.query(
            `
            INSERT INTO game_library(user_id, game_id, console_id, owned, hours_played, status)
            VALUES($1, $2,$3,$4,$5, $6)
            RETURNING *
            `, [ userResult.rows[0].user_id, gameId, consoleResult.rows[0].console_id, owned, hours_played, status ]
        );
    } catch (err: any) {
        if (err.code === '23505') {
            throw new ApiError(409, `${gamerTag} already has this game in their library on ${console_name}.`)
        }
        throw err;
    }

    res.status(201).json(result.rows[0])
}
export const createGame:RequestHandler = async (req, res, next) => {
    const {title, genre, rating, description} = req.body
    const result = await pool.query(` 
        INSERT INTO games (title, genre, rating, description)
        VALUES($1, $2, $3, $4)
        RETURNING *
        `, [title, genre, rating, description])
       
    res.status(201).json(result.rows[0])
}


export const patchGame:RequestHandler = async (req, res, next) => {
    const id = Number(req.params.id)
    const {title, genre, rating, description} = req.body
    const result = await pool.query(
        `
        UPDATE games
        SET  title = $1, genre = $2, rating = $3, description = $4
        WHERE game_id = $5
        RETURNING *
        `, [title, genre, rating, description, id]
    )
   if(result.rows.length === 0) {
        throw new ApiError(404, `No game by id of ${id} found.`)
    }
    res.status(200).json(result.rows[0])
  
}


export const deleteGame:RequestHandler = async(req, res, next) => {
    const id = Number(req.params.id)

    const result = await pool.query(`
        DELETE
        FROM games
        WHERE game_id = $1
        `, [id])

    if(result.rows.length === 0) {
        throw new ApiError(404, `No game by id of ${id} found.`)
    }
    console.log(`Game: ${id} deleted!`)
    res.status(200).json(result.rows[0])
}