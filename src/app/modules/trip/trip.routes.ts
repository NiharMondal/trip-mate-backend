import { Router } from "express";
import { tripController } from "./trip.controller";

const router  = Router()

router.route("/").post(tripController.insertIntoDB).get(tripController.getAllFromDB)
//by slug
router.route("/:slug").get(tripController.getBySlug)
router.route("/:id").patch(tripController.updateIntoDB).delete(tripController.deleteFromDB)

export const tourRoutes =  router;