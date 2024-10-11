import { Router } from "express";
import { tripController } from "./trip.controller";

const router  = Router()

router.route("/").post(tripController.insertIntoDB).get(tripController.getAllFromDB)
//by slug
router.route("/:slug").get(tripController.getBySlug)

//needs checking
router.route("/:id").patch(tripController.updateIntoDB).delete(tripController.deleteFromDB)

router.route("/my-trip/:userId").get(tripController.getMyTrips)
router.get("/popular-trip", tripController.getMyTrips)
export const tourRoutes =  router;