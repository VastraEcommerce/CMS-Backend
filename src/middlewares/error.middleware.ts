import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode || 500
    const message = err.message || "Ops something went wrong"
    res.status(statusCode).json({
        message
    })
}

export default errorHandler