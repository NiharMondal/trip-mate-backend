import { Router } from "express";
import { userController } from "./user.controller";
import { authGaurd } from "../../../middleware/authGuard";
import { USER_ROLE } from "../../helpers/role.constant";

const router = Router();

router.get(
	"/:userId/outgoing",
	authGaurd(USER_ROLE.user),
	userController.getOutGoingRequest
);

router.get(
	"/:userId/incomming",
	authGaurd(USER_ROLE.user),
	userController.getIncommingRequests
);

router
	.route("/:id")
	.get(authGaurd(USER_ROLE.admin), userController.getById)
	.patch(authGaurd(USER_ROLE.admin), userController.updateIntoDB)
	.delete(authGaurd(USER_ROLE.admin), userController.deleteFromDB);

router.route("/").get(authGaurd(USER_ROLE.admin), userController.getAllFromDB);

export const userRoutes = router;
