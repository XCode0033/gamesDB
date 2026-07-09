import { ErrorRequestHandler } from "express";
import { ApiError } from "../utils/ApiError";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err.stack)

    if(err instanceof ApiError) {
        return res.status(err.statusCode).json({
            statusCode: err.statusCode,
            message: err.message,
            details: err.details
        })
    }
    res.status(500).send('Internal Server Error')
}