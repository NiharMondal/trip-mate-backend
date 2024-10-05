import { Router } from "express";
import { routesArray } from "./routesArray";

const rootRouter = Router()


routesArray.forEach((el)=> rootRouter.use(el.path, el.route))

export default rootRouter;