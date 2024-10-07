import { Router } from "express";
import { buddyController } from "./buddy.controller";

const router = Router()

router.post("/:tripId/request",buddyController.insertIntoDB);
router.get("/:tripId", buddyController.getById);
//admin
router.get("/request/admin", buddyController.getAllFromDB)


export const buddyRoutes = router;