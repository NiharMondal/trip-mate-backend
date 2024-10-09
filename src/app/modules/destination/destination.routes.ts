import { Router } from "express";
import { destinationController } from "./destination.controller";


const router  = Router()

router.route("/").post(destinationController.insertIntoDB).get(destinationController.getAllFromDB);


router.route("/:id").get(destinationController.getById).patch(destinationController.updateIntoDB).delete(destinationController.deleteFromDB)

export const destinationRoutes =  router;