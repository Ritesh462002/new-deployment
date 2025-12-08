import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { ZodError } from "zod";

export const errorHandler = (
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
): void => {
    if (err instanceof ZodError) {
        res.status(400).json({
            status: "fail",
            message: "Validation error",
            errors: err.issues
        });
        return;
    }
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            status: "error",
            message: err.message
        });
        return;
    }
    res.status(500).json({
        status: "error",
        message: "Internal server error"
    });
};