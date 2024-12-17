import { Router } from "express";
import { buddyController } from "./buddy.controller";
import { validateRequest } from "../../../middleware/validateRequest";
import { buddyValidation } from "./buddy.validation";
import { authGaurd } from "../../../middleware/authGuard";
import { USER_ROLE } from "../../helpers/role.constant";

const router = Router();

//make buddy-request
router.post(
	"/:tripId/request",
	authGaurd(USER_ROLE.user),
	validateRequest(buddyValidation.createBuddyRequest),
	buddyController.requestToJoin
);

router.get(
	"/user/:userId/outgoing-requests",
	authGaurd(USER_ROLE.user),
	buddyController.getOutgoingRequests
);

router.get(
	"/user/:userId/incoming-requests",
	authGaurd(USER_ROLE.user),
	buddyController.getIncommingRequests
);

router.patch(
	"/response/:id/update-status",
	authGaurd(USER_ROLE.user, USER_ROLE.admin),
	buddyController.updateRequestStatus
);

export const buddyRequestRoutes = router;
