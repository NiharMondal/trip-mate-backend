"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reveiwRoutes = void 0;
const express_1 = require("express");
const review_controller_1 = require("./review.controller");
const router = (0, express_1.Router)();
router
    .route("/")
    .post(
// authGaurd(USER_ROLE.admin),
// validateRequest(destinationValidation.createDestination),
review_controller_1.reviewController.insertIntoDB)
    .get(review_controller_1.reviewController.getAllFromDB);
router
    .route("/:id")
    .get(review_controller_1.reviewController.getById)
    .patch(
// authGaurd(USER_ROLE.admin),
// validateRequest(destinationValidation.updateDestination),
review_controller_1.reviewController.updateIntoDB)
    .delete(
// authGaurd(USER_ROLE.admin),
review_controller_1.reviewController.deleteFromDB);
exports.reveiwRoutes = router;
