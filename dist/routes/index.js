"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routesArray_1 = require("./routesArray");
const rootRouter = (0, express_1.Router)();
routesArray_1.routesArray.forEach((el) => rootRouter.use(el.path, el.route));
exports.default = rootRouter;
