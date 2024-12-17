"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buddyRequestRoutes = void 0;
const express_1 = require("express");
const buddy_controller_1 = require("./buddy.controller");
const validateRequest_1 = require("../../../middleware/validateRequest");
const buddy_validation_1 = require("./buddy.validation");
const authGuard_1 = require("../../../middleware/authGuard");
const role_constant_1 = require("../../helpers/role.constant");
const router = (0, express_1.Router)();
//make buddy-request
router.post("/:tripId/request", (0, authGuard_1.authGaurd)(role_constant_1.USER_ROLE.user), (0, validateRequest_1.validateRequest)(buddy_validation_1.buddyValidation.createBuddyRequest), buddy_controller_1.buddyController.requestToJoin);
router.get("/user/:userId/outgoing-requests", (0, authGuard_1.authGaurd)(role_constant_1.USER_ROLE.user), buddy_controller_1.buddyController.getOutgoingRequests);
router.get("/user/:userId/incoming-requests", (0, authGuard_1.authGaurd)(role_constant_1.USER_ROLE.user), buddy_controller_1.buddyController.getIncommingRequests);
router.patch("/response/:id/update-status", (0, authGuard_1.authGaurd)(role_constant_1.USER_ROLE.user, role_constant_1.USER_ROLE.admin), buddy_controller_1.buddyController.updateRequestStatus);
exports.buddyRequestRoutes = router;
