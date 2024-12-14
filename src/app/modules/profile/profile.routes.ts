import { Router } from "express";
import { profileController } from "./profile.controller";
import { authGaurd } from "../../../middleware/authGuard";
import { USER_ROLE } from "../../helpers/role.constant";

const router = Router();

router.patch(
	"/update-profile",
	authGaurd(USER_ROLE.user, USER_ROLE.admin, USER_ROLE.superadmin),
	profileController.updateProfile
);
router.get(
	"/me",
	authGaurd(USER_ROLE.user, USER_ROLE.admin, USER_ROLE.superadmin),
	profileController.getMyProfile
);

export const profileRoutes = router;
