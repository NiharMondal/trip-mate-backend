"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buddyRequestRoutes = void 0;
const express_1 = require("express");
const buddy_controller_1 = require("./buddy.controller");
const validateRequest_1 = require("../../../middleware/validateRequest");
const buddy_validation_1 = require("./buddy.validation");
const router = (0, express_1.Router)();
//make buddy-request
router.post("/:tripId/request", (0, validateRequest_1.validateRequest)(buddy_validation_1.buddyValidation.createBuddyRequest), buddy_controller_1.buddyController.requestToJoin);
router.get("/user/:userId/outgoing-requests", buddy_controller_1.buddyController.getOutgoingRequests);
router.get("/user/:userId/incoming-requests", buddy_controller_1.buddyController.getIncommingRequests);
router.patch("/response/:id/update-status", buddy_controller_1.buddyController.updateRequestStatus);
exports.buddyRequestRoutes = router;
