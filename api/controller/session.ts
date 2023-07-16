import { NextFunction, Request, Response } from "express";

import { createError } from "../utils/createError";
import { tokenManager } from "../utils/tokenManager";
import { createSession, getUser, invalidateSession } from "../db";

// login handler
export function createSessionHandler(req: Request, res: Response, next: NextFunction): void {
    try {
        const { email, password } = req.body;

        // dumb authen 🤣
        const user = getUser(email);
        if (!user || user.password !== password) {
            return next(createError("Invalid email or password"));
        }

        const session = createSession(email, user.name)

        // create access token & refresh token
        const accessToken = tokenManager.createToken({ email, name: user.name, sessionId: session.sessionId }, "5s")
        const refreshToken = tokenManager.createToken({ sessionId: session.sessionId }, "1y")

        // set access token & refresh token to cookies
        res.cookie("accessToken", accessToken, {
            maxAge: 60000, // 5 mins
            httpOnly: true
        })
        res.cookie("refreshToken", refreshToken, {
            maxAge: 3.154e10, // 1 year
            httpOnly: true
        })

        res.json(session)
    } catch (error) {
        next(error)
    }
}

export function getSessionHandler(req: Request, res: Response, next: NextFunction): void {
    try {

        //@ts-ignore
        res.send(req.user)
    } catch (error) {
        next(error)
    }
}

export function deleteSessionHandler(req: Request, res: Response, next: NextFunction): void {
    try {
        res.clearCookie("accessToken")
        res.clearCookie("refreshToken")

        //@ts-ignore
        const s = invalidateSession(req.user.sessionId)
        res.json(s)
    } catch (error) {
        next(error)
    }
}


