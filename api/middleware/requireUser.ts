import { NextFunction, Request, Response } from "express"
import { tokenManager } from "../utils/tokenManager"
import { createError } from "../utils/createError"

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    if (!req.user) {
        return next(createError("Invalid session"))
    }
    return next()
}