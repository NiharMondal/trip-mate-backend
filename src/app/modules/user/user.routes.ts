import { Router } from "express";
import { userController } from "./user.controller";

const router  = Router()

router.route("/").get(userController.getAllFromDB);
router.route("/:id").get(userController.getById).patch(userController.updateIntoDB).delete(userController.deleteFromDB)

export const userRoutes =  router;