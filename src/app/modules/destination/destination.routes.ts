import { Router } from "express";
import { destinationController } from "./destination.controller";
import { validateRequest } from "../../../middleware/validateRequest";
import { destinationValidation } from "./destination.validation";
import { authGaurd } from "../../../middleware/authGuard";
import { USER_ROLE } from "../../helpers/role.constant";

const router = Router();

router
	.route("/")
	.post(
		// authGaurd(USER_ROLE.admin),
		validateRequest(destinationValidation.createDestination),
		destinationController.insertIntoDB
	)
	.get(destinationController.getAllFromDB);

router
	.route("/:id")
	.get(destinationController.getById)
	.patch(
		// authGaurd(USER_ROLE.admin),
		validateRequest(destinationValidation.updateDestination),
		destinationController.updateIntoDB
	)
	.delete(
		// authGaurd(USER_ROLE.admin),
		destinationController.deleteFromDB
	);

export const destinationRoutes = router;
