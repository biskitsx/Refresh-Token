import { Router } from "express";
import { createSessionHandler, getSessionHandler, deleteSessionHandler } from "./controller/session";
import { requireUser } from "./middleware/requireUser";


const router = Router()
router.post("/session", createSessionHandler)
router.get("/session", requireUser, getSessionHandler)
router.delete("/session", requireUser, deleteSessionHandler)

export default router