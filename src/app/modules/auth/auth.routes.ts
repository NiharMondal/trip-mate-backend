
import { Router } from "express";
import { authController } from "./auth.controller";


const router  = Router()

router.post("/sign-up",authController.registerUser)
router.post("/login",authController.loginUser)

export const authRoutes =  router;