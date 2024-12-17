"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reveiwRoutes = void 0;
const express_1 = require("express");
const review_controller_1 = require("./review.controller");
const role_constant_1 = require("../../helpers/role.constant");
const authGuard_1 = require("../../../middleware/authGuard");
const validateRequest_1 = require("../../../middleware/validateRequest");
const review_validation_1 = require("./review.validation");
const router = (0, express_1.Router)();
router
    .route("/")
    .post((0, authGuard_1.authGaurd)(role_constant_1.USER_ROLE.admin, role_constant_1.USER_ROLE.user), (0, validateRequest_1.validateRequest)(review_validation_1.reviewValidation.createReview), review_controller_1.reviewController.insertIntoDB)
    .get(review_controller_1.reviewController.getAllFromDB);
router
    .route("/:id")
    .get(review_controller_1.reviewController.getById)
    .patch((0, authGuard_1.authGaurd)(role_constant_1.USER_ROLE.admin, role_constant_1.USER_ROLE.user), (0, validateRequest_1.validateRequest)(review_validation_1.reviewValidation.updateReview), review_controller_1.reviewController.updateIntoDB)
    .delete((0, authGuard_1.authGaurd)(role_constant_1.USER_ROLE.admin, role_constant_1.USER_ROLE.user), review_controller_1.reviewController.deleteFromDB);
exports.reveiwRoutes = router;
