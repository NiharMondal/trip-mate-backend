import { Router } from "express";
import { tripController } from "./trip.controller";
import { validateRequest } from "../../../middleware/validateRequest";
import { tripValidation } from "./trip.validation";
import { authGaurd } from "../../../middleware/authGuard";
import { USER_ROLE } from "../../helpers/role.constant";

const router = Router();

// public --> get related trip
router.get("/related-trip/:id", tripController.relatedTrip);

// freshly added : public
router.get("/freshly-added", tripController.freshlyAdded);

// popular trip : public
router.get("/popular-trip", tripController.popularTrip);

router.get("/by-id/:id", tripController.getById);
// by slug : public
router.get("/:slug", tripController.getBySlug);
// my trips (user-based) : protected
router.route("/my-trip/:userId").get(tripController.getMyTrips);
// protected: admin - user
router
	.route("/:id")
	.patch(tripController.updateIntoDB)
	.delete(tripController.deleteFromDB);

// general route for all trips (must come last to avoid conflicts)
router
	.route("/")
	.post(
		authGaurd(USER_ROLE.user, USER_ROLE.admin),
		validateRequest(tripValidation.createTrip),
		tripController.insertIntoDB
	)
	.get(tripController.getAllFromDB);

export const tourRoutes = router;
