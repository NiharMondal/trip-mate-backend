import { Router } from "express";
import { authController } from "./auth.controller";
import { authGaurd } from "../../../middleware/authGuard";
import { USER_ROLE } from "../../helpers/role.constant";
import { validateRequest } from "../../../middleware/validateRequest";
import { authValidation } from "./auth.validation";

const router = Router();

router.post("/sign-up", authController.registerUser);
router.post("/login", authController.loginUser);

router.patch(
	"/change-password",
	authGaurd(USER_ROLE.admin, USER_ROLE.user, USER_ROLE.superadmin),
	authController.changePassword
);
router.post("/forgot-password", authController.forgotPassword);

router.post(
	"/reset-password",
	validateRequest(authValidation.resetPassword),
	authController.resetPassword
);

export const authRoutes = router;
