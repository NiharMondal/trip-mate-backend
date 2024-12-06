import { Router } from "express";
import { metaController } from "./meta.controller";

const router = Router();

router.get("/admin", metaController.adminMetaData);

export const metaRoutes = router;
