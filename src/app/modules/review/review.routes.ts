import { Router } from "express";
import { reviewController } from "./review.controller";
import { USER_ROLE } from "../../helpers/role.constant";
import { authGaurd } from "../../../middleware/authGuard";
import { validateRequest } from "../../../middleware/validateRequest";
import { reviewValidation } from "./review.validation";

const router = Router();

router
	.route("/")
	.post(
		authGaurd(USER_ROLE.admin, USER_ROLE.user),
		validateRequest(reviewValidation.createReview),
		reviewController.insertIntoDB
	)
	.get(reviewController.getAllFromDB);

router
	.route("/:id")
	.get(reviewController.getById)
	.patch(
		authGaurd(USER_ROLE.admin, USER_ROLE.user),
		validateRequest(reviewValidation.updateReview),
		reviewController.updateIntoDB
	)
	.delete(
		authGaurd(USER_ROLE.admin, USER_ROLE.user),
		reviewController.deleteFromDB
	);

export const reveiwRoutes = router;
