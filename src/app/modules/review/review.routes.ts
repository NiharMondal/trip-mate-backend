import { Router } from "express";
import { validateRequest } from "../../../middleware/validateRequest";
import { reviewController } from "./review.controller";



const router = Router();

router
	.route("/")
	.post(
		// authGaurd(USER_ROLE.admin),
		// validateRequest(destinationValidation.createDestination),
		reviewController.insertIntoDB
	)
	.get(reviewController.getAllFromDB);

router
	.route("/:id")
	.get(reviewController.getById)
	.patch(
		// authGaurd(USER_ROLE.admin),
		// validateRequest(destinationValidation.updateDestination),
		reviewController.updateIntoDB
	)
	.delete(
		// authGaurd(USER_ROLE.admin),
		reviewController.deleteFromDB
	);

export const reveiwRoutes = router;
