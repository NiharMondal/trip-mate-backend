import { Router } from "express";
import { metaController } from "./meta.controller";
import { authGaurd } from "../../../middleware/authGuard";
import { USER_ROLE } from "../../helpers/role.constant";

const router = Router();

router.get("/admin", authGaurd(USER_ROLE.admin), metaController.adminMetaData);

router.get("/user/:userId",  metaController.userMetaData);

export const metaRoutes = router;
