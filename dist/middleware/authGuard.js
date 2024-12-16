"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGaurd = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const CustomeError_1 = __importDefault(require("../app/utils/CustomeError"));
const config_1 = require("../config");
const user_model_1 = __importDefault(require("../app/modules/user/user.model"));
const authGaurd = (...roles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        try {
            if (!token) {
                throw new CustomeError_1.default(401, "You are not authorized");
            }
            const decodedData = jsonwebtoken_1.default.verify(token, config_1.envConfig.jwt_secret);
            const { id, role } = decodedData;
            const user = yield user_model_1.default.findById(id);
            if (!user) {
                throw new CustomeError_1.default(401, "You are not authorized");
            }
            if (token && !roles.includes(role)) {
                throw new CustomeError_1.default(403, "You are not authorized");
            }
            req.user = decodedData;
            next();
        }
        catch (error) {
            next(error);
        }
    });
};
exports.authGaurd = authGaurd;
