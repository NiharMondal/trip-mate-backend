import { Router } from "express";
import { buddyController } from "./buddy.controller";

const router = Router()

router.route("/").post(buddyController.insertIntoDB).get(buddyController.getAllFromDB)

export const buddyRoutes = router;