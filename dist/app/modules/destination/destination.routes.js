"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.destinationRoutes = void 0;
const express_1 = require("express");
const destination_controller_1 = require("./destination.controller");
const validateRequest_1 = require("../../../middleware/validateRequest");
const destination_validation_1 = require("./destination.validation");
const authGuard_1 = require("../../../middleware/authGuard");
const role_constant_1 = require("../../helpers/role.constant");
const router = (0, express_1.Router)();
// get trips by destination
router.get("/:destination/trips", destination_controller_1.destinationController.getAllTripsByDestination);
//get popular trip
router.get("/popular-destination", destination_controller_1.destinationController.getPopularDestination);
//get destination by slug
router.get("/:slug", destination_controller_1.destinationController.getBySlug);
router
    .route("/:id")
    .get(destination_controller_1.destinationController.getById)
    .patch((0, authGuard_1.authGaurd)(role_constant_1.USER_ROLE.admin), (0, validateRequest_1.validateRequest)(destination_validation_1.destinationValidation.updateDestination), destination_controller_1.destinationController.updateIntoDB)
    .delete((0, authGuard_1.authGaurd)(role_constant_1.USER_ROLE.admin), destination_controller_1.destinationController.deleteFromDB);
router
    .route("/")
    .post((0, authGuard_1.authGaurd)(role_constant_1.USER_ROLE.admin), (0, validateRequest_1.validateRequest)(destination_validation_1.destinationValidation.createDestination), destination_controller_1.destinationController.insertIntoDB)
    .get(destination_controller_1.destinationController.getAllFromDB);
exports.destinationRoutes = router;
