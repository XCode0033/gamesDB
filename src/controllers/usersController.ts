
import {RequestHandler} from 'express';
import {pool} from '../db';
import { ApiError } from '../utils/ApiError';


export const getAllUsers:RequestHandler = async(req, res, next) => {
    const result = await pool.query(
        `
        SELECT * FROM users
        ORDER BY user_id;
        `
    )
    res.render("users/users", {users: result.rows})
}
// Create a new user

export const getUserCreatePage: RequestHandler = (req, res, next) => {
    res.render('users/userCreatePage');
}
export const createUser:RequestHandler = async(req, res, next) => {
    const {gamertag, age, email} = req.body;

    const result = await pool.query(`
        INSERT INTO users (gamerTag, age, email)
        VALUES ($1, $2, $3)
        RETURNING *
        
        `, [gamertag, age, email])
    res.status(201).json(result.rows[0])

}