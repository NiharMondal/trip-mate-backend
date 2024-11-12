import { Router } from "express";
import { tripController } from "./trip.controller";

const router = Router();

// freshly added 
router.get("/freshly-added", tripController.freshlyAdded);

// popular trip
router.get("/popular-trip", tripController.getMyTrips);

// by slug
router.get("/:slug", tripController.getBySlug);

// protected: admin - user
router
	.route("/:id")
	.patch(tripController.updateIntoDB)
	.delete(tripController.deleteFromDB);

// my trips (user-based)
router.route("/my-trip/:userId").get(tripController.getMyTrips);

// general route for all trips (must come last to avoid conflicts)
router
	.route("/")
	.post(tripController.insertIntoDB)
	.get(tripController.getAllFromDB);



export const tourRoutes =  router;