import { NextFunction, Request, Response } from "express"
import { tokenManager } from "../utils/tokenManager"
import { getSession } from "../db"

export const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
    const { accessToken, refreshToken } = req.cookies
    if (!accessToken) {
        return next()
    }

    const { payload, expired } = tokenManager.verifyToken(accessToken)

    // for a valid access token
    if (payload) {
        //@ts-ignore
        req.user = payload
        return next()
    }

    // expired but valid access token (token ตายแล้ว แต่ถูกนะ)
    const { payload: refresh } = expired && refreshToken ? tokenManager.verifyToken(refreshToken) : { payload: null }

    if (!refresh) {
        return next()
    }
    //@ts-ignore
    const session = getSession(refresh.sessionId)

    const newAccessToken = tokenManager.createToken(session, "5s")
    // set access token 
    res.cookie("accessToken", newAccessToken, {
        maxAge: 60000, // 5 mins
        httpOnly: true
    })

    //@ts-ignore
    req.user = tokenManager.verifyToken(newAccessToken).payload
    return next()
}