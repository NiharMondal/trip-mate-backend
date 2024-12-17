"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const authGuard_1 = require("../../../middleware/authGuard");
const role_constant_1 = require("../../helpers/role.constant");
const router = (0, express_1.Router)();
router.get("/:userId/outgoing", (0, authGuard_1.authGaurd)(role_constant_1.USER_ROLE.user), user_controller_1.userController.getOutGoingRequest);
router.get("/:userId/incomming", (0, authGuard_1.authGaurd)(role_constant_1.USER_ROLE.user), user_controller_1.userController.getIncommingRequests);
router
    .route("/:id")
    .get((0, authGuard_1.authGaurd)(role_constant_1.USER_ROLE.admin), user_controller_1.userController.getById)
    .patch((0, authGuard_1.authGaurd)(role_constant_1.USER_ROLE.admin), user_controller_1.userController.updateIntoDB)
    .delete((0, authGuard_1.authGaurd)(role_constant_1.USER_ROLE.admin), user_controller_1.userController.deleteFromDB);
router.route("/").get((0, authGuard_1.authGaurd)(role_constant_1.USER_ROLE.admin), user_controller_1.userController.getAllFromDB);
exports.userRoutes = router;
