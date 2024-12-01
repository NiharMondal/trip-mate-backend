import { Router } from "express";
import { tripController } from "./trip.controller";

const router = Router();

// public --> get related trip
router.get("/related-trip/:id", tripController.relatedTrip);

// freshly added : public
router.get("/freshly-added", tripController.freshlyAdded);

// popular trip : public
router.get("/popular-trip", tripController.popularTrip);

// by slug : public
router.get("/:slug", tripController.getBySlug);


// my trips (user-based) : protected
router.route("/my-trip/:userId").get(tripController.getMyTrips);

// general route for all trips (must come last to avoid conflicts)
router
	.route("/")
	.post(tripController.insertIntoDB)
	.get(tripController.getAllFromDB);


// protected: admin - user
router
	.route("/:id")
	.patch(tripController.updateIntoDB)
	.delete(tripController.deleteFromDB);


export const tourRoutes =  router;