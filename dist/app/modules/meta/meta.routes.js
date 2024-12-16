"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metaRoutes = void 0;
const express_1 = require("express");
const meta_controller_1 = require("./meta.controller");
const authGuard_1 = require("../../../middleware/authGuard");
const role_constant_1 = require("../../helpers/role.constant");
const router = (0, express_1.Router)();
router.get("/admin", (0, authGuard_1.authGaurd)(role_constant_1.USER_ROLE.admin), meta_controller_1.metaController.adminMetaData);
router.get("/user/:userId", meta_controller_1.metaController.userMetaData);
exports.metaRoutes = router;