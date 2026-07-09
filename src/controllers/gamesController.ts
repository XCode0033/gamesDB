import express from 'express'
import { RequestHandler } from 'express'
import {pool} from "../db";
import { ApiError } from '../utils/ApiError';



export const getAllGames:RequestHandler = async(req, res, next) => {
   const result = await pool.query(
    `
    SELECT * FROM games
    ORDER BY id;
    `
   )
   res.render('homePage', {games: result.rows})
}

export const getGameById:RequestHandler = async(req, res, next) => {
    const id = Number(req.params.id)
    const result = await pool.query(
        `
        SELECT * FROM games
        WHERE id = $1
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
        WHERE id = $1
        `, [id]
    )
    if(result.rows.length === 0) {
        throw new ApiError(404, `No game by id of ${id} found.`)
    }
    res.render("editPage", {game: result.rows[0]})
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
        WHERE id = $5
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
        WHERE id = $1
        `, [id])

    if(result.rows.length === 0) {
        throw new ApiError(404, `No game by id of ${id} found.`)
    }
    console.log(`Game: ${id} deleted!`)
    res.status(200).json(result.rows[0])
}