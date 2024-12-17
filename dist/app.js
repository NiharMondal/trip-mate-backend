"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const notFound_1 = __importDefault(require("./middleware/notFound"));
const globalErrorHandler_1 = __importDefault(require("./middleware/globalErrorHandler"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["https://trip-mate-sigma.vercel.app"],
    credentials: true,
}));
app.use("/api/v1", routes_1.default);
//not found route handler
app.use(notFound_1.default);
//global error controller/ handler
app.use(globalErrorHandler_1.default);
exports.default = app;
