"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
router.get("/:userId/outgoing", user_controller_1.userController.getOutGoingRequest);
router.get("/:userId/incomming", user_controller_1.userController.getIncommingRequests);
router
    .route("/:id")
    .get(user_controller_1.userController.getById)
    .patch(user_controller_1.userController.updateIntoDB)
    .delete(user_controller_1.userController.deleteFromDB);
router.route("/").get(user_controller_1.userController.getAllFromDB);
exports.userRoutes = router;
