"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tourRoutes = void 0;
const express_1 = require("express");
const trip_controller_1 = require("./trip.controller");
const validateRequest_1 = require("../../../middleware/validateRequest");
const trip_validation_1 = require("./trip.validation");
const authGuard_1 = require("../../../middleware/authGuard");
const role_constant_1 = require("../../helpers/role.constant");
const auth_1 = require("../../../middleware/auth");
const router = (0, express_1.Router)();
// public --> get related trip
router.get("/related-trip/:id", trip_controller_1.tripController.relatedTrip);
// freshly added : public
router.get("/freshly-added", trip_controller_1.tripController.freshlyAdded);
// popular trip : public
router.get("/popular-trip", trip_controller_1.tripController.popularTrip);
router.get("/by-id/:id", trip_controller_1.tripController.getById);
// by slug : public
router.get("/:slug", trip_controller_1.tripController.getBySlug);
// my trips (user-based) : protected
router
    .route("/my-trip/:userId")
    .get((0, authGuard_1.authGaurd)(role_constant_1.USER_ROLE.user), trip_controller_1.tripController.getMyTrips);
// protected: admin - user
router
    .route("/:id")
    .patch((0, authGuard_1.authGaurd)(role_constant_1.USER_ROLE.user, role_constant_1.USER_ROLE.admin), trip_controller_1.tripController.updateIntoDB)
    .delete((0, authGuard_1.authGaurd)(role_constant_1.USER_ROLE.user, role_constant_1.USER_ROLE.admin), trip_controller_1.tripController.deleteFromDB);
// general route for all trips (must come last to avoid conflicts)
router
    .route("/")
    .post((0, authGuard_1.authGaurd)(role_constant_1.USER_ROLE.user, role_constant_1.USER_ROLE.admin), (0, validateRequest_1.validateRequest)(trip_validation_1.tripValidation.createTrip), trip_controller_1.tripController.insertIntoDB)
    .get(auth_1.auth, trip_controller_1.tripController.getAllFromDB);
exports.tourRoutes = router;
