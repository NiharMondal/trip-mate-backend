import { Router } from "express";
import { buddyController } from "./buddy.controller";
import { validateRequest } from "../../../middleware/validateRequest";
import { buddyValidation } from "./buddy.validation";

const router = Router();

//make buddy-request
router.post(
	"/:tripId/request",
	validateRequest(buddyValidation.createBuddyRequest),
	buddyController.requestToJoin
);

router.get(
	"/user/:userId/outgoing-requests",
	buddyController.getOutgoingRequests
);

router.get(
	"/user/:userId/incoming-requests",
	buddyController.getIncommingRequests
);

router.patch(
	"/response/:id/update-status",
	buddyController.updateRequestStatus
);

export const buddyRequestRoutes = router;
