import { Router } from "express";
import { buddyController } from "./buddy.controller";

const router = Router()

router.post("/:tripId/request", buddyController.requestToJoin);
router.get("/user/:userId/requests/outgoing", buddyController.getOutgoingRequests)
router.get("/user/:userId/requests/incomming", buddyController.getIncommingRequests)
router.patch("/trip/:requestId/update", buddyController.updateRequestStatus)
export const buddyRequestRoutes = router;