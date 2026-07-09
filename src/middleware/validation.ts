import { validationResult } from "express-validator";
import { RequestHandler } from "express";
import { body, param } from "express-validator";
import { title } from "node:process";


export const titleValidator = () =>
body("title")
.optional()
.isString()
.trim()
.isLength({max: 100})
.withMessage('Title must be a max of 100 characters.');

export const genreValidator = () =>
body("genre")
.optional()
.isString()
.trim()
.isLength({max: 30})
.withMessage('genre must be a max of 30 characters.');


export const ratingValidator = () =>
body("rating")
.optional()
.isInt({min:0, max:5})
.withMessage('rating must be between 0-5 stars');

export const descriptionValidator = () =>
body("description")
.optional()
.isString()
.trim();

export const idValidator = () =>
  param("id")
    .isInt({ gt: 0 })
    .withMessage("Id must be an int");



export const gameValidators = [
    titleValidator(),
    genreValidator(),
    ratingValidator(),
    descriptionValidator()
]

export const validationHandler:RequestHandler = (req, res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }

    next();
}